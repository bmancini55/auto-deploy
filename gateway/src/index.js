
import express from 'express';
import dns from 'dns';
import http from 'http';

let app = express();

app.get('/', (req, res, next) => index(req, res).catch(next));


async function index(req, res) {
  let service = req.query.service || 'consul';
  let address = await locateService(service);
  res.send(address);
};

app.listen(8080);


function resolveService(name) {
  return new Promise((resolve, reject) => {
    let serviceName = `${name}.service.consul`;
    dns.resolveSrv(serviceName, (err, addresses) => {
      if(err) reject(err);
      else    resolve(addresses[0]);
    });
  });
}


function deployService(name) {
  return new Promise((resolve, reject) => {
    let requestPath = `/?service=${name}`;
    let req = http.request({
      host: 'localhost',
      port: 8888,
      path: requestPath,
      method: 'GET',
    }, (res) => {
      let buffers = [];
      res.on('error', reject);
      res.on('data', (chunk) => buffers.push(chunk));
      res.on('end', () => {
        let buffer = Buffer.concat(buffers);
        let result = JSON.parse(buffer.toString());
        resolve(result);
      });
    });
    req.on('error', reject);
    req.end();
  });
}

async function locateService(name) {
  try {
    return await resolveService(name);
  }
  catch (ex) {
    return await deployService(name);
  }
}