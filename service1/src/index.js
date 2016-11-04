
import express from 'express';
import dns from 'dns';

let app = express();

app.get('/', (req, res, next) => index(req, res).catch(next));


async function index(req, res) {
  res.send('hello world');
};

app.listen(8080);