
import http from 'http';

export default {
  get,
};

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