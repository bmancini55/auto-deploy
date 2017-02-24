
import express from 'express';
import bodyParser from 'body-parser';
import documentService from '../domain/document-service';

// create app
const app = express();
app.set('view engine', 'pug');
app.set('views', __dirname + '/views');

// configure app
app.use(bodyParser.urlencoded({ extended: false }));

// add mounts
app.get('/documents', (req, res, next) => getDocuments(req, res).catch(next));
app.get('/documents/new', (req, res, next) => newDocument(req, res).catch(next));
app.post('/documents/', (req, res, next) => createDocument(req, res).catch(next));
app.get('/documents/:id', (req, res, next) => getDocument(req, res, next).catch(next));
app.get('/documents/:id/edit', (req, res, next) => editDocument(req, res, next).catch(next));
app.post('/documents/:id/update', (req, res, next) => updateDocument(req, res, next).catch(next));
app.post('/documents/:id/delete', (req, res, next) => deleteDocument(req, res, next).catch(next));

// export app
export default app;

//////////////////////////

/**
 * [getDocuments description]
 * @param  {[type]} req [description]
 * @param  {[type]} res [description]
 * @return {[type]}     [description]
 */
async function getDocuments(req, res) {
  let {
    title,
    page,
    pagesize,
  } = req.query;

  console.log('getting documents');
  let docs = await documentService.getDocuments({ title, page, pagesize });

  console.log('sending %d documents', docs.length);
  res.render('documents', { docs });
}

/**
 * [newDocument description]
 * @param  {[type]} req [description]
 * @param  {[type]} res [description]
 * @return {[type]}     [description]
 */
async function newDocument(req, res) {
  res.render('new');
}

/**
 * [createDocument description]
 * @param  {[type]} req [description]
 * @param  {[type]} res [description]
 * @return {[type]}     [description]
 */
async function createDocument(req, res) {
  let doc = req.body;

  console.log('creating document');
  doc = await documentService.createDocument(doc);

  res.redirect('/documents/' + doc._id);
}

/**
 * [getDocument description]
 * @param  {[type]}   req  [description]
 * @param  {[type]}   res  [description]
 * @param  {Function} next [description]
 * @return {[type]}        [description]
 */
async function getDocument(req, res, next) {
  let {id} = req.params;

  console.log('fetching document %s', id);
  let doc = await documentService.getDocument(id);

  if(!doc) return next();

  res.render('document', { doc });
}

/**
 * [editDocument description]
 * @param  {[type]}   req  [description]
 * @param  {[type]}   res  [description]
 * @param  {Function} next [description]
 * @return {[type]}        [description]
 */
async function editDocument(req, res, next) {
  let {id} = req.params;

  console.log('fetching document %s', id);
  let doc = await documentService.getDocument(id);

  if(!doc) return next();

  res.render('edit', { doc });
}

/**
 * [updateDocument description]
 * @param  {[type]}   req  [description]
 * @param  {[type]}   res  [description]
 * @param  {Function} next [description]
 * @return {[type]}        [description]
 */
async function updateDocument(req, res, next) {
  let {id} = req.params;
  let doc = req.body;

  console.log('Updating document');
  doc = await documentService.updateDocument(id, doc);

  if(!doc) return next();

  res.redirect('/documents/' + doc._id);
}

/**
 * [deleteDocument description]
 * @param  {[type]}   req  [description]
 * @param  {[type]}   res  [description]
 * @param  {Function} next [description]
 * @return {[type]}        [description]
 */
async function deleteDocument(req, res) {
  let {id} = req.params;

  console.log('Deleting document %s', id);
  await documentService.deleteDocument(id);

  res.redirect('/documents');
}
