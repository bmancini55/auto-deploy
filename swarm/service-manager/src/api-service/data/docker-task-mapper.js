import docker from '../common/docker-api';

// export functions
export default {
  getTasks,
};

/**
 * [getTasks description]
 * @param  {[type]} name [description]
 * @return {[type]}      [description]
 */
async function getTasks({ service, state }) {
  let filters = {
    service: { [service]: true },
    'desired-state': { [state]: true }
  };
  filters = encodeURIComponent(JSON.stringify(filters));
  return await docker.get(`/tasks?filters=${filters}`);
}