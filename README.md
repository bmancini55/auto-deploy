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

  download nomad 5.0-rc1 or equivalent and extract it:
  https://releases.hashicorp.com/nomad/

  extract nomad

  cp nomad /usr/local/bin

  sudo nomad agent -dev -config nomad.conf

  Couple things here...
  https://github.com/hashicorp/nomad/issues/1091
  1) need to set the data_dir to /tmp
  2) need to set the logging type to "json_file" so that the syslog doesn't fail... however this won't work 4.1, so we need to use 5.0


3) create nomad definition for a simple service

  create the hcl file:
  nomad run -output service1.nomad > service1.json