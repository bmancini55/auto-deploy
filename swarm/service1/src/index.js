
import express from 'express';

let app = express();

app.get('/', (req, res, next) => index(req, res).catch(next));

app.listen(8080, console.log('listening on 8080'));

/**
 * [index description]
 * @param  {[type]} req [description]
 * @param  {[type]} res [description]
 * @return {[type]}     [description]
 */
async function index(req, res) {
  let name = req.query.name || 'world';
  res.send(`hello ${name}`);
};