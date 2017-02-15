
import serviceMapper from '../data/docker-service-mapper';
import taskMapper from '../data/docker-task-mapper';

export default {
  getService,
  updateReplicas,
  getServiceState,
  startService,
};


/**
 * [getService description]
 * @param  {[type]} name [description]
 * @return {[type]}      [description]
 */
async function getService(name) {
  return await serviceMapper.getService(name);
}


/**
 * [updateReplicas description]
 * @param  {[type]} name     [description]
 * @param  {[type]} replicas [description]
 * @return {[type]}          [description]
 */
async function updateReplicas(name, replicas) {
  replicas = parseInt(replicas);
  return await serviceMapper.updateReplicas(name, replicas);
}

/**
 * [getServiceState description]
 * @param  {[type]} name [description]
 * @return {[type]}      [description]
 */
async function getServiceState(name) {
  let tasks = await taskMapper.getTasks({ service: name, state: 'running' });
  return tasks[0] && tasks[0].Status.State;
}


/**
 * [ensureService description]
 * @param  {[type]} name [description]
 * @return {[type]}      [description]
 */
async function startService(name, replicas = 1) {


  // check if state is running and return service
  if(await ok()) {
    return await getService(name);
  }

  // if not, start it
  await updateReplicas(name, replicas);

  // wait for service to start
  await pollStart();

  // return the service
  return await getService(name);


  async function ok() {
    let currentState = await getServiceState(name);
    return currentState === 'running';
  }

  async function delay(delay = 1000) {
    return new Promise((resolve) => {
      setTimeout(resolve, delay);
    });
  }

  async function pollStart(start = new Date(), timeout = 90000) {
    while(!await ok()) {
      if(new Date() - start > timeout) {
        throw new Error('service start timed out');
      }
      await delay();
    }
  }
}