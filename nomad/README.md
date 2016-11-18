# Demo setup

1) execute docker-compose script

  ```
  HOST_IP=<ip of machine> docker-compose up
  ```

2) start the manager service


  We'll run it outside of docker-compose because it needs access to nomad.  A custom container could be used that includes the nomad binary.

  ```
  cd manager
  npm run start
  ```

3) start nomad 5.x

  ```
  sudo nomad agent -dev -config nomad.conf
  ```

4) connect to gateway with dependent service

  ```
  http://localhost:8080/service=service1
  ```

