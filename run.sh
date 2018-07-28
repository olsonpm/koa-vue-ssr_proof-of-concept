#! /usr/bin/env sh

command="${1}"

if [ "${command}" = "dev" ]; then
  node ./node_modules/.bin/webpack --config config/webpack/server.js --watch
else
  echo "command not found: ${command}"
fi
