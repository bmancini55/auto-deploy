import docker from '../common/docker-api';

// export functions
export default {
  getInfo
};

/**
 * [getService description]
 * @param  {[type]} name [description]
 * @return {[type]}      [description]
 */
async function getInfo() {
  console.log('fetching info');
  return await docker.get('/info');
}