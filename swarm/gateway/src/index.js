
import express from 'express';
import client from './service-client';

let app = express();

app.get('/', (req, res, next) => index(req, res).catch(next));
app.get('/hello', (req, res, next) => hello(req, res).catch(next));

app.listen(8080, () => console.log('listening on 8080'));

/**
 * [index description]
 * @param  {[type]} req [description]
 * @param  {[type]} res [description]
 * @return {[type]}     [description]
 */
async function index(req, res) {
  res.send('ok');
}

/**
 * [hello description]
 * @param  {[type]} req [description]
 * @param  {[type]} res [description]
 * @return {[type]}     [description]
 */
async function hello(req, res) {

  // dns lookup for service1
  //
  // if dns lookup fails
  //    request service start to manager
  //    manager will create the service
  //    manager will wait for service to become live
  //    manager will reply back
  //
  // make request to service to service1

  // we can hardcode this because of the overlay
  let result = await client.get({ name: 'service1', port: 8080, path: '/' });

  // send response from service
  res.send(result);
};
