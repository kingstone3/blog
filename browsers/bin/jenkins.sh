#!/bin/bash

npm install

cp ${config} servers/common/config.json

npm run gulp-build-browsers
npm run gulp-build-servers

npm run start-website-account
npm run start-website-admin
