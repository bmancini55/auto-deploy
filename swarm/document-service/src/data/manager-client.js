
import service from '../common/service-helper';

export default {
  getService,
  startService,
  checkService,
};

/**
 * [service description]
 * @param  {[type]} name [description]
 * @return {[type]}      [description]
 */
function getService(name) {
  return service.get({ host: service.host(name), port: 4111, path: `/api/services/${name}`});
}

/**
 * Scales a service
 * @param  {[type]} name   [description]
 * @param  {[type]} amount [description]
 * @return {[type]}        [description]
 */
function startService(name) {
  return service.get({ host: service.host(name), port: 4111, path: `/api/services/${name}/start` });
}


/**
 * [check description]
 * @param  {[type]} name [description]
 * @param  {[type]} port [description]
 * @return {[type]}      [description]
 */
function checkService(name) {
  return service.get({ host: service.host(name), port: 4111, path: `/api/services/${name}/state`})
    .then((state) => {
      return state !== 'running'
        ? startService(name)
        : getService(name);
    });
}
