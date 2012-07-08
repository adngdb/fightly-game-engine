#!/bin/sh

export NODE_ENV=testing
cp ./tests/config/default.json ./config/testing.json
./node_modules/nodeunit/bin/nodeunit tests tests/core tests/network
rm ./config/testing.json
