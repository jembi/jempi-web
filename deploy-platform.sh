#!/bin/bash

./platform-linux "$1" -c="../jempi-web" --dev --env-file="./.env.local" jempi-web
