#!/bin/bash

cp ${servers_config} servers/common/config.json
cp ${browsers_config} browsers/common/config.json

cd browsers
npm install
npm run build

cd ../servers
npm install
npm run start-account
npm run start-admin
