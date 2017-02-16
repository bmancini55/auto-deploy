
import express from 'express';
import dockerService from '../domain/docker-service';
import pjson from '../../package.json';

// create app
const app = express();

// create mounts
app.get('/', (req, res, next) => diagnostics(req, res).catch(next));

// export
export default app;


/////////////////////////////

async function diagnostics(req, res) {
  let service      = pjson.name;
  let version      = pjson.version;
  let majorVersion = pjson.version.substr(0, pjson.version.indexOf('.'));
  let dockerOk     = await dockerService.connectionOk();
  let ok           = dockerOk;
  res.send({
    name: `${service}_v${majorVersion}`,
    service,
    version,
    ok,
    checks: {
      'docker-api': dockerOk,
    }
  });

}
