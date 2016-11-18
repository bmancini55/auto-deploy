#!/bin/bash

# obtain the host adapter
# host=$(ip -4 addr | grep 'BROADCAST' -A2 | head -n2 | tail -n1 | awk '{ print $2 }' | cut -f1 -d'/')
host=$(ifconfig | grep -E "inet .*(broadcast|Bcast)" | awk '{print $2}' | cut -f2 -d':')
echo "Exteneral IP: $host"

# obtain the ethernet adapater
# host=$(ip -4 addr | grep -E "BROADCAST" | awk '{print $2}' | cut -f1 -d':')
adapter=$(ifconfig | grep -E "(BROADCAST|Ethernet)" | head -n1 | awk '{print $1}' | cut -f1 -d':')
echo "Binding to adapter: $adapter"

# start consul
echo "Starting consul"
docker run -d \
-p 8300:8300 \
-p 8301:8301 \
-p 8301:8301/udp \
-p 8302:8302 \
-p 8302:8302/udp \
-p 8400:8400 \
-p 8500:8500 \
-p 53:8600 \
-p 53:8600/udp \
consul agent -server -ui -client=0.0.0.0 -advertise=$host -bootstrap-expect=1

# create temp conf with host
echo "Creating nomad config with host"
sed "s/\$host/$host/; s/\$adapter/$adapter/" ./nomad-dev.conf > nomad-dev.conf.temp

# start nomad
echo "Starting nomad"
sudo nomad agent -dev -config nomad-dev.conf.temp

# remove consul
echo "Stopping consul"
docker rm -f $(docker ps | grep consul | awk '{print $1}')

# remove temp
echo "Removing nomad config"
rm ./nomad-dev.conf.temp