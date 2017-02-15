///
///

import express from 'express';
import dockerService from './domain/docker-service';

// create app
const app = express();

// mount endpoints
app.get('/api/service/:name', (req, res, next) => queryService(req, res, next).catch(next));
app.put('/api/service/:name/replicas/:replicas', (req, res, next) => updateServiceReplicas(req, res, next).catch(next));
app.get('/api/service/:name/state', (req, res, next) => serviceState(req, res, next).catch(next));
app.put('/api/service/:name/start', (req, res, next) => startService(req, res, next).catch(next));

// export app
export default app;


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
    return next();
  }

  // perform docker service query
  let result = await dockerService.getService(name);

  // return result
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

  // 404 if no service
  if(!name) {
    return next();
  }

  // update replicates
  let result = await dockerService.updateReplicas(name, replicas);

  // return updated service
  res.json(result);
}


/**
 * [serviceStatus description]
 * @param  {[type]}   req  [description]
 * @param  {[type]}   res  [description]
 * @param  {Function} next [description]
 * @return {[type]}        [description]
 */
async function serviceState(req, res, next) {
  let { name } = req.params;

  // 404 if no service
  if(!name) {
    return next();
  }

  // get the state
  let state = await dockerService.getServiceState(name);

  // return the state
  res.json(state);
}


/**
 * [startService description]
 * @param  {[type]}   req  [description]
 * @param  {[type]}   res  [description]
 * @param  {Function} next [description]
 * @return {[type]}        [description]
 */
async function startService(req, res, next) {
  let { name } = req.params;

  // 404 if no service
  if(!name) {
    return next();
  }

  // ensure task is running
  let result = await dockerService.startService(name);

  // send the service
  res.json(result);
}