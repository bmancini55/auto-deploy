
import dns from 'dns';

export default {
  waitForService,
  resolveService,
};

function resolveService(name) {
  return new Promise((resolve, reject) => {
    let serviceName = `${name}.service.consul`;
    dns.resolveSrv(serviceName, (err, addresses) => {
      if(err) reject(err);
      else    resolve(addresses[0]);
    });
  });
}

function waitForService(name) {
  return new Promise((resolve, reject) => {
    let attempts = 0;

    function attempt() {
      attempts += 1;
      if(attempts >= 30) {
        reject(new Error('Service start timeout reached'));
        return;
      }
      resolveService(name)
        .then(resolve)
        .catch(() => setTimeout(attempt, 1000));
    }

    attempt();
  });
}