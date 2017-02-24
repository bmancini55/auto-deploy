
import documentsClient from '../data/document-client';

export default {
  getDocuments,
  getDocument,
  createDocument,
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