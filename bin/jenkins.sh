#!/bin/bash
export NODE_ENV=production

cp ${servers_config} servers/common/config.json
cp ${browsers_config} browsers/common/config.json

ln -sf /var/lib/jenkins/workspace/website/servers/common /var/lib/jenkins/workspace/website/servers/website-account/common
ln -sf /var/lib/jenkins/workspace/website/servers/common /var/lib/jenkins/workspace/website/servers/website-admin/common

cd browsers
npm install
npm rebuild node-sass
npm run build

cd ../servers
npm install
npm run start-account
npm run start-admin
