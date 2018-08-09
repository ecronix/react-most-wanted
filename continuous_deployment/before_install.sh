#!/bin/bash
set -ev
#run only on master
if [[ $TRAVIS_PULL_REQUEST == "false" ]] && [[ $TRAVIS_BRANCH == "master" ]]; then
   npm install -g firebase-tools
   npm install -g selenium-webdriver
   npm install codecov.io coveralls
   npm audit fix
   cd functions
   npm install
   npm audit fix
   cd ..
fi
