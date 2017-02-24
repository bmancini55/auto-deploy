
import express from 'express';
import pjson from '../../package.json';
import es from '../common/elasticsearch-helper';

// create the app
const app = express();

// attach endpoints
app.get('/', (req, res, next) => getDiagnositics(req, res).catch(next));

// export app
export default app;

/**
 * [getDiagnositics description]
 * @param  {[type]} req [description]
 * @param  {[type]} res [description]
 * @return {[type]}     [description]
 */
async function getDiagnositics(req, res) {
  let service      = pjson.name;
  let version      = pjson.version;
  let majorVersion = version.substr(0, version.indexOf('.'));
  let esOk         = !!es.db();
  let ok           = esOk;
  res.send({
    name: `${service}_v${majorVersion}`,
    service,
    version,
    ok,
    checks: {
      'elasticsearch': esOk
    }
  });
}