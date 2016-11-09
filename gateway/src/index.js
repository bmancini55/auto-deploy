
import express from 'express';
import locator from './service-locator';
import client from './service-client';

let app = express();

app.get('/', (req, res, next) => index(req, res).catch(next));


async function index(req, res) {
  let service = req.query.service || 'consul';

  let address = await locator.locate(service);
  console.log(address);

  let result = await client.get({ ...address, path: '/' });
  res.send(result);
};

app.listen(8080);

