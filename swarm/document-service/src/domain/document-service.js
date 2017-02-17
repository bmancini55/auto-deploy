
import documentMapper from '../data/document-mapper';
import indexingClient from '../data/indexing-client';

export default {
  findById,
  find,
  createDoc,
  updateDoc,
  deleteDoc,
};

/**
 * [findById description]
 * @param  {[type]} id [description]
 * @return {[type]}    [description]
 */
async function findById(id) {
  return await documentMapper.findById(id);
}


/**
 * [find description]
 * @param  {[type]} options.page     [description]
 * @param  {[type]} options.pagesize [description]
 * @return {[type]}                  [description]
 */
async function find({ title, page = 1, pagesize = 100}) {
  let results = await indexingClient.searchDocuments({ title, page, pagesize });
  let docs    = await documentMapper.findByIds(results.ids);
  docs.start  = (page - 1) * pagesize;
  docs.limit  = pagesize;
  docs.total  = results.total;
  return docs;
}


/**
 * [createDoc description]
 * @param  {[type]} doc [description]
 * @return {[type]}     [description]
 */
async function createDoc(doc) {
  doc = await documentMapper.insertOne(doc);
  await indexingClient.indexDocument(doc);
  return doc;
}


/**
 * [updateDoc description]
 * @param  {[type]} id         [description]
 * @param  {[type]} properties [description]
 * @return {[type]}            [description]
 */
async function updateDoc(id, properties) {
  let doc = await documentMapper.updateOne(id, properties);
  await indexingClient.indexDocument(doc);
  return doc;
}


/**
 * [deleteDoc description]
 * @param  {[type]} id [description]
 * @return {[type]}    [description]
 */
async function deleteDoc(id) {
  return await documentMapper.deleteOne(id);
}