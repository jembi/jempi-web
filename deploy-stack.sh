#!/bin/bash

set -e
set -u

set -a
source .env.local
set +a

envsubst < ./docker-compose.yml > 0-docker-compose.yml

docker stack deploy -c docker-compose.yml -c docker-compose.dev.yml jempi

rm -f 0-docker-compose.yml
