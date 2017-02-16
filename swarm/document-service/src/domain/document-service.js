
import documentMapper from '../data/document-mapper';

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
async function find({ page, pagesize }) {
  // TODO -> call indexing service
  // fetch records by id
}


/**
 * [createDoc description]
 * @param  {[type]} doc [description]
 * @return {[type]}     [description]
 */
async function createDoc(doc) {
  return await documentMapper.insertOne(doc);
}


/**
 * [updateDoc description]
 * @param  {[type]} id         [description]
 * @param  {[type]} properties [description]
 * @return {[type]}            [description]
 */
async function updateDoc(id, properties) {
  return await documentMapper.updateOne(id, properties);
}


/**
 * [deleteDoc description]
 * @param  {[type]} id [description]
 * @return {[type]}    [description]
 */
async function deleteDoc(id) {
  return await documentMapper.deleteOne(id);
}