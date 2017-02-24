
import express from 'express';
import bodyParser from 'body-parser';
import documentService from '../domain/document-service';

// create app
const app = express();
app.use(bodyParser.json());

// attach endpoints
app.post('/api/documents', (req, res, next) => indexDocument(req, res).catch(next));
app.get('/api/documents', (req, res, next) => searchDocuments(req, res).catch(next));

// export app
export default app;

/**
 * [indexDocument description]
 * @param  {[type]} req [description]
 * @param  {[type]} res [description]
 * @return {[type]}     [description]
 */
async function indexDocument(req, res) {
  let doc = req.body;
  console.log(doc);
  await documentService.indexDocument(doc);
  res.send(doc);
}

/**
 * [searchDocuments description]
 * @param  {[type]} req [description]
 * @param  {[type]} res [description]
 * @return {[type]}     [description]
 */
async function searchDocuments(req, res) {
  let options = req.query;
  let results = await documentService.searchDocuments(options);
  res.send(results);
}