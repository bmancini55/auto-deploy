
This exercise was birthed trying to find a _simpler_ way to deploy NextGen architecture in development. An interetsing byproduct was that NextGen is more than just services, it is also the infrastructure (KV stores, service discovery, databases, tooling) that go into making our microservices run.


Initial Goals:

  1. Automate infrastructure for single instance deployment
  2. On-demand deployment of microservices, more on this below.
  3. Support declarative service definitions

Motivations:

  1. It's cubersome to spin up NextGen infrastructure. Intimate knowledge of docker/linux networking is required to get an environment working. How do we make microservice development easier?  

  2. Our first pass had us deploying containers manually with `nomad run`.  This is not production worthy. How can we automate service deployment?  How do we manage the service definitions?

  3. How do we run services on demand? If there are no indexing jobs, why should there be indexing services running?  What about in development?  Why would we want to run 500 microservices in development when we're only working with a handful?  

  

