
import express from 'express';
import dns from 'dns';
import http from 'http';
import child from 'child_process';

let app = express();

app.get('/', (req, res, next) => index(req, res).catch(next));


async function index(req, res) {
  let service = req.query.service || 'consul';
  let definition = await createDefinition(service);
  await createJob(service, definition);
  await waitForJob(service);
  let svr = await resolveService(service);
  console.log('sending %j', svr);
  res.json(svr);
};

app.listen(8888);

function waitForJob(name) {
  return new Promise((resolve, reject) => {
    let attempts = 0;

    function attempt() {
      attempts += 1;
      console.log(name, 'attempt ' + attempts);

      if(attempts >= 90) {
        reject(new Error('Timeout reached'));
        return;
      }

      getJob(name)
        .then((result) => {
          if(result.Summary && result.Summary.latest && result.Summary.latest.Running > 0) {
            resolve();
          }
          else {
            setTimeout(attempt, 1000);
          }
        })
        .catch((err) => {
          console.log(err);
          setTimeout(attempt, 1000);
        });
    }

    attempt();
  });
}

function getJob(name) {
  return new Promise((resolve, reject) => {
    let requestPath = `/v1/job/${name}/summary`;
    let req = http.request({
      host: '127.0.0.1',
      port: 4646,
      path: requestPath,
      method: 'GET'
    }, (res) => {
      let buffers = [];
      res.on('error', reject);
      res.on('data', (chunk) => buffers.push(chunk));
      res.on('end', () => {
        let result = Buffer.concat(buffers);
        resolve(JSON.parse(result.toString()));
      });
    });
    req.on('error', reject);
    req.end();
  });
}

function createJob(name, definition) {
  return new Promise((resolve, reject) => {
    let requestPath = `/v1/job/${name}`;
    let req = http.request({
      host: '127.0.0.1',
      port: 4646,
      path: requestPath,
      method: 'POST',
    }, (res) => {
      let buffers = [];
      res.on('error', reject);
      res.on('data', (chunk) => buffers.push(chunk));
      res.on('end', () => {
        resolve(Buffer.concat(buffers).toString());
      });
    });
    req.on('error', reject);
    req.write(definition);
    req.end();
  });
}

function createDefinition(name) {
  return new Promise((resolve, reject) => {
    child.exec(`nomad run -output jobs/${name}.nomad`, (err, stdout) => {
      if(err) reject(err);
      else    resolve(stdout);
    });
  });
}

function resolveService(name) {
  return new Promise((resolve, reject) => {
    let serviceName = `${name}.service.consul`;
    dns.resolveSrv(serviceName, (err, addresses) => {
      if(err) reject(err);
      else    resolve(addresses[0]);
    });
  });
}