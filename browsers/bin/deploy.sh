#!/bin/bash

rm -rf browsers/dist

npm run gulp-build

./node_modules/.bin/broccoli build tmp-dist

rm -rf browsers/dist
mv tmp-dist browsers/dist
