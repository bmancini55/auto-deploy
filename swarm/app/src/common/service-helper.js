// Note this is written in pure Node6 without transpiling for support as a separate library.

let http     = require('http');
let qs       = require('qs');
let isDocker = require('is-docker');

module.exports = {
  host: normalizeHost,
  get,
  post,
  put,
  del,
};

/**
 * This supports local debugging via localhost
 * and supports running inside of a swarm via the
 * well known service name this is supplied
 * @param  {[type]} name [description]
 * @return {[type]}      [description]
 */
function normalizeHost(name) {
  if(isDocker()) {
    return name;
  }
  else {
    return 'localhost';
  }
}

/**
 * [get description]
 * @param  {[type]} options.host [description]
 * @param  {[type]} options.port [description]
 * @param  {[type]} options.path [description]
 * @return {[type]}              [description]
 */
function get({ service, port, path, query }) {
  return new Promise((resolve, reject) => {
    let req = http.request({
      host: normalizeHost(service),
      port,
      path: path + '?' + qs.stringify(query),
      method: 'GET',
    }, (res) => {
      let buffers = [];
      res.on('error', reject);
      res.on('data', (buffer) => buffers.push(buffer));
      res.on('end', () => res.statusCode === 200
          ? resolve(JSON.parse(Buffer.concat(buffers).toString()))
          : reject(Buffer.concat(buffers)));
    });
    req.on('error', reject);
    req.end();
  });
}

/**
 * [post description]
 * @param  {[type]} options.host [description]
 * @param  {[type]} options.port [description]
 * @param  {[type]} options.path [description]
 * @param  {[type]} options.json [description]
 * @return {[type]}              [description]
 */
function post({ service, port, path, json }) {
  return new Promise((resolve, reject) => {
    let data = JSON.stringify(json);
    let req = http.request({
      host: normalizeHost(service),
      port,
      path,
      method: 'POST',
      headers: {
        'Content-Length': Buffer.byteLength(data),
        'Content-Type': 'application/json'
      }
    }, (res) => {
      let buffers = [];
      res.on('error', reject);
      res.on('data', (buffer) => buffers.push(buffer));
      res.on('end', () => res.statusCode === 200
          ? resolve(JSON.parse(Buffer.concat(buffers).toString()))
          : reject(Buffer.concat(buffers)));
    });
    req.on('error', reject);
    console.log(data);
    req.write(data);
    req.end();
  });
}

/**
 * [put description]
 * @param  {[type]} options.host [description]
 * @param  {[type]} options.port [description]
 * @param  {[type]} options.path [description]
 * @param  {[type]} options.json [description]
 * @return {[type]}              [description]
 */
function put({ service, port, path, json }) {
  return new Promise((resolve, reject) => {
    let data = JSON.stringify(json);
    let req = http.request({
      host: normalizeHost(service),
      port,
      path,
      method: 'PUT',
      headers: {
        'Content-Length': Buffer.byteLength(data),
        'Content-Type': 'application/json'
      }
    }, (res) => {
      let buffers = [];
      res.on('error', reject);
      res.on('data', (buffer) => buffers.push(buffer));
      res.on('end', () => res.statusCode === 200
          ? resolve(JSON.parse(Buffer.concat(buffers).toString()))
          : reject(Buffer.concat(buffers)));
    });
    req.on('error', reject);
    req.write(data);
    req.end();
  });
}

/**
 * [del description]
 * @param  {[type]} options.host [description]
 * @param  {[type]} options.port [description]
 * @param  {[type]} options.path [description]
 * @return {[type]}              [description]
 */
function del({ service, port, path }) {
  return new Promise((resolve, reject) => {
    let req = http.request({
      host: normalizeHost(service),
      port,
      path,
      method: 'DELETE',
    }, (res) => {
      let buffers = [];
      res.on('error', reject);
      res.on('data', (buffer) => buffers.push(buffer));
      res.on('end', () => res.statusCode === 200
          ? resolve(JSON.parse(Buffer.concat(buffers).toString()))
          : reject(Buffer.concat(buffers)));
    });
    req.on('error', reject);
    req.end();
  });
}