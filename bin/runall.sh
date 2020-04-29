#!/bin/bash

php -f /opt/bin/run_aggregate.php &
php -f /opt/bin/run_notify.php &
php -f /opt/bin/udp-syslog-server.php
