///
/// Wraps the dockre remote api for use in docker mappers
///

import docker from 'docker-remote-api';
import isDocker from 'is-docker';

let API_VERSION = 'v1.26';

// detects if running inside a docker container and mounts to volume
// provided at run time, otherwise it will use the default docker
// unix socker with the assumption that the process is running on a machine
// that can connect to the docker socket
let host = isDocker() ? '/tmp/docker.sock' : '/var/run/docker.sock';

// create a remote api client
let request = docker({ host });

// export
export default {
  get,
  post,
};


/**
 * Performs a GET operation
 * @param  {[type]} url [description]
 * @return {[type]}     [description]
 */
function get(url) {
  return new Promise((resolve, reject) => {
    request.get(url, { json: true, version: API_VERSION  }, (err, result) => {
      if(err) reject(err);
      else    resolve(result);
    });
  });
}

/**
 * Performs a POST operation
 * @param  {[type]} url  [description]
 * @param  {[type]} data [description]
 * @return {[type]}      [description]
 */
function post(url, data) {
  return new Promise((resolve, reject) => {
    request.post(url, { json: data, version: API_VERSION }, (err, result) => {
      if(err) reject(err);
      else    resolve(result);
    });
  });
}