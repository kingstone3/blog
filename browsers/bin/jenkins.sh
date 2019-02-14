#!/bin/bash

npm install

npm run gulp-build-browsers
npm run gulp-build-servers

npm run start-website-account
npm run start-website-admin
