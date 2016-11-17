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
docker network create --driver overlay my-network
```


Start the gateway as a service
```
docker service create --name gateway --network my-network --publish 8080 gateway-swarm
```


Start service as a service
```
docker service create --name service1 --network my-network --publish 8080 service1-swarm
```

-------------

Using Docker Compose

This requires the Beta version of Docker 1.12 and Docker Compose 1.9.  This is required to use docker deploy.  The documentation is pretty unclear about this... but a few thread point it out:




-------------


Unknowns:

- how to connect "dev" service to swarm... the service internally uses DNS and fixed ports. This won't work in a dev environment that sits outside of the swarm

- how to define "service definition" to be launched by manager???  do we have access to docker inside a container?  I assume there is, we may want to look at registrator, since it actually has a hook into the docker pipeline for that
