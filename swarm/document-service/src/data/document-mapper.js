import mongo from '../common/mongo';

export default {
  findById,
  findByIds,
  insertOne,
  updateOne,
  deleteOne,
};


/**
 * [findById description]
 * @param  {[type]} id [description]
 * @return {[type]}    [description]
 */
async function findById(id) {
  let collection = mongo.db().collection('documents');
  return await collection.findOne({ _id: id });
}


/**
 * [findByIds description]
 * @param  {[type]} ids [description]
 * @return {[type]}     [description]
 */
async function findByIds(ids) {
  let collection = mongo.db().collection('documents');
  return await collection.find({ _id: { $in: ids } }).toArray();
}


/**
 * [insertOne description]
 * @param  {[type]} options.id    [description]
 * @param  {[type]} options.title [description]
 * @return {[type]}               [description]
 */
async function insertOne({ id, title }) {
  let collection = mongo.db().collection('documents');
  let result = await collection.insertOne({
    _id: id,
    title,
    created: new Date(),
    updated: new Date(),
  });
  return result.ops[0];
}


/**
 * [updateOne description]
 * @param  {[type]} options.id    [description]
 * @param  {[type]} options.title [description]
 * @return {[type]}               [description]
 */
async function updateOne(id, { title }) {
  let collection = mongo.db().collection('documents');
  let filter = { _id: id };
  let update = {
    $set: {
      title,
      updated: new Date()
    }
  };
  let result = await collection.findOneAndUpdate(filter, update, { returnOriginal: false });
  return result.value;
}


/**
 * [deleteOne description]
 * @param  {[type]} id [description]
 * @return {[type]}    [description]
 */
async function deleteOne(id) {
  let collection = mongo.db().collection('documents');
  let result = await collection.findOneAndDelete({ _id: id });
  return result.value;
}

