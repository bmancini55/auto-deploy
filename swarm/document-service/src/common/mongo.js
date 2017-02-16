
import { MongoClient } from 'mongodb';
import isDocker from 'is-docker';

let host = isDocker() ? 'mongodb' : 'localhost';
let url = `mongodb://${host}:27017/application`;
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