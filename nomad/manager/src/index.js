
import express from 'express';
import nomad from './nomad-client';
import consul from './consul-client';

let app = express();

app.get('/', (req, res, next) => index(req, res).catch(next));


async function index(req, res) {
  let service = req.query.service;

  let definition = await nomad.createDefinition(service);
  await nomad.createJob(service, definition);
  await nomad.waitForJob(service);
  let result = await consul.waitForService(service);

  console.log('service %j', result);
  res.json(result);
};

app.listen(4111, () => console.log('listening on 4111'));