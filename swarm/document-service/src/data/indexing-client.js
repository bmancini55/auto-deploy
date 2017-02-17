
import serviceClient from '../common/service-helper';

export default {
  indexDocument,
  searchDocuments,
};

/**
 * [indexDocument description]
 * @param  {[type]} doc [description]
 * @return {[type]}     [description]
 */
async function indexDocument(doc) {
  return serviceClient.post({
    service: 'indexing-service_v1',
    port: 8001,
    path: '/api/documents',
    json: doc
  });
}


/**
 * [searchDocuments description]
 * @param  {[type]} query [description]
 * @return {[type]}       [description]
 */
async function searchDocuments(query) {
  return serviceClient.get({
    service: 'indxing-service_v1',
    port: 8001,
    path: '/api/documents',
    query,
  });
}