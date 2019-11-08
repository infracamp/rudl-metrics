#!/usr/bin/env bash

echo "deb https://repos.influxdata.com/ubuntu bionic stable" | sudo tee /etc/apt/sources.list.d/influxdb.list
sudo curl -sL https://repos.influxdata.com/influxdb.key | sudo apt-key add -

sudo apt-get update
sudo apt-get install -y influxdb

cp /opt/scripts/influxdb.conf /etc/influxdb/influxdb.conf
