
import serviceHelper from '../common/service-helper';

export default {
  getDocuments,
};

/**
 * [getDocuments description]
 * @param  {[type]} options.title    [description]
 * @param  {[type]} options.page     [description]
 * @param  {[type]} options.pagesize [description]
 * @return {[type]}                  [description]
 */
async function getDocuments({ title, page, pagesize }) {
  return await serviceHelper
    .get({ service: 'documents-service', port: 8000, path: '/api/documents', query: { title, page, pagesize }});
}