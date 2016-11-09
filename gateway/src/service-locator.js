
import dns from 'dns';
import http from 'http';

export default {
  locate: locateService
};

export function resolveService(name) {
  return new Promise((resolve, reject) => {
    let serviceName = `${name}.service.consul`;
    dns.resolveSrv(serviceName, (err, addresses) => {
      if(err) reject(err);
      else    resolve(addresses[0]);
    });
  });
}


export function deployService(name) {
  return new Promise((resolve, reject) => {
    let requestPath = `/?service=${name}`;
    let req = http.request({
      host: 'localhost',
      port: 8888,
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

export async function locateService(name) {
  try {
    return await resolveService(name);
  }
  catch (ex) {
    return await deployService(name);
  }
}