
import { MongoClient } from 'mongodb';

let url = 'mongodb://mongodb:27017/application';
let instance;

export default {
  db,
}

MongoClient.connect(url, (err, db) => {
  if(err) {
    console.log(err);
    return;
  }
  console.log('connected to %s', url);
  instance = db;
});

function db(){
  return instance;
}
