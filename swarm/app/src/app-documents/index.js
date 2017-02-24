
import express from 'express';
import bodyParser from 'body-parser';
import documentService from '../domain/document-service';

// create app
const app = express();
app.set('view engine', 'pug');
app.set('views', __dirname);

// configure app
app.use(bodyParser.json());

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
  let documents = await documentService.getDocuments({ title, page, pagesize });

  console.log('sending %d documents', documents.length);
  res.render('documents', { documents });
}

/**
 * [newDocument description]
 * @param  {[type]} req [description]
 * @param  {[type]} res [description]
 * @return {[type]}     [description]
 */
async function newDocument(req, res) {

}

/**
 * [createDocument description]
 * @param  {[type]} req [description]
 * @param  {[type]} res [description]
 * @return {[type]}     [description]
 */
async function createDocument(req, res) {

}

/**
 * [getDocument description]
 * @param  {[type]}   req  [description]
 * @param  {[type]}   res  [description]
 * @param  {Function} next [description]
 * @return {[type]}        [description]
 */
async function getDocument(req, res, next) {

}

/**
 * [editDocument description]
 * @param  {[type]}   req  [description]
 * @param  {[type]}   res  [description]
 * @param  {Function} next [description]
 * @return {[type]}        [description]
 */
async function editDocument(req, res, next) {

}

/**
 * [updateDocument description]
 * @param  {[type]}   req  [description]
 * @param  {[type]}   res  [description]
 * @param  {Function} next [description]
 * @return {[type]}        [description]
 */
async function updateDocument(req, res, next) {

}

/**
 * [deleteDocument description]
 * @param  {[type]}   req  [description]
 * @param  {[type]}   res  [description]
 * @param  {Function} next [description]
 * @return {[type]}        [description]
 */
async function deleteDocument(req, res, next) {

}