
import dns from 'dns';
import http from 'http';

const MANAGER_IP = process.env.MANAGER_IP || '127.0.0.1';

export default {
  locate: locateService
};

/**
 * This attempts to resolve the service and if it can't
 * find it, will deploy the service via the manager
 * @param  {[type]} name [description]
 * @return {[type]}      [description]
 */
async function locateService(name) {
  try {
    return await resolveService(name);
  }
  catch (ex) {
    return await deployService(name);
  }
}


//////////////////////////////////////////////


/**
 * DNS lookup for the SRV record for the service
 * in the format <service_name>.service.consul
 * @param  {[type]} name [description]
 * @return {[type]}      [description]
 */
function resolveService(name) {
  return new Promise((resolve, reject) => {
    let serviceName = `${name}.service.consul`;
    dns.resolveSrv(serviceName, (err, addresses) => {
      if(err) reject(err);
      else    resolve(addresses[0]);
    });
  });
}

/**
 * Call ther service manager to start the service with the
 * specified name.  The service manager will return the location
 * of the service after it has started.
 * @param  {[type]} name [description]
 * @return {[type]}      [description]
 */
function deployService(name) {
  return new Promise((resolve, reject) => {
    let requestPath = `/start?service=${name}`;
    let req = http.request({
      host: MANAGER_IP,
      port: 4111,
      path: requestPath,
      method: 'GET',
    }, (res) => {
      let buffers = [];
      res.on('error', reject);
      res.on('data', (chunk) => buffers.push(chunk));
      res.on('end', () => {
        let buffer = Buffer.concat(buffers);
        let result = JSON.parse(buffer.toString());
        resolve(result);
      });
    });
    req.on('error', reject);
    req.end();
  });
}