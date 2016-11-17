Architecture:
  -> services created as name:version with auto-assigned published port
  -> permanent services can use well known published ports (such as elasticsearch)
  -> docker service runs on known discovery port (could just actually expose docker API)

  -> client knows name:version it want
  -> client checks for cached published port
  -> client makes request to docker for published port on known discovery port
  -> client retrieves published port and makes connection on that port  
