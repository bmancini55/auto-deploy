
import serviceHelper from '../common/service-helper';

export default {
  getDocuments,
  getDocument,
  createDocument,
  updateDocument,
  deleteDocument,
};

const service = 'documents-service';
const port = 8000;

/**
 * [getDocuments description]
 * @param  {[type]} options.title    [description]
 * @param  {[type]} options.page     [description]
 * @param  {[type]} options.pagesize [description]
 * @return {[type]}                  [description]
 */
async function getDocuments({ title, page, pagesize }) {
  return await serviceHelper
    .get({ service, port, path: '/api/documents', query: { title, page, pagesize }});
}

/**
 * [getDocument description]
 * @param  {[type]} id [description]
 * @return {[type]}    [description]
 */
async function getDocument(id) {
  return await serviceHelper
    .get({ service, port, path: '/api/documents/' + id });
}

/**
 * [createDocument description]
 * @param  {[type]} doc [description]
 * @return {[type]}     [description]
 */
async function createDocument(doc) {
  return await serviceHelper
    .post({ service, port, path: '/api/documents', json: doc });
}

/**
 * [updateDocument description]
 * @param  {[type]} id  [description]
 * @param  {[type]} doc [description]
 * @return {[type]}     [description]
 */
async function updateDocument(id, doc) {
  return await serviceHelper
    .put({ service, port, path: '/api/documents/' + id, json: doc });
}

/**
 * [deleteDocument description]
 * @param  {[type]} id [description]
 * @return {[type]}    [description]
 */
async function deleteDocument(id) {
  return await serviceHelper
    .del({ service, port, path: '/api/documents/' + id });
}