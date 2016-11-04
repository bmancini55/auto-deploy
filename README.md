1) start consul docker

  docker run \
  -p 8300:8300 \
  -p 8301:8301 \
  -p 8301:8301/udp \
  -p 8302:8302 \
  -p 8302:8302/udp \
  -p 8400:8400 \
  -p 8500:8500 \
  -p 53:8600 \
  -p 53:8600/udp \
  consul agent -ui -dev -client=0.0.0.0

  Configure resolv.confg to add primary 127.0.0.1 nameserver

2) start nomad on service

  download nomad and extract
  cp nomad /usr/local/bin

  sudo nomad agent -config nomad.conf


3) create nomad definition for a simple service

  create the hcl file:
  nomad run -output service1.nomad > service1.json