
import http from 'http';

const swarmHost = '127.0.0.1';
const managerPort = 4111;

export default {
  resolve,
};


/**
 * [getService description]
 * @param  {[type]} name [description]
 * @return {[type]}      [description]
 */
async function resolve(name) {
  let result = await queryManager(name);
  let port = result.Endpoint.Ports[0].PublishedPort;
  return {
    name: swarmHost,
    port,
  };
}


/**
 * [getService description]
 * @param  {[type]} name [description]
 * @return {[type]}      [description]
 */
function queryManager(name) {
  return new Promise((resolve, reject) => {
    let req = http.get({
      host: swarmHost,
      port: managerPort,
      path: `/query?service=${name}`
    }, (res) => {
      let buffers = [];
      res.on('error', reject);
      res.on('data', (buffer) => buffers.push(buffer))
      res.on('end', () => {
        let buffer = Buffer.concat(buffers);
        let text = buffer.toString();
        console.log('query manager response', text);
        let json = JSON.parse(text);
        resolve(json);
      });
    });
    req.on('error', reject);
  });
}