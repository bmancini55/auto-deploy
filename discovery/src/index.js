
import express from 'express';
import dns from 'dns';
import http from 'http';
import fs from 'fs';
import path from 'path';
import child from 'child_process';

let app = express();

app.get('/', (req, res, next) => index(req, res).catch(next));


async function index(req, res) {
  let service = req.query.service || 'consul';
  let definition = await createDefinition(service);
  let nomadRes = await createJob(service, definition);
  res.json(nomadRes);
};

app.listen(8888);

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

function readDefinition(name) {
  return new Promise((resolve, reject) => {
    let jobPath = path.resolve(`jobs/${name}.nomad`);
    fs.readFile(jobPath, (err, data) => {
      if(err) reject(err);
      else    resolve(data.toString());
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