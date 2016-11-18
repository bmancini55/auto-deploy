
import express from 'express';
import nomad from './nomad-client';
import consul from './consul-client';

let app = express();

app.get('/', (req, res, next) => index(req, res).catch(next));
app.get('/start', (req, res, next) => start(req, res).catch(next));

app.listen(4111, () => console.log('listening on 4111'));

/**
 * [index description]
 * @param  {[type]} req [description]
 * @param  {[type]} res [description]
 * @return {[type]}     [description]
 */
async function index(req, res) {
  res.send('manager');
}

/**
 * [locate description]
 * @param  {[type]} req [description]
 * @param  {[type]} res [description]
 * @return {[type]}     [description]
 */
async function start(req, res) {
  let service = req.query.service;

  if(!service) {
    req.status(401).send('service required');
    return;
  }

  let definition = await nomad.createDefinition(service);
  await nomad.createJob(service, definition);
  await nomad.waitForJob(service);
  let result = await consul.waitForService(service);

  console.log('service %j', result);
  res.json(result);
};