job "service1" {
  datacenters = ["dc1"]
  type = "service"
  group "latest" {
    count = 1
    task "container" {
      driver = "docker"
      resources {
        cpu = 1000
        memory = 512
        network {
          mbits = 10
          port "http" {}
        }
      }
      config {
        image = "bmancini55/service1"
        port_map {
          http = 8080
        }
      }
      service {
        name = "service1"
        port = "http",
        check {
          type     = "http"
          port     = "http"
          path     = "/"
          interval = "10s"
          timeout  = "2s"
        }
      }
    }
  }
}
