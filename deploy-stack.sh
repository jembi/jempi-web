#!/bin/bash

config="${1}"

set -e
set -u

set -a

case ${config} in 
    dev) 
      source .env.dev 
      ;;
    *)
      source .env.local
      ;;
esac

set +a

envsubst < ./docker-compose.yml > 0-docker-compose.yml

docker stack deploy -c 0-docker-compose.yml -c docker-compose.dev.yml jempi

rm -f 0-docker-compose.yml
