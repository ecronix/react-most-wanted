# Changelog

[npm history][1]

[1]: https://www.npmjs.com/package/gax-nodejs?activeTab=versions

### [1.14.2](https://www.github.com/googleapis/gax-nodejs/compare/v1.14.1...v1.14.2) (2020-02-27)


### Bug Fixes

* **deps:** update @grpc/grpc-js see: [#728](https://www.github.com/googleapis/gax-nodejs/issues/728) ([#730](https://www.github.com/googleapis/gax-nodejs/issues/730)) ([b08a316](https://www.github.com/googleapis/gax-nodejs/commit/b08a316ec74654c07907d2f350df152fcf612c4a))

### [1.14.1](https://www.github.com/googleapis/gax-nodejs/compare/v1.14.0...v1.14.1) (2020-01-28)


### Bug Fixes

* properly parse special field names in compileProtos ([#716](https://www.github.com/googleapis/gax-nodejs/issues/716)) ([e195df7](https://www.github.com/googleapis/gax-nodejs/commit/e195df7a89a5c1de72c41bf84f8c1bcf7a8f17c8))

## [1.14.0](https://www.github.com/googleapis/gax-nodejs/compare/v1.13.0...v1.14.0) (2020-01-27)


### Features

* allow strings for enums, bytes, and Long in .d.ts ([#714](https://www.github.com/googleapis/gax-nodejs/issues/714)) ([154d771](https://www.github.com/googleapis/gax-nodejs/commit/154d771c8dcd16572d3862127b1b7863f75eb39a))
* some basic samples, plus two new exports ([#702](https://www.github.com/googleapis/gax-nodejs/issues/702)) ([1204e2e](https://www.github.com/googleapis/gax-nodejs/commit/1204e2e28d6c24786c38deb57efd859536d168bc))


### Bug Fixes

* **deps:** use semver v6, mkdirp v0.5.1 to keep supporting node8 for a while ([#707](https://www.github.com/googleapis/gax-nodejs/issues/707)) ([d257dc9](https://www.github.com/googleapis/gax-nodejs/commit/d257dc98a66ec6fe3850a32efe04c3a0c5bb18a8))

## [1.13.0](https://www.github.com/googleapis/gax-nodejs/compare/v1.12.0...v1.13.0) (2020-01-02)


### Features

* export GRPC error code enum ([#693](https://www.github.com/googleapis/gax-nodejs/issues/693)) ([8215535](https://www.github.com/googleapis/gax-nodejs/commit/8215535faf0ed84889f0aac3b898646515a5aeb7))
* export ServiceConfig ([#695](https://www.github.com/googleapis/gax-nodejs/issues/695)) ([198101a](https://www.github.com/googleapis/gax-nodejs/commit/198101a292c829e31763aa566e9b351a1548d5ed))


### Bug Fixes

* fix possible invalid retry variables ([#682](https://www.github.com/googleapis/gax-nodejs/issues/682)) ([2cb343c](https://www.github.com/googleapis/gax-nodejs/commit/2cb343c99735059bc626231cd91b7d0cbb5c0042))
* **deps:** update dependency semver to v7 ([#683](https://www.github.com/googleapis/gax-nodejs/issues/683)) ([b28e6b1](https://www.github.com/googleapis/gax-nodejs/commit/b28e6b13337cd4033a52bba428e9f67bd64b8ff4))
* **types:** enable noImplicitAny in tsconfig ([#679](https://www.github.com/googleapis/gax-nodejs/issues/679)) ([6ecdeb7](https://www.github.com/googleapis/gax-nodejs/commit/6ecdeb77c399d04f27a9551933c3b12f5c0c003c))

## [1.12.0](https://www.github.com/googleapis/gax-nodejs/compare/v1.11.2...v1.12.0) (2019-12-09)


### Features

* export OperationsClient ([#677](https://www.github.com/googleapis/gax-nodejs/issues/677)) ([66425fa](https://www.github.com/googleapis/gax-nodejs/commit/66425fa4ff75ae142fd972de21b92a4e22c9a8d7))


### Bug Fixes

* servicePath and port may be undefined ([#668](https://www.github.com/googleapis/gax-nodejs/issues/668)) ([10eaaa6](https://www.github.com/googleapis/gax-nodejs/commit/10eaaa695fde3bd272dd9995c6c8c6287ad45929))
* **deps:** pin TypeScript below 3.7.0 ([70dd3b7](https://www.github.com/googleapis/gax-nodejs/commit/70dd3b7a876f50c3a7bf503ddc6190a5b82e5285))

### [1.11.2](https://www.github.com/googleapis/gax-nodejs/compare/v1.11.1...v1.11.2) (2019-11-22)


### Bug Fixes

* **deps:** unpin @grpc/grpc-js, set it to ^0.6.12 ([#665](https://www.github.com/googleapis/gax-nodejs/issues/665)) ([265461e](https://www.github.com/googleapis/gax-nodejs/commit/265461e7573c9bbd650eb0558313c05330691717))

* servicePath and port may be undefined ([#668](https://github.com/googleapis/gax-nodejs/pull/668))
([54fa7b9](https://www.github.com/googleapis/gax-nodejs/commit/54fa7b96915852255f511bddc575177c3cabb3ac))

### [1.11.1](https://www.github.com/googleapis/gax-nodejs/compare/v1.11.0...v1.11.1) (2019-11-15)


### Bug Fixes

* **deps:** use typescript ~3.6.0 ([#662](https://www.github.com/googleapis/gax-nodejs/issues/662)) ([2a4f255](https://www.github.com/googleapis/gax-nodejs/commit/2a4f255b0d0ea58488485465c48f248b153f1cf9))

## [1.11.0](https://www.github.com/googleapis/gax-nodejs/compare/v1.10.0...v1.11.0) (2019-11-14)


### Features

* export types for paginated calls ([#657](https://www.github.com/googleapis/gax-nodejs/issues/657)) ([b4007c7](https://www.github.com/googleapis/gax-nodejs/commit/b4007c70550517c90b43698674a57645c73111dc))


### Bug Fixes

* add license to protos/protos.js ([#655](https://www.github.com/googleapis/gax-nodejs/issues/655)) ([e7071d1](https://www.github.com/googleapis/gax-nodejs/commit/e7071d198618ebe278cddea0f8d3f02a806ba040))

## [1.10.0](https://www.github.com/googleapis/gax-nodejs/compare/v1.9.1...v1.10.0) (2019-11-12)


### Features

* export APICallback type ([#653](https://www.github.com/googleapis/gax-nodejs/issues/653)) ([e814cc1](https://www.github.com/googleapis/gax-nodejs/commit/e814cc194437ef2b283d24fffae99d33f7397547))


### Bug Fixes

* **docs:** add jsdoc-region-tag plugin ([#651](https://www.github.com/googleapis/gax-nodejs/issues/651)) ([6a6e7e6](https://www.github.com/googleapis/gax-nodejs/commit/6a6e7e654d57a96433165203d8bf92485eaa9872))

### [1.9.1](https://www.github.com/googleapis/gax-nodejs/compare/v1.9.0...v1.9.1) (2019-11-11)


### Bug Fixes

* add Apache license to the generated protos.d.ts file ([#649](https://www.github.com/googleapis/gax-nodejs/issues/649)) ([3ce2856](https://www.github.com/googleapis/gax-nodejs/commit/3ce2856346789ed333f667caaf0f4c73b36e8082))

## [1.9.0](https://www.github.com/googleapis/gax-nodejs/compare/v1.8.0...v1.9.0) (2019-11-09)


### Features

* move micro-gen common interface to gax ([#646](https://www.github.com/googleapis/gax-nodejs/issues/646)) ([b93f9c1](https://www.github.com/googleapis/gax-nodejs/commit/b93f9c106faecce337ef22c5864a9f2d45c80775))


### Bug Fixes

* add long to protos.d.ts ([#643](https://www.github.com/googleapis/gax-nodejs/issues/643)) ([e1012fa](https://www.github.com/googleapis/gax-nodejs/commit/e1012fa6ffaae35a9556b7e431cd504c1f96f8f5))
* depend on @types/long ([#645](https://www.github.com/googleapis/gax-nodejs/issues/645)) ([235744e](https://www.github.com/googleapis/gax-nodejs/commit/235744e126c3fa65f5e5b8e36d874d9142fcbfaa))

## [1.8.0](https://www.github.com/googleapis/gax-nodejs/compare/v1.7.5...v1.8.0) (2019-11-08)


### Features

* export GaxCall in apiTypes ([c451c32](https://www.github.com/googleapis/gax-nodejs/commit/c451c3234c53b1e4d362c5988c4b781e1013dc52))


### Bug Fixes

* correct array comparison ([#628](https://www.github.com/googleapis/gax-nodejs/issues/628)) ([c73e2fd](https://www.github.com/googleapis/gax-nodejs/commit/c73e2fd22427a7ce2fe16063251a1f1d84ec61f9))
* **deps:** bump google-gax to 1.7.5 ([#630](https://www.github.com/googleapis/gax-nodejs/issues/630)) ([7428a26](https://www.github.com/googleapis/gax-nodejs/commit/7428a26aad0512fff68213f7cdd20eca798266e7))

### [1.7.5](https://www.github.com/googleapis/gax-nodejs/compare/v1.7.4...v1.7.5) (2019-10-14)


### Bug Fixes

* **deps:** update @grpc/grpc-js to v0.6.9 ([#624](https://www.github.com/googleapis/gax-nodejs/issues/624)) ([138ba85](https://www.github.com/googleapis/gax-nodejs/commit/138ba85f8fe385ed52d2bb4cb66d80162b2ab630))

### [1.7.4](https://www.github.com/googleapis/gax-nodejs/compare/v1.7.3...v1.7.4) (2019-10-10)


### Bug Fixes

* **deps:** pin @grpc/grpc-js to v0.6.8 ([#621](https://www.github.com/googleapis/gax-nodejs/issues/621)) ([9ba872a](https://www.github.com/googleapis/gax-nodejs/commit/9ba872ad006b259ff799337ceb50fde73c756239))

### [1.7.3](https://www.github.com/googleapis/gax-nodejs/compare/v1.7.2...v1.7.3) (2019-10-10)


### Bug Fixes

* fix a type of AnyDecoder ([#619](https://www.github.com/googleapis/gax-nodejs/issues/619)) ([ed46692](https://www.github.com/googleapis/gax-nodejs/commit/ed46692))

### [1.7.2](https://www.github.com/googleapis/gax-nodejs/compare/v1.7.1...v1.7.2) (2019-10-09)


### Bug Fixes

* clientConfig can be omitted ([#617](https://www.github.com/googleapis/gax-nodejs/issues/617)) ([b4d7e8c](https://www.github.com/googleapis/gax-nodejs/commit/b4d7e8c))

### [1.7.1](https://www.github.com/googleapis/gax-nodejs/compare/v1.7.0...v1.7.1) (2019-10-09)


### Bug Fixes

* **deps:** update dependency @grpc/grpc-js to v0.6.7 ([#615](https://www.github.com/googleapis/gax-nodejs/issues/615)) ([7af35bc](https://www.github.com/googleapis/gax-nodejs/commit/7af35bc))

## [1.7.0](https://www.github.com/googleapis/gax-nodejs/compare/v1.6.4...v1.7.0) (2019-10-09)


### Features

* export CancellableStream ([#610](https://www.github.com/googleapis/gax-nodejs/issues/610)) ([847270b](https://www.github.com/googleapis/gax-nodejs/commit/847270b))

### [1.6.4](https://www.github.com/googleapis/gax-nodejs/compare/v1.6.3...v1.6.4) (2019-10-03)


### Bug Fixes

* **deps:** use @grpc/grpc-js v0.6.4 ([#605](https://www.github.com/googleapis/gax-nodejs/issues/605)) ([628db9e](https://www.github.com/googleapis/gax-nodejs/commit/628db9e))

### [1.6.3](https://www.github.com/googleapis/gax-nodejs/compare/v1.6.2...v1.6.3) (2019-10-02)


### Bug Fixes

* **deps:** update dependency @grpc/grpc-js to ^0.6.3 ([#594](https://www.github.com/googleapis/gax-nodejs/issues/594)) ([8c5c105](https://www.github.com/googleapis/gax-nodejs/commit/8c5c105))

### [1.6.2](https://www.github.com/googleapis/gax-nodejs/compare/v1.6.1...v1.6.2) (2019-09-27)


### Bug Fixes

* x-goog-api-client header for fallback ([#592](https://www.github.com/googleapis/gax-nodejs/issues/592)) ([4425a54](https://www.github.com/googleapis/gax-nodejs/commit/4425a54))

### [1.6.1](https://www.github.com/googleapis/gax-nodejs/compare/v1.6.0...v1.6.1) (2019-09-20)


### Bug Fixes

* make fallback version unique ([#590](https://www.github.com/googleapis/gax-nodejs/issues/590)) ([2586baa](https://www.github.com/googleapis/gax-nodejs/commit/2586baa))

## [1.6.0](https://www.github.com/googleapis/gax-nodejs/compare/v1.5.2...v1.6.0) (2019-09-19)


### Features

* make compileProtos generate TypeScript types ([#588](https://www.github.com/googleapis/gax-nodejs/issues/588)) ([1dd8b47](https://www.github.com/googleapis/gax-nodejs/commit/1dd8b47))

### [1.5.2](https://www.github.com/googleapis/gax-nodejs/compare/v1.5.1...v1.5.2) (2019-09-05)


### Bug Fixes

* properly handle gRPC-fallback errors ([#582](https://www.github.com/googleapis/gax-nodejs/issues/582)) ([76f1c5b](https://www.github.com/googleapis/gax-nodejs/commit/76f1c5b))

### [1.5.1](https://www.github.com/googleapis/gax-nodejs/compare/v1.5.0...v1.5.1) (2019-08-28)


### Bug Fixes

* export version from fallback ([#579](https://www.github.com/googleapis/gax-nodejs/issues/579)) ([ecc2516](https://www.github.com/googleapis/gax-nodejs/commit/ecc2516))

## [1.5.0](https://www.github.com/googleapis/gax-nodejs/compare/v1.4.0...v1.5.0) (2019-08-28)


### Features

* export call types ([#576](https://www.github.com/googleapis/gax-nodejs/issues/576)) ([74aa605](https://www.github.com/googleapis/gax-nodejs/commit/74aa605))

## [1.4.0](https://www.github.com/googleapis/gax-nodejs/compare/v1.3.0...v1.4.0) (2019-08-27)


### Features

* add AbortController for node-fetch ([#569](https://www.github.com/googleapis/gax-nodejs/issues/569)) ([92b7590](https://www.github.com/googleapis/gax-nodejs/commit/92b7590))
* support sending `x-goog-request-params` (and other extra) headers for fallback requests  ([#568](https://www.github.com/googleapis/gax-nodejs/issues/568)) ([a1e6570](https://www.github.com/googleapis/gax-nodejs/commit/a1e6570))
* use JSON proto for LRO client ([#574](https://www.github.com/googleapis/gax-nodejs/issues/574)) ([92a11c1](https://www.github.com/googleapis/gax-nodejs/commit/92a11c1))

## [1.3.0](https://www.github.com/googleapis/gax-nodejs/compare/v1.2.1...v1.3.0) (2019-08-01)


### Features

* making `google-gax` work in browser with `webpack` ([#554](https://www.github.com/googleapis/gax-nodejs/issues/554)) ([3690ab1](https://www.github.com/googleapis/gax-nodejs/commit/3690ab1))

### [1.2.1](https://www.github.com/googleapis/gax-nodejs/compare/v1.2.0...v1.2.1) (2019-07-31)


### Bug Fixes

* compileProtos should not fail if no protos are given ([#555](https://www.github.com/googleapis/gax-nodejs/issues/555)) ([4cf8efd](https://www.github.com/googleapis/gax-nodejs/commit/4cf8efd))

## [1.2.0](https://www.github.com/googleapis/gax-nodejs/compare/v1.1.5...v1.2.0) (2019-07-29)


### Bug Fixes

* **deps:** update dependency @grpc/grpc-js to ^0.5.0 ([#548](https://www.github.com/googleapis/gax-nodejs/issues/548)) ([a431c63](https://www.github.com/googleapis/gax-nodejs/commit/a431c63))
* **deps:** update dependency google-auth-library to v5 ([#552](https://www.github.com/googleapis/gax-nodejs/issues/552)) ([9c98083](https://www.github.com/googleapis/gax-nodejs/commit/9c98083))


### Features

* allow to pass just one file path to loadProto ([#543](https://www.github.com/googleapis/gax-nodejs/issues/543)) ([5429ad9](https://www.github.com/googleapis/gax-nodejs/commit/5429ad9))
* compileProtos bin script ([#547](https://www.github.com/googleapis/gax-nodejs/issues/547)) ([1334c6d](https://www.github.com/googleapis/gax-nodejs/commit/1334c6d))
* reexport protobufjs from gax ([#544](https://www.github.com/googleapis/gax-nodejs/issues/544)) ([b86a2c6](https://www.github.com/googleapis/gax-nodejs/commit/b86a2c6))

### [1.1.5](https://www.github.com/googleapis/gax-nodejs/compare/v1.1.4...v1.1.5) (2019-07-13)

### Dependency upgrade

* `@grpc/grpc-js` is upgraded to `^0.5.2` to fix the invalid metadata problem (fixing [this issue](https://github.com/googleapis/nodejs-datastore/issues/415) and several duplicates).

### [1.1.4](https://www.github.com/googleapis/gax-nodejs/compare/v1.1.3...v1.1.4) (2019-07-02)


### Bug Fixes

* copy values from LRO to Operation wrapper ([#529](https://www.github.com/googleapis/gax-nodejs/issues/529)) ([7dfe2cd](https://www.github.com/googleapis/gax-nodejs/commit/7dfe2cd))

### [1.1.3](https://www.github.com/googleapis/gax-nodejs/compare/v1.1.2...v1.1.3) (2019-06-26)


### Bug Fixes

* **docs:** make anchors work in jsdoc ([#523](https://www.github.com/googleapis/gax-nodejs/issues/523)) ([81bca11](https://www.github.com/googleapis/gax-nodejs/commit/81bca11))

### [1.1.2](https://www.github.com/googleapis/gax-nodejs/compare/v1.1.1...v1.1.2) (2019-06-20)


### Bug Fixes

* routing header parameters must be urlencoded ([#521](https://www.github.com/googleapis/gax-nodejs/issues/521)) ([4ade536](https://www.github.com/googleapis/gax-nodejs/commit/4ade536))

### [1.1.1](https://www.github.com/googleapis/gax-nodejs/compare/v1.1.0...v1.1.1) (2019-05-17)


### Bug Fixes

* use latest proto-loader with fixed types ([#508](https://www.github.com/googleapis/gax-nodejs/issues/508)) ([1afee35](https://www.github.com/googleapis/gax-nodejs/commit/1afee35))

## [1.1.0](https://www.github.com/googleapis/gax-nodejs/compare/v1.0.0...v1.1.0) (2019-05-16)


### Bug Fixes

* **deps:** update dependency walkdir to ^0.4.0 ([#499](https://www.github.com/googleapis/gax-nodejs/issues/499)) ([d2e01bd](https://www.github.com/googleapis/gax-nodejs/commit/d2e01bd))
* DEADLINE_EXCEEDED retry code is idempotent ([#495](https://www.github.com/googleapis/gax-nodejs/issues/495)) ([8c59bda](https://www.github.com/googleapis/gax-nodejs/commit/8c59bda))


### Features

* allow loading multiple proto files at once ([#503](https://www.github.com/googleapis/gax-nodejs/issues/503)) ([3d192a9](https://www.github.com/googleapis/gax-nodejs/commit/3d192a9))

## [1.0.0](https://www.github.com/googleapis/gax-nodejs/compare/v0.26.0...v1.0.0) (2019-05-09)


### Bug Fixes

* **deps:** update dependency @grpc/grpc-js to ^0.4.0 ([#487](https://www.github.com/googleapis/gax-nodejs/issues/487)) ([981b1ed](https://www.github.com/googleapis/gax-nodejs/commit/981b1ed))
* **deps:** update dependency google-auth-library to v4 ([#493](https://www.github.com/googleapis/gax-nodejs/issues/493)) ([03236f4](https://www.github.com/googleapis/gax-nodejs/commit/03236f4))


### Build System

* upgrade engines field to >=8.10.0 ([#483](https://www.github.com/googleapis/gax-nodejs/issues/483)) ([728678a](https://www.github.com/googleapis/gax-nodejs/commit/728678a))


### Features

* use @grpc/grpc-js instead of grpc ([#484](https://www.github.com/googleapis/gax-nodejs/issues/484)) ([b872f2b](https://www.github.com/googleapis/gax-nodejs/commit/b872f2b))


### BREAKING CHANGES

* use @grpc/grpc-js instead of grpc (#484)
* upgrade engines field to >=8.10.0 (#483)

## v0.26.0

04-30-2019 20:45 PDT

### Implementation Changes

- refactor: a huge refactor of call handling ([#467](https://github.com/googleapis/gax-nodejs/pull/467))
- feat: do not use legacy grpc loadObject ([#477](https://github.com/googleapis/gax-nodejs/pull/477))

### New Features

- feat: turned google-proto-files into a dev dependency ([#470](https://github.com/googleapis/gax-nodejs/pull/470))

### Dependencies

- chore(deps): unpin grpc ([#475](https://github.com/googleapis/gax-nodejs/pull/475))
- fix: pin grpc 1.20.0 ([#474](https://github.com/googleapis/gax-nodejs/pull/474))
- chore(deps): update dependency nyc to v14 ([#468](https://github.com/googleapis/gax-nodejs/pull/468))
- fix(deps): update dependency @grpc/proto-loader to ^0.5.0 ([#466](https://github.com/googleapis/gax-nodejs/pull/466))
- chore(deps): update dependency mocha to ~6.1.0 ([#464](https://github.com/googleapis/gax-nodejs/pull/464))
- chore(deps): update dependency typescript to ~3.4.0
- chore(deps): update dependency @types/semver to v6

### Internal / Testing Changes

- test: end-to-end system test ([#471](https://github.com/googleapis/gax-nodejs/pull/471))
- update to .nycrc with --all enabled ([#476](https://github.com/googleapis/gax-nodejs/pull/476))
- test: better return type for typescript 3.4.0 ([#463](https://github.com/googleapis/gax-nodejs/pull/463))

## v0.25.6

03-28-2019 21:27 PDT

### Fixes
- fix(deps): update dependency semver to v6
- fix: bundling is optional in MethodConfig ([#459](https://github.com/googleapis/gax-nodejs/pull/459))
- fix(ts): drop dependency on @types/duplexify ([#458](https://github.com/googleapis/gax-nodejs/pull/458))

### Internal / Testing Changes
- chore: publish to npm using wombat ([#453](https://github.com/googleapis/gax-nodejs/pull/453))
- build: use per-repo publish token ([#449](https://github.com/googleapis/gax-nodejs/pull/449))

## v0.25.5

03-15-2019 14:01 PDT

### Implementation Changes

- fix: includes @types/duplexify in package ([#441](https://github.com/googleapis/gax-nodejs/pull/441))

### Dependencies

- fix(deps): update dependency google-proto-files to ^0.19.0
- chore(deps): update dependency @types/source-map-support to ^0.5.0 ([#442](https://github.com/googleapis/gax-nodejs/pull/442))

### Internal / Testing Changes

- build: Add docuploader credentials to node publish jobs ([#444](https://github.com/googleapis/gax-nodejs/pull/444))
- build: use node10 to run samples-test, system-test etc ([#443](https://github.com/googleapis/gax-nodejs/pull/443))
- build: update kokoro config ([#440](https://github.com/googleapis/gax-nodejs/pull/440))
- test: longer timeout for Pub/Sub system tests ([#451](https://github.com/googleapis/gax-nodejs/pull/451))

## v0.25.4

02-28-2019 17:51 PST

### Implementation Changes

- fix: do not hang in LRO forever if API returned nothing ([#436](https://github.com/googleapis/gax-nodejs/pull/436))

## v0.25.3

02-26-2019 12:08 PST

### Implementation Changes

- fix: monitoring could be a common proto ([#434](https://github.com/googleapis/gax-nodejs/pull/434))
- refactor: cleanup unused files ([#422](https://github.com/googleapis/gax-nodejs/pull/422))
- chore(typescript): export common API call types ([#433](https://github.com/googleapis/gax-nodejs/pull/433))

### Dependencies

- chore(deps): update dependency mocha to v6 ([#430](https://github.com/googleapis/gax-nodejs/pull/430))

### Documentation

- docs: update links in contrib guide ([#429](https://github.com/googleapis/gax-nodejs/pull/429))

### Internal / Testing Changes

- build: use linkinator for docs test ([#428](https://github.com/googleapis/gax-nodejs/pull/428))

## v0.25.2

02-12-2019 01:16 PST

- fix: do not fail if bundledField is missing ([#424](https://github.com/googleapis/gax-nodejs/pull/424))
- fix: do not use console.warn or console.error ([#426](https://github.com/googleapis/gax-nodejs/pull/426))

### Implementation Changes

- refactor: snake case savagery is for pythonistas 🙅‍♂️🐍 ([#421](https://github.com/googleapis/gax-nodejs/pull/421))
- refactor: clean up operations client ([#420](https://github.com/googleapis/gax-nodejs/pull/420))

### Internal / Testing Changes

- test: do not use grpc-js in regular system test ([#425](https://github.com/googleapis/gax-nodejs/pull/425))
- build: create docs test npm scripts ([#423](https://github.com/googleapis/gax-nodejs/pull/423))

## v0.25.1

02-08-2019 18:01 PST

This is a patch release that fixes the code working with `grpc-js` ([#400](https://github.com/googleapis/gax-nodejs/pull/400)).
It's not supposed to be used in production (yet), so it's hidden behind a secret environment variable.
We'll let you know when it's ready to use!

### Dependencies

- fix(deps): update dependency walkdir to v0.3.2 ([#413](https://github.com/googleapis/gax-nodejs/pull/413))
- fix(deps): update dependency walkdir to v0.2.0 ([#410](https://github.com/googleapis/gax-nodejs/pull/410))
- fix(deps): update dependency walkdir to v0.1.0 ([#407](https://github.com/googleapis/gax-nodejs/pull/407))

### Documentation

- docs: update contributing guide ([#414](https://github.com/googleapis/gax-nodejs/pull/414))
- docs: add lint/fix example to contributing guide ([#409](https://github.com/googleapis/gax-nodejs/pull/409))
- docs: fix type for retryCodes ([#404](https://github.com/googleapis/gax-nodejs/pull/404))

### Internal / Testing Changes

- build: test using @grpc/grpc-js in CI ([#418](https://github.com/googleapis/gax-nodejs/pull/418))
- chore: don't run system tests with grpc-js ([#417](https://github.com/googleapis/gax-nodejs/pull/417))
- test: enable testing of grpc-js ([#400](https://github.com/googleapis/gax-nodejs/pull/400))

## v0.25.0

01-28-2019 23:31 PST

### New Features

- Add grpc-gcp support in gax ([#396](https://github.com/googleapis/gax-nodejs/pull/396))

### Dependencies

- chore(deps): update dependency eslint-config-prettier to v4 ([#399](https://github.com/googleapis/gax-nodejs/pull/399))

## v0.24.0

01-24-2019 08:49 PST

### Dependencies
- fix(deps): update dependency @grpc/proto-loader to ^0.4.0 ([#395](https://github.com/googleapis/gax-nodejs/pull/395))
- fix(deps): update dependency google-auth-library to v3 ([#394](https://github.com/googleapis/gax-nodejs/pull/394))

## v0.23.0

01-11-2019 13:32 PST


### Implementation Changes
- fix: include status code on errors ([#390](https://github.com/googleapis/gax-nodejs/pull/390))
- fix: Change to "greater than" for limit on number of elements ([#386](https://github.com/googleapis/gax-nodejs/pull/386))
- fix(ts): export CallSettings and RetryOptions ([#360](https://github.com/googleapis/gax-nodejs/pull/360))

### Dependencies
- chore(deps): update dependency @types/sinon to v7 ([#385](https://github.com/googleapis/gax-nodejs/pull/385))
- chore(deps): update dependency typescript to ~3.2.0 ([#364](https://github.com/googleapis/gax-nodejs/pull/364))
- chore(deps): update dependency gts to ^0.9.0 ([#355](https://github.com/googleapis/gax-nodejs/pull/355))

### Documentation
- build: check broken links in generated docs ([#387](https://github.com/googleapis/gax-nodejs/pull/387))

### Internal / Testing Changes
- chore(build): inject yoshi automation key ([#384](https://github.com/googleapis/gax-nodejs/pull/384))
- chore: update nyc and eslint configs ([#383](https://github.com/googleapis/gax-nodejs/pull/383))
- chore: npm-install-retry is not a thing anymore ([#381](https://github.com/googleapis/gax-nodejs/pull/381))
- chore: fix publish.sh permission +x ([#380](https://github.com/googleapis/gax-nodejs/pull/380))
- fix(build): fix Kokoro release script ([#379](https://github.com/googleapis/gax-nodejs/pull/379))
- build: add Kokoro configs for autorelease ([#378](https://github.com/googleapis/gax-nodejs/pull/378))
- chore: always nyc report before calling codecov ([#375](https://github.com/googleapis/gax-nodejs/pull/375))
- chore: nyc ignore build/test by default ([#374](https://github.com/googleapis/gax-nodejs/pull/374))
- chore: update synth metadata ([#372](https://github.com/googleapis/gax-nodejs/pull/372))
- chore: fix openssl decrypt ([#367](https://github.com/googleapis/gax-nodejs/pull/367))
- test: enable pub/sub system tests ([#366](https://github.com/googleapis/gax-nodejs/pull/366))
- chore: don't say operations_client.ts is autogen'd ([#361](https://github.com/googleapis/gax-nodejs/pull/361))
- test: don't run Pub/Sub system tests ([#362](https://github.com/googleapis/gax-nodejs/pull/362))
- chore: include format and lint tools for samples ([#359](https://github.com/googleapis/gax-nodejs/pull/359))
- chore: add a synth.metadata

## v0.22.1

11-12-2018 16:56 PST


### Dependencies
- Update grpc dependency ([#353](https://github.com/googleapis/gax-nodejs/pull/353))

### Internal / Testing Changes
- Update eslintignore config ([#352](https://github.com/googleapis/gax-nodejs/pull/352))

## v0.22.0

11-12-2018 15:05 PST

### New Features
- feat: to support GRPC-GCP Extension, include additional options in grpcOptions ([#328](https://github.com/googleapis/gax-nodejs/pull/328))

## v0.21.0

### 11-10-2018 11:27 PST
This is a minor service release that largely contains updates to other modules.  The upgrade to `google-proto-files` and `walkdir` in particular should improve load time of the module by at least ~100ms.

### Dependencies
- fix(deps): update dependency google-proto-files to ^0.18.0 ([#348](https://github.com/googleapis/gax-nodejs/pull/348))
- fix: use `walkdir` instead of `globby` ([#346](https://github.com/googleapis/gax-nodejs/pull/346))
- chore(deps): update dependency through2 to v3 ([#343](https://github.com/googleapis/gax-nodejs/pull/343))
- chore: update grpc to ^1.15.1 ([#316](https://github.com/googleapis/gax-nodejs/pull/316))
- fix(deps): update dependency @grpc/grpc-js to ^0.3.0 ([#308](https://github.com/googleapis/gax-nodejs/pull/308))

### Internal / Testing Changes
- fix: improve types, remove dead code ([#340](https://github.com/googleapis/gax-nodejs/pull/340))
- refactor: enable noImplicitThis in the tsconfig ([#347](https://github.com/googleapis/gax-nodejs/pull/347))
- refactor: drop extend and lodash.flatten ([#345](https://github.com/googleapis/gax-nodejs/pull/345))
- chore: remove temporary folder ([#339](https://github.com/googleapis/gax-nodejs/pull/339))
- chore: use latest npm on Windows ([#344](https://github.com/googleapis/gax-nodejs/pull/344))
- refactor: clean up lodash and use strict ([#342](https://github.com/googleapis/gax-nodejs/pull/342))
- chore: include build in eslintignore ([#337](https://github.com/googleapis/gax-nodejs/pull/337))
- chore: system tests for gax ([#334](https://github.com/googleapis/gax-nodejs/pull/334))
- chore: update issue templates ([#333](https://github.com/googleapis/gax-nodejs/pull/333))
- Update issue templates
- chore: remove old issue template ([#329](https://github.com/googleapis/gax-nodejs/pull/329))
- build: run tests on node11 ([#327](https://github.com/googleapis/gax-nodejs/pull/327))
- fix: better types for GAPIC clients ([#326](https://github.com/googleapis/gax-nodejs/pull/326))
- chores(build): do not collect sponge.xml from windows builds ([#325](https://github.com/googleapis/gax-nodejs/pull/325))
- chores(build): run codecov on continuous builds ([#324](https://github.com/googleapis/gax-nodejs/pull/324))
- chore: update new issue template ([#323](https://github.com/googleapis/gax-nodejs/pull/323))
- build: fix codecov uploading on Kokoro ([#320](https://github.com/googleapis/gax-nodejs/pull/320))
- fix(deps): update dependency google-proto-files to ^0.17.0 ([#317](https://github.com/googleapis/gax-nodejs/pull/317))
- chore(deps): update dependency sinon to v7 ([#319](https://github.com/googleapis/gax-nodejs/pull/319))
- Update kokoro config ([#315](https://github.com/googleapis/gax-nodejs/pull/315))
- chore(deps): update dependency typescript to ~3.1.0 ([#313](https://github.com/googleapis/gax-nodejs/pull/313))
- Update CI config ([#312](https://github.com/googleapis/gax-nodejs/pull/312))
- build: prevent system/sample-test from leaking credentials
- Update the kokoro config ([#309](https://github.com/googleapis/gax-nodejs/pull/309))
- test: remove appveyor config ([#307](https://github.com/googleapis/gax-nodejs/pull/307))
- Update CI config ([#306](https://github.com/googleapis/gax-nodejs/pull/306))
- Enable prefer-const in the eslint config ([#304](https://github.com/googleapis/gax-nodejs/pull/304))
- Enable no-var in eslint ([#303](https://github.com/googleapis/gax-nodejs/pull/303))

## v0.18.0

### Implementation Changes
BREAKING CHANGE:
- fix: drop support for node.js 4.x and 9.x (#262)

### New Features

### Dependencies
- refactor: add dependency on @grpc/proto-loader (#229)
- chore(deps): update dependency typescript to v3 (#275)
- fix(deps): update dependency @grpc/proto-loader to ^0.3.0 (#269)
- chore(deps): update dependency gts to ^0.8.0 (#266)
- chore(package): Update gts to the latest version 🚀 (#255)
- chore(package): update @types/globby to version 8.0.0 (#257)

### Documentation
- Add Code of Conduct

### Internal / Testing Changes
- chore: move mocha options to mocha.opts (#274)
- test: fixing timeouts (#264)
- Configure Renovate (#258)
- fix: fix typo in a test (#260)
- fix: update linking for samples (#259)
- refactor: remove prettier, eslint, jshint (#254)
