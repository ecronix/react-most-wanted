#!/bin/bash

#run only on master
if [[ $TRAVIS_PULL_REQUEST == "false" ]] && [[ $TRAVIS_BRANCH == "master" ]]; then
  node bs.js $BSNAME $BSKEY
  npm run build
fi
