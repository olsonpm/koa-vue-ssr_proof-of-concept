#! /usr/bin/env sh

command="${1}"

if [ "${command}" = "dev" ]; then
  npx webpack --config config/webpack/server.js --watch
else
  echo "command not found: ${command}"
fi
