
import express from 'express';
import nomad from './nomad-client';

let app = express();

app.get('/', (req, res, next) => index(req, res).catch(next));


async function index(req, res) {
  let service = req.query.service || 'consul';
  let definition = await nomad.createDefinition(service);
  await nomad.createJob(service, definition);
  await nomad.waitForJob(service);
  let svr = await nomad.resolveService(service);
  console.log('sending %j', svr);
  res.json(svr);
};

app.listen(8888);