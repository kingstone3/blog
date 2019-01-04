#!/bin/sh

CONSOLE_PATH=/Users/wanglei/Documents/private-projects/blog
PROXY_PATH=/etc/blog
PROXY=blog

function deploy() {
  cd $CONSOLE_PATH

  rm -rf browser/dist/

  echo "build..."
  npm run build-prod

  echo "making tarball ..."
  tar -czf blog.tgz server/ browser/dist/ package.json
  echo "done"

  echo "copy blog.tgz from localhost to server ..."
  scp blog.tgz blog:$PROXY_PATH
  echo "done"

  echo "deploy on server ..."
  ssh blog sh $PROXY_PATH/../deploy.sh
  echo "done"

  echo "clelar tarbarll ..."
  rm -f blog.tgz
  echo "done"
}

deploy

exit 0

# on server
# cd /etc
# sh deploy.sh
# cd blog/
# yarn install --prod
# npm start
