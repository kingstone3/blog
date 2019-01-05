#!/bin/bash

PROXY_PATH=/etc/blog/
PROXY=blog

rm -rf ./browser/dist/

cd ./config/gulp
gulp build


cd ../../
mv ./browser/dist/ ./dist

cp -rf ./server/templates/ ./dist/templates/

./node_modules/.bin/broccoli build tmp-dist

rm -rf ./dist/
mv ./tmp-dist/ ./dist/

mkdir ./deploy/
mkdir ./deploy/browser/
mkdir ./deploy/server/

mv ./dist/ ./deploy/browser/dist
cp -rf ./server/ ./deploy/server/

rm -rf ./deploy/server/templates/
mv ./deploy/browser/dist/templates/ ./deploy/server/

cp ./package.json ./deploy/package.json
cd ./deploy/

echo "making tarball ..."
tar -czf blog.tgz ./server/ ./browser/dist/ ./package.json
echo "done"

echo "copy blog.tgz from localhost to server ..."
scp blog.tgz blog:$PROXY_PATH
echo "done"

cd ../

rm -rf ./deploy/

echo "deploy on server ..."
ssh blog sh $PROXY_PATH/../deploy.sh
echo "done"


# on server
# cd /etc/blog/
# yarn install --prod
# npm start
