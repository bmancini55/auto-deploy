
import documentMapper from '../data/document-mapper';

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
  await documentMapper.indexDocument(doc);
}

/**
 * [searchDocuments description]
 * @param  {[type]} options [description]
 * @return {[type]}         [description]
 */
async function searchDocuments(options) {
  let results;
  try {
    results = await documentMapper.searchDocuments(options);
    let hits = results.hits;
    let ids = hits.hits.map(p => p._id);
    return {
      total: hits.total,
      ids,
    };
  }
  catch (ex) {
    if(ex.message.startsWith('[index_not_found_exception]')) {
      await documentMapper.createIndex();
      return await searchDocuments(options);
    }
    else {
      throw ex;
    }
  }
}