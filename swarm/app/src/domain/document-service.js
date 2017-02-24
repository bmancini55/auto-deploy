
import documentsClient from '../data/document-client';

export default {
  getDocuments,
  getDocument,
  createDocument,
  updateDocument,
  deleteDocument,
};

/**
 * [getDocuments description]
 * @param  {[type]} query [description]
 * @return {[type]}       [description]
 */
async function getDocuments(query) {
  return await documentsClient.getDocuments(query);
}

/**
 * [getDocument description]
 * @param  {[type]} id [description]
 * @return {[type]}    [description]
 */
async function getDocument(id) {
  return await documentsClient.getDocument(id);
}

/**
 * [createDocument description]
 * @param  {[type]} doc [description]
 * @return {[type]}     [description]
 */
async function createDocument(doc) {
  return await documentsClient.createDocument(doc);
}

/**
 * [updateDocument description]
 * @param  {[type]} id  [description]
 * @param  {[type]} doc [description]
 * @return {[type]}     [description]
 */
async function updateDocument(id, doc) {
  return await documentsClient.updateDocument(id, doc);
}

/**
 * [deleteDocument description]
 * @param  {[type]} id [description]
 * @return {[type]}    [description]
 */
async function deleteDocument(id) {
  return await documentsClient.deleteDocument(id);
}