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

docker-compose -f 0-docker-compose.yml -f docker-compose.dev.yml up -d

rm -f 0-docker-compose.yml
