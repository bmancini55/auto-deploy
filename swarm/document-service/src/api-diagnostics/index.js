
import express from 'express';
import pjson from '../../package.json';
import mongo from '../common/mongo-helper';

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
  let mongoOk      = !!mongo.db();
  let ok           = mongoOk;
  res.send({
    name: `${service}_v${majorVersion}`,
    service,
    version,
    ok,
    checks: {
      'mongo': mongoOk
    }
  });
}