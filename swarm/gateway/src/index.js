
import express from 'express';
import client from './service-client';
import discovery from './service-discovery';

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

  // find the port
  let server = await discovery.resolve('service1');
  console.log('found server %j', server);

  // connect to the service
  let result = await client.get({ ...server, path: '/' });

  // send response from service
  res.send(result);
};
