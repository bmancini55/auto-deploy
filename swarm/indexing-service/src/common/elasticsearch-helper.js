
import elasticsearch from 'elasticsearch';
import isDocker from 'is-docker';

let host = isDocker() ? 'elasticsearch_v5' : 'localhost';
let url = `${host}:9200`;
let instance;

export default {
  db,
};

// connect at startup
instance = new elasticsearch.Client({ host: url });
instance.ping({}, (err) => {
  if(err) {
    console.log(err);
    process.exit();
    return;
  }
  console.log('elasticsearch connected to %s', url);
});

/**
 * returns the singleton
 * @return {[type]} [description]
 */
function db() {
  return instance;
}

