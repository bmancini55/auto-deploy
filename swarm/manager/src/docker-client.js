import docker from 'docker-remote-api';
import isDocker from 'is-docker';

// this is the name of the `docker deploy`. all services will be prefixed
// with this prefix name to allow duplicate deployments on the same cluster.
// this could be provided by environment variable instead of hard coded
let deployPrefix = 'swarm_';

// detects if running inside a docker container and mounts to volume
// provided at run time, otherwise it will use the default docker
// unix socker with the assumption that the process is running on a machine
// that can connect to the docker socket
let host = isDocker() ? '/tmp/docker.sock' : '/var/run/docker.sock';

// create a remote api client
let request = docker({ host });

export default {
  getService,
};

/**
 * [getService description]
 * @param  {[type]} name [description]
 * @return {[type]}      [description]
 */
function getService(name) {
  return new Promise((resolve, reject) => {
    request.get(`/services/${deployPrefix}${name}`, {json: true }, (err, result) => {
      if(err) reject(err);
      else    resolve(result);
    });
  });
}