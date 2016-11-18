
import express from 'express';
import locator from './service-locator';
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
  res.send('gateway');
}

/**
 * [hello description]
 * @param  {[type]} req [description]
 * @param  {[type]} res [description]
 * @return {[type]}     [description]
 */
async function hello(req, res) {
  let address = await locator.locate('service1');
  console.log(address);

  let result = await client.get({ ...address, path: '/hello' });
  res.send(result);
};

