
import express from 'express';
import docker from './docker-client';

let app = express();

app.get('/', (req, res, next) => index(req, res).catch(next));
app.get('/query', (req, res, next) => query(req, res, next).catch(next));

app.listen(8080, () => console.log('listening on 8080'));

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
async function query(req, res, next) {
  let { service } = req.query;

  // 404 if no service
  if(!service) {
    next();
    return;
  }

  // perform docker service query
  let result = await docker.getService(service);

  res.send(result);
}