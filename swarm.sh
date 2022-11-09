#!/bin/bash

# Constants
readonly ACTION=$1
readonly MODE=$2

CLUSTERED=${CLUSTERED:-"false"}

COMPOSE_FILE_PATH=$(
  cd "$(dirname "${BASH_SOURCE[0]}")" || exit
  pwd -P
)
readonly COMPOSE_FILE_PATH

# Import libraries
ROOT_PATH="${COMPOSE_FILE_PATH}/.."
. "${ROOT_PATH}/utils/config-utils.sh"
. "${ROOT_PATH}/utils/docker-utils.sh"
. "${ROOT_PATH}/utils/log.sh"

main() {
  if [[ "${CLUSTERED}" == "true" ]]; then
    log info "Running JeMPI Web package in Cluster node mode"
    local jempi_web_cluster_compose_param="-c ${COMPOSE_FILE_PATH}/docker-compose.cluster.yml"
  else
    log info "Running JeMPI Web package in Single node mode"
    local jempi_web_cluster_compose_param=""
  fi

  if [[ "${MODE}" == "dev" ]]; then
    log info "Running JeMPI Web package in DEV mode"
    local jempi_web_dev_compose_param="-c ${COMPOSE_FILE_PATH}/docker-compose.dev.yml"
  else
    log info "Running JeMPI Web package in PROD mode"
    local jempi_web_dev_compose_param=""
  fi

  if [[ "$ACTION" == "init" ]]; then
    log info "Deploying JeMPI Web..."
    try "docker stack deploy -c $COMPOSE_FILE_PATH/docker-compose.yml $jempi_web_dev_compose_param instant" "Failed to deploy jempi-web"
    overwrite "Deploying JeMPI Web... Done"
  elif [[ "$ACTION" == "up" ]]; then
    log info "Updating JeMPI Web..."
    try "docker service scale instant_jempi-web=1" "Failed to scale up jempi-web"
    overwrite "Starting JeMPI Web... Done"
  elif [[ "$ACTION" == "down" ]]; then
    log info "Scaling JeMPI Web down..."
    try "docker service scale instant_jempi-web=0" "Failed to scale down jempi-web"
    overwrite "Scaling JeMPI Web down... Done"
  elif [[ "$ACTION" == "destroy" ]]; then
    log info "Destroying JeMPI Web..."
    docker::service_destroy jempi-web
    overwrite "Destroying JeMPI Web... Done"
  else
    log error "Valid options are: init, up, down, or destroy"
  fi
}

main "$@"
