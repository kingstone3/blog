#!/bin/bash

cd browsers

rm -rf ./dist

gulp build

../node_modules/.bin/broccoli build tmp-dist

rm -rf ./dist
mv tmp-dist ./dist
