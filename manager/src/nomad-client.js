
import http from 'http';
import child from 'child_process';

const NOMAD_HOST = '127.0.0.1';

export default {
  createDefinition,
  createJob,
  waitForJob,
};


function waitForJob(name) {
  return new Promise((resolve, reject) => {
    let attempts = 0;

    function attempt() {
      attempts += 1;

      if(attempts >= 90) {
        reject(new Error('Job start timeout reached'));
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
        .catch(() => setTimeout(attempt, 1000));
    }

    attempt();
  });
}

function getJob(name) {
  return new Promise((resolve, reject) => {
    let requestPath = `/v1/job/${name}/summary`;
    let req = http.request({
      host: NOMAD_HOST,
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
      host: NOMAD_HOST,
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

