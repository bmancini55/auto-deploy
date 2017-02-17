
import { MongoClient } from 'mongodb';
import serviceHelper from './service-helper';

let host = serviceHelper.host('mongo_v3');
let url  = `mongodb://${host}:27017/application`;
let instance;

export default {
  db,
  close,
};

// connect at startup!
MongoClient.connect(url, (err, db) => {
  if(err) {
    console.log(err);
    return;
  }
  console.log('connected to %s', url);
  instance = db;
});


/**
 * Returns the DB instance singleton
 * @return {[type]} [description]
 */
function db(){
  return instance;
}


/**
 * Closes the connection if it is open
 * @return {[type]} [description]
 */
function close() {
  instance && instance.close();
}