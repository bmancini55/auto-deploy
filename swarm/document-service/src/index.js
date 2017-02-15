
import express from 'express';
import mongo from './mongo';

let app = express();

app.get('/', (req, res, next) => index(req, res).catch(next));
app.get('/api/documents/:id', (req, res, next) => getDocument(req, res, next).catch(next));

app.listen(8080, console.log('listening on 8080'));

/**
 * [index description]
 * @param  {[type]} req [description]
 * @param  {[type]} res [description]
 * @return {[type]}     [description]
 */
async function index(req, res) {
  res.send('document-service');
};


/**
 * Gets a document
 * @param  {[type]}   req  [description]
 * @param  {[type]}   res  [description]
 * @param  {Function} next [description]
 * @return {[type]}        [description]
 */
async function getDocument(req, res, next) {
  let db = mongo.db();
  let collection = db.collection('documents');

  let { id } = req.params;
  let doc = await collection.findOne({ _id: id });

  if(!doc) {
    return next();
  }

  res.send(doc);
}



