
import express from 'express';

let app = express();

app.get('/', (req, res, next) => index(req, res).catch(next));


async function index(req, res) {
  let name = req.query.name || 'world';
  res.send(`hello ${name}`);
};

app.listen(8080);