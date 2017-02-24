
import serviceClient from '../common/service-helper';

export default {
  indexDocument,
  searchDocuments,
};

const service = 'indexing-service_v1';
const port = 8001;

/**
 * [indexDocument description]
 * @param  {[type]} doc [description]
 * @return {[type]}     [description]
 */
async function indexDocument(doc) {
  return serviceClient.post({
    service,
    port,
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
    service,
    port,
    path: '/api/documents',
    query,
  });
}