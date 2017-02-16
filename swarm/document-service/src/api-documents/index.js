
import express from 'express';
import bodyParser from 'body-parser';
import documentService from '../domain/document-service';

// create app
let app = express();
app.use(bodyParser.json());

// create mounts
app.get('/api/documents', (req, res, next) => searchDocuments(req, res, next).catch(next));
app.post('/api/documents', (req, res, next) => createDocument(req, res, next).catch(next));
app.get('/api/documents/:id', (req, res, next) => getDocument(req, res, next).catch(next));
app.put('/api/documents/:id', (req, res, next) => updateDocument(req, res, next).catch(next));
app.delete('/api/documents/:id', (req, res, next) => deleteDocument(req, res, next).catch(next));

// export app
export default app;


/**
 * [searchDocuments description]
 * @param  {[type]}   req  [description]
 * @param  {[type]}   res  [description]
 * @param  {Function} next [description]
 * @return {[type]}        [description]
 */
async function searchDocuments(req, res) {
  let filters = req.query;
  let docs    = await documentService.find(filters);
  res.set('x-paging-start', docs.start);
  res.set('x-paging-limit', docs.limit);
  res.set('x-paging-total', docs.total);
  res.send(docs);
}


/**
 * Gets a document
 * @param  {[type]}   req  [description]
 * @param  {[type]}   res  [description]
 * @param  {Function} next [description]
 * @return {[type]}        [description]
 */
async function getDocument(req, res, next) {
  let {id} = req.params;
  let doc  = await documentService.findById(id);
  if(!doc) return next();
  res.send(doc);
}


/**
 * [createDocument description]
 * @param  {[type]}   req  [description]
 * @param  {[type]}   res  [description]
 * @param  {Function} next [description]
 * @return {[type]}        [description]
 */
async function createDocument(req, res) {
  let doc     = req.body;
  let created = await documentService.createDoc(doc);
  res.send(created);
}


/**
 * [updateDocument description]
 * @param  {[type]}   req  [description]
 * @param  {[type]}   res  [description]
 * @param  {Function} next [description]
 * @return {[type]}        [description]
 */
async function updateDocument(req, res, next) {
  let {id}    = req.params;
  let doc     = req.body;
  let updated = await documentService.updateDoc(id, doc);
  if(!updated) return next();
  res.send(updated);
}


/**
 * [deleteDocument description]
 * @param  {[type]}   req  [description]
 * @param  {[type]}   res  [description]
 * @param  {Function} next [description]
 * @return {[type]}        [description]
 */
async function deleteDocument(req, res, next) {
  let {id} = req.params;
  let doc = await documentService.deleteDoc(id);
  if(!doc) return next();
  res.send(doc);
}