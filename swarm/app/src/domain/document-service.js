
import documentsClient from '../data/document-client';

export default {
  getDocuments,
};

/**
 * [getDocuments description]
 * @param  {[type]} query [description]
 * @return {[type]}       [description]
 */
async function getDocuments(query) {
  return await documentsClient.getDocuments(query);
}