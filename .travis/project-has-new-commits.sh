#!/bin/bash

if [[ -z $1 ]]; then
  echo "No commit range supplied, stopping build"
  exit 1
fi

if [[ -z $2 ]]; then
  echo "No project directory supplied, stopping build"
  exit 1
fi

if [[ ! -d $2 ]]; then
  echo "Project directory does not exist, stopping build"
  exit 1
fi

git diff --name-only $1 | grep $2