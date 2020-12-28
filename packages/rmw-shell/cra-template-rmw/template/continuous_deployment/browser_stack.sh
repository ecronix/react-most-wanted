#!/bin/bash
set -ev
#run only on master
if [[ $TRAVIS_PULL_REQUEST == "false" ]] && [[ $TRAVIS_BRANCH == "master" ]]; then
  node ./continuous_deployment/bs.js $BSNAME $BSKEY
fi