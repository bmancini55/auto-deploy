import docker from 'docker-remote-api';
import isDocker from 'is-docker';

let API_VERSION = 'v1.26';
let STACK_NAME = process.env.STACK_NAME || 'test';

// detects if running inside a docker container and mounts to volume
// provided at run time, otherwise it will use the default docker
// unix socker with the assumption that the process is running on a machine
// that can connect to the docker socket
let host = isDocker() ? '/tmp/docker.sock' : '/var/run/docker.sock';

// create a remote api client
let request = docker({ host,  });

export default {
  getService,
  updateReplicas,
};

/**
 * [getService description]
 * @param  {[type]} name [description]
 * @return {[type]}      [description]
 */
async function getService(name) {
  console.log(`fetching service ${STACK_NAME}_${name}`);
  return await get(`/services/${STACK_NAME}_${name}`);
}


/**
 * This process loads the current service definition, reads the spec, and
 * then performs and update on the Replicas.  This functionality is similar to
 * Docker CLI
 * https://github.com/docker/docker/blob/1.13.x/cli/command/service/scale.go#L85
 * @param  {[type]} name    [description]
 * @param  {[type]} updates [description]
 * @return {[type]}         [description]
 */
async function updateReplicas(name, replicas) {
  console.log(`updating service ${STACK_NAME}_${name} to ${replicas} replicas`);
  let service = await getService(name);

  let spec = service.Spec;
  spec.Mode.Replicated.Replicas = replicas;

  let version = service.Version.Index;
  let url = `/services/${STACK_NAME}_${name}/update?version=${version}`;
  return await post(url, spec);
}



////////////////////////////////////////
///


function get(url) {
  return new Promise((resolve, reject) => {
    request.get(url, { json: true, version: API_VERSION  }, (err, result) => {
      if(err) reject(err);
      else    resolve(result);
    });
  });
}

function post(url, data) {
  return new Promise((resolve, reject) => {
    request.post(url, { json: data, version: API_VERSION }, (err, result) => {
      if(err) reject(err);
      else    resolve(result);
    });
  });
}


// SAMPLE SERVICE
/*
{
  "ID": "tkzqrrsy877g0hxjy9cyjrrc1",
  "Version": {
    "Index": 1898
  },
  "CreatedAt": "2017-02-11T23:32:23.020330768Z",
  "UpdatedAt": "2017-02-11T23:32:23.020330768Z",
  "Spec": {
    "Name": "test_elasticsearch5",
    "TaskTemplate": {
      "ContainerSpec": {
        "Image": "elasticsearch:5@sha256:8f4c23871494b6baacbaf0c9f6ee48db1b5c62de33f9c4c14b2e17f1922e56ee",
        "DNSConfig": {}
      },
      "Resources": {
        "Limits": {},
        "Reservations": {}
      },
      "RestartPolicy": {
        "Condition": "any",
        "MaxAttempts": 0
      },
      "Placement": {},
      "ForceUpdate": 0
    },
    "Mode": {
      "Replicated": {
        "Replicas": 1
      }
    },
    "UpdateConfig": {
      "Parallelism": 1,
      "FailureAction": "pause",
      "MaxFailureRatio": 0
    },
    "EndpointSpec": {
      "Mode": "vip"
    }
  },
  "Endpoint": {
    "Spec": {}
  },
  "UpdateStatus": {
    "StartedAt": "0001-01-01T00:00:00Z",
    "CompletedAt": "0001-01-01T00:00:00Z"
  }
}

 */