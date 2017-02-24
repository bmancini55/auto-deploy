
import es from '../common/elasticsearch-helper.js';

export default {
  createIndex,
  indexDocument,
  searchDocuments,
};

/**
 * [createIndex description]
 * @return {[type]} [description]
 */
async function createIndex() {
  await es.db().indices.create({
    index: 'documents'
  });
}


/**
 * [indexDocument description]
 * @param  {[type]} doc [description]
 * @return {[type]}     [description]
 */
async function indexDocument(doc) {
  let body = {...doc};
  delete body._id;
  await es.db().index({
    index: 'documents',
    type: 'document',
    id: doc._id,
    body,
  });
}


/**
 * [searchDocuments description]
 * @param  {[type]} options.title    [description]
 * @param  {[type]} options.page     [description]
 * @param  {[type]} options.pagesize [description]
 * @return {[type]}                  [description]
 */
async function searchDocuments({ title , page = 1, pagesize = 100 }) {
  let body = {
    query: {
      bool: {
        must: []
      }
    },
    from: (page - 1) * pagesize,
    size: pagesize,
  };
  if(title) {
    body.query.bool.must.push({
      term: { title: title }
    });
  }
  let results = await es.db().search({
    index: 'documents',
    body,
  });
  return results;
}