#!/bin/bash
set -ev
#run only on master
if [[ $TRAVIS_PULL_REQUEST == "false" ]] && [[ $TRAVIS_BRANCH == "master" ]] ; 
then
   ls -l
   npm install -g firebase-tools
   npm install selenium-webdriver
   npm install
   cd functions
   npm install
   cd ..
fi
exit 0