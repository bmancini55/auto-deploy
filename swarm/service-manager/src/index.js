
import express from 'express';
import docker from './docker-client';

const PORT = 4111;
let app = express();

app.get('/', (req, res, next) => index(req, res).catch(next));
app.get('/service/:name', (req, res, next) => queryService(req, res, next).catch(next));
app.post('/service/:name/replicas/:replicas', (req, res, next) => updateServiceReplicas(req, res, next).catch(next));

app.listen(PORT, () => console.log(`Service started on port ${PORT}`));

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
 * [query description]
 * @param  {[type]} req [description]
 * @param  {[type]} res [description]
 * @return {[type]}     [description]
 */
async function queryService(req, res, next) {
  let { name } = req.params;

  // 404 if no service
  if(!name) {
    next();
    return;
  }

  // perform docker service query
  let result = await docker.getService(name);

  res.json(result);
}

/**
 * [updateServiceReplicas description]
 * @param  {[type]}   req  [description]
 * @param  {[type]}   res  [description]
 * @param  {Function} next [description]
 * @return {[type]}        [description]
 */
async function updateServiceReplicas(req, res, next) {
  let {
    name,
    replicas = '0'
  } = req.params;
  replicas = parseInt(replicas);

  // 404 if no service
  if(!name) {
    return next();
  }

  let result = await docker.updateReplicas(name, replicas);
  res.json(result);
}