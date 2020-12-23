#!/bin/bash
set -ev
#run only on master
if [[ $TRAVIS_PULL_REQUEST == "false" ]] && [[ $TRAVIS_BRANCH == "master" ]]; then
  firebase use prod --token $FIREBASE_TOKEN
  cd functions
  firebase deploy --only functions --non-interactive --token $FIREBASE_TOKEN
  cd ..
fi