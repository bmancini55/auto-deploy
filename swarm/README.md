Architecture:
  -> services created as name:version with auto-assigned published port
  -> permanent services can use well known published ports (such as elasticsearch)
  -> docker service runs on known discovery port (could just actually expose docker API)

  -> client knows name:version it want
  -> client checks for cached published port
  -> client makes request to docker for published port on known discovery port
  -> client retrieves published port and makes connection on that port


```
docker swarm init
```


Create the network overlay to allow communication between containers
```
docker network create --driver overlay swarm_my-network
```


Start the manager as a service
```
docker service create --name swarm_manager --network swarm_my-network --mount type=bind,source=/var/run/docker.sock,destination=/tmp/docker.sock --publish 4111:8080 bmancini55/manager-swarm
```


Start service as a service
```
docker service create --name swarm_service1 --network swarm_my-network --publish 8080 bmancini55/service1-swarm
```

-------------

Using Docker Compose

This requires the Beta version of Docker 1.12 and Docker Compose 1.9.  This is required to use docker deploy.  The documentation is pretty unclear about this... but a few thread point it out:



-------------

By default, it will automatically assign ports.  If there are specific ports that you need to be published, you can use `docker service update`:

```
docker service update --publish-add=4111:8080 swarm_manager
```

Similarly, since volumes are not yet supported in DAB files, you can use `docker service update` to add mounts to the service:
```
docker service update --mount-add="type=bind,source=/var/run/docker.sock,destination=/tmp/docker.sock" swarm_manager
```

-------------


Limitations with Deploy/:

0. experimental mode, it's not fully baked yet...
1. fixed published ports, currently only support publishing to the 30000 range, have to manually perform a service update
2. mounts arent yet supported, have to manually perform a service mount
