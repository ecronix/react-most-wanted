#!/bin/bash

# Copyright 2018 Google Inc.
#
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
#   http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.

set -euo pipefail
IFS=$'\n\t'

# Variables
PROTOS_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
WORK_DIR=`mktemp -d`

# deletes the temp directory on exit
function cleanup {
  rm -rf "$WORK_DIR"
  echo "Deleted temp working directory $WORK_DIR"
}

# register the cleanup function to be called on the EXIT signal
trap cleanup EXIT

# Capture location of pbjs / pbts before we pushd.
PBJS="$(npm bin)/pbjs"
PBTS="$(npm bin)/pbts"

# Enter work dir
pushd "$WORK_DIR"

# Clone necessary git repos.
git clone https://github.com/googleapis/googleapis.git
git clone https://github.com/google/protobuf.git

# Copy necessary protos.
mkdir -p "${PROTOS_DIR}/google/api"
cp googleapis/google/api/{annotations,client,field_behavior,http,resource}.proto \
   "${PROTOS_DIR}/google/api/"

mkdir -p "${PROTOS_DIR}/google/firestore/v1"
cp googleapis/google/firestore/v1/*.proto \
   "${PROTOS_DIR}/google/firestore/v1/"

mkdir -p "${PROTOS_DIR}/google/firestore/v1beta1"
cp googleapis/google/firestore/v1beta1/*.proto \
   "${PROTOS_DIR}/google/firestore/v1beta1/"

mkdir -p "${PROTOS_DIR}/google/firestore/admin/v1"
cp googleapis/google/firestore/admin/v1/*.proto \
   "${PROTOS_DIR}/google/firestore/admin/v1/"

mkdir -p "${PROTOS_DIR}/google/longrunning"
cp googleapis/google/longrunning/operations.proto \
   "${PROTOS_DIR}/google/longrunning/"

mkdir -p "${PROTOS_DIR}/google/rpc"
cp googleapis/google/rpc/status.proto \
   "${PROTOS_DIR}/google/rpc/"

mkdir -p "${PROTOS_DIR}/google/type"
cp googleapis/google/type/latlng.proto \
   "${PROTOS_DIR}/google/type/"

mkdir -p "${PROTOS_DIR}/google/protobuf"
cp protobuf/src/google/protobuf/{any,empty,field_mask,struct,timestamp,wrappers}.proto \
   "${PROTOS_DIR}/google/protobuf/"

# Generate the Protobuf typings
PBJS_ARGS=( --proto_path=. \
  --js_out=import_style=commonjs,binary:library \
  --target=static \
  --no-create \
  --no-encode \
  --no-decode \
  --no-verify \
  --no-convert \
  --no-delimited \
  --force-enum-string \
  --force-number)
      
"${PBJS}" "${PBJS_ARGS[@]}" -o firestore_v1_proto_api.js \
  "${PROTOS_DIR}/google/firestore/v1/*.proto" \
  "${PROTOS_DIR}/google/protobuf/*.proto" "${PROTOS_DIR}/google/type/*.proto" \
  "${PROTOS_DIR}/google/rpc/*.proto" "${PROTOS_DIR}/google/api/*.proto" \
  "${PROTOS_DIR}/google/longrunning/*.proto"
"${PBTS}" -o firestore_v1_proto_api.d.ts firestore_v1_proto_api.js

"${PBJS}" "${PBJS_ARGS[@]}" -o firestore_admin_v1_proto_api.js \
  "${PROTOS_DIR}/google/firestore/admin/v1/*.proto" \
  "${PROTOS_DIR}/google/protobuf/*.proto" "${PROTOS_DIR}/google/type/*.proto" \
  "${PROTOS_DIR}/google/rpc/*.proto" "${PROTOS_DIR}/google/api/*.proto" \
  "${PROTOS_DIR}/google/longrunning/*.proto"
"${PBTS}" -o firestore_admin_v1_proto_api.d.ts firestore_admin_v1_proto_api.js

"${PBJS}" "${PBJS_ARGS[@]}" -o firestore_v1beta1_proto_api.js \
  "${PROTOS_DIR}/google/firestore/v1beta1/*.proto" \
  "${PROTOS_DIR}/google/protobuf/*.proto" "${PROTOS_DIR}/google/type/*.proto" \
  "${PROTOS_DIR}/google/rpc/*.proto" "${PROTOS_DIR}/google/api/*.proto" \
  "${PROTOS_DIR}/google/longrunning/*.proto"
"${PBTS}" -o firestore_v1beta1_proto_api.d.ts firestore_v1beta1_proto_api.js

node  "${PROTOS_DIR}"/../../scripts/license.js *.d.ts *.js

# Copy typings into source repo
cp {firestore_v1_proto_api.d.ts,firestore_v1_proto_api.js} ${PROTOS_DIR}
cp {firestore_admin_v1_proto_api.d.ts,firestore_admin_v1_proto_api.js} ${PROTOS_DIR}
cp {firestore_v1beta1_proto_api.d.ts,firestore_v1beta1_proto_api.js} ${PROTOS_DIR}

popd
