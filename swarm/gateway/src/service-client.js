
import http from 'http';

export default {
  get,
};

/**
 * [get description]
 * @param  {[type]} options.name [description]
 * @param  {[type]} options.port [description]
 * @param  {[type]} options.path [description]
 * @return {[type]}              [description]
 */
function get({ name, port, path }) {
  return new Promise((resolve, reject) => {
    let req = http.request({
      method: 'GET',
      host: name,
      port,
      path,
    }, (res) => {
      let buffers = [];
      res.on('error', reject);
      res.on('data', (chunk) => buffers.push(chunk));
      res.on('end', () => {
        let buffer = Buffer.concat(buffers);
        resolve(buffer.toString());
      });
    });
    req.on('error', reject);
    req.end();
  });
}