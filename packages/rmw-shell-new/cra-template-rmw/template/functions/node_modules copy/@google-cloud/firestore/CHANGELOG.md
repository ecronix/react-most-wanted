# Changelog

[npm history][1]

[1]: https://www.npmjs.com/package/@google-cloud/firestore?activeTab=versions

## [3.8.0](https://www.github.com/googleapis/nodejs-firestore/compare/v3.7.5...v3.8.0) (2020-05-13)


### Features

* add ignoreUndefinedProperties option ([#1062](https://www.github.com/googleapis/nodejs-firestore/issues/1062)) ([de733c8](https://www.github.com/googleapis/nodejs-firestore/commit/de733c821152a32893e7fccf30cdf96a2f8050eb))


### Bug Fixes

* prepare sources for BulkWriter ([#1051](https://www.github.com/googleapis/nodejs-firestore/issues/1051)) ([8c52d47](https://www.github.com/googleapis/nodejs-firestore/commit/8c52d475ae486e2998220947a0b0441d4a95ab49))
* allow running source with ts-node ([#1074](https://www.github.com/googleapis/nodejs-firestore/issues/1074)) ([f66a089](https://www.github.com/googleapis/nodejs-firestore/commit/f66a08978f11915d8662f964867a966ff75f6e96))
* remove type dependency on Moment ([#1063](https://www.github.com/googleapis/nodejs-firestore/issues/1063)) ([30008b0](https://www.github.com/googleapis/nodejs-firestore/commit/30008b093a9872e34a83209e94de3dca09e89fe7))

### [3.7.5](https://www.github.com/googleapis/nodejs-firestore/compare/v3.7.4...v3.7.5) (2020-04-25)


### Bug Fixes

* return errors from Query.stream() ([#1046](https://www.github.com/googleapis/nodejs-firestore/issues/1046)) ([4b65fca](https://www.github.com/googleapis/nodejs-firestore/commit/4b65fca3d7aa9618ff944c02f059d08f39b4cac3))

### [3.7.4](https://www.github.com/googleapis/nodejs-firestore/compare/v3.7.3...v3.7.4) (2020-04-09)


### Bug Fixes

* validate nested arrays in FieldValue ([#1003](https://www.github.com/googleapis/nodejs-firestore/issues/1003)) ([3497691](https://www.github.com/googleapis/nodejs-firestore/commit/3497691754d8b3b0b17385c34362f74ab8a84feb))

### [3.7.3](https://www.github.com/googleapis/nodejs-firestore/compare/v3.7.2...v3.7.3) (2020-03-31)


### Bug Fixes

* support array of references for IN queries ([#993](https://www.github.com/googleapis/nodejs-firestore/issues/993)) ([a6d8fe0](https://www.github.com/googleapis/nodejs-firestore/commit/a6d8fe061fcfe0fde7a4fa023b2ec454e2adb432))

### [3.7.2](https://www.github.com/googleapis/nodejs-firestore/compare/v3.7.1...v3.7.2) (2020-03-25)


### Bug Fixes

* fix flaky contention test ([#979](https://www.github.com/googleapis/nodejs-firestore/issues/979)) ([f294998](https://www.github.com/googleapis/nodejs-firestore/commit/f294998daab77a0a51c81265945e28eec34db186))
* fix: use Random Number from `crypto` to generate AutoId ([05b3363](https://www.github.com/googleapis/nodejs-firestore/commit/ce6ea390f2fffcbe796ba1c5b040ee02452e287a))

### [3.7.1](https://www.github.com/googleapis/nodejs-firestore/compare/v3.7.0...v3.7.1) (2020-03-16)


### Bug Fixes

* support Query.stream() as first client operation ([#971](https://www.github.com/googleapis/nodejs-firestore/issues/971)) ([a48017c](https://www.github.com/googleapis/nodejs-firestore/commit/a48017c16dbf7819ea45ea2577365b52721c2475))

## [3.7.0](https://www.github.com/googleapis/nodejs-firestore/compare/v3.6.0...v3.7.0) (2020-03-11)


### Features

* **deps:** update to TypeScript 3.8 ([#962](https://www.github.com/googleapis/nodejs-firestore/issues/962)) ([12982cd](https://www.github.com/googleapis/nodejs-firestore/commit/12982cd9ef6b418b6bc9fa303bb804255b9c906a))
* add support for Query.limitToLast() ([#954](https://www.github.com/googleapis/nodejs-firestore/issues/954)) ([c89546f](https://www.github.com/googleapis/nodejs-firestore/commit/c89546f5ae83da3845076aeeffcda75f9b208f5c))

## [3.6.0](https://www.github.com/googleapis/nodejs-firestore/compare/v3.5.1...v3.6.0) (2020-03-09)


### Features

* base transaction retries on error codes ([#953](https://www.github.com/googleapis/nodejs-firestore/issues/953)) ([4a30820](https://www.github.com/googleapis/nodejs-firestore/commit/4a30820876db2ec925efd0ac04482fe9c6882813))
* deferred client initialization ([#956](https://www.github.com/googleapis/nodejs-firestore/issues/956)) ([301a7e2](https://www.github.com/googleapis/nodejs-firestore/commit/301a7e2870529fc8b14c91ac08c942dececcc3d6))
* implement Timestamp.valueOf() ([#947](https://www.github.com/googleapis/nodejs-firestore/issues/947)) ([24a96c6](https://www.github.com/googleapis/nodejs-firestore/commit/24a96c65ecbc4df0fc69b9a7f64e9e508fea89b9)), closes [#944](https://www.github.com/googleapis/nodejs-firestore/issues/944)

### [3.5.1](https://www.github.com/googleapis/nodejs-firestore/compare/v3.5.0...v3.5.1) (2020-02-19)


### Bug Fixes

* collectionReference.add() validation ([#925](https://www.github.com/googleapis/nodejs-firestore/issues/925)) ([19c2c75](https://www.github.com/googleapis/nodejs-firestore/commit/19c2c75d86c3aab967d21da16598016185ae360b))
* pass x-goog-request-params header for streaming calls ([#920](https://www.github.com/googleapis/nodejs-firestore/issues/920)) ([cfbe19e](https://www.github.com/googleapis/nodejs-firestore/commit/cfbe19ed4c3cc6bb9ffc7b352de901150b8b9dea))
* propagate converter in QueryOptions.with() ([#931](https://www.github.com/googleapis/nodejs-firestore/issues/931)) ([e35a098](https://www.github.com/googleapis/nodejs-firestore/commit/e35a098621b872b85a3ab70c6592eba75a929de8))
* wait for operations to complete before deleting clients ([#915](https://www.github.com/googleapis/nodejs-firestore/issues/915)) ([1e5d63f](https://www.github.com/googleapis/nodejs-firestore/commit/1e5d63fbc39d9c3e6883e79a55e8a26634cd30c5))

## [3.5.0](https://www.github.com/googleapis/nodejs-firestore/compare/v3.4.1...v3.5.0) (2020-02-07)


### Features

* add google-gax status to exports ([#912](https://www.github.com/googleapis/nodejs-firestore/issues/912)) ([7d97384](https://www.github.com/googleapis/nodejs-firestore/commit/7d9738456525b99507b8819d86a8634b0a1d04c3))


### Bug Fixes

* add missing generics on query ([#917](https://www.github.com/googleapis/nodejs-firestore/issues/917)) ([c5b9442](https://www.github.com/googleapis/nodejs-firestore/commit/c5b9442e6620e59e5563ffaf210ad493ec5ed9b2))
* better parameter naming in path template helpers ([aac02f4](https://www.github.com/googleapis/nodejs-firestore/commit/aac02f463ba13c385a6dc5a4d96e281e0801cc93))
* retry streaming methods if initial write errored ([#897](https://www.github.com/googleapis/nodejs-firestore/issues/897)) ([2ec0489](https://www.github.com/googleapis/nodejs-firestore/commit/2ec0489127faea88dca95e6dc169efe6e55d330d))

### [3.4.1](https://www.github.com/googleapis/nodejs-firestore/compare/v3.4.0...v3.4.1) (2020-01-22)


### Bug Fixes

* do not assume all custom objects have constructors ([#893](https://www.github.com/googleapis/nodejs-firestore/issues/893)) ([f668e8e](https://www.github.com/googleapis/nodejs-firestore/commit/f668e8e4880256223c41c2c3183434e81c7f7945))

## [3.4.0](https://www.github.com/googleapis/nodejs-firestore/compare/v3.3.4...v3.4.0) (2020-01-15)


### Features

* support serialization of custom objects ([#828](https://www.github.com/googleapis/nodejs-firestore/issues/828)) ([94ddc89](https://www.github.com/googleapis/nodejs-firestore/commit/94ddc897400cafe5a1ee16f3ad0d285411bdd0b2))
* support serialization of Moment.js types ([#879](https://www.github.com/googleapis/nodejs-firestore/issues/879)) ([9169fae](https://www.github.com/googleapis/nodejs-firestore/commit/9169fae692d219b5fb42004a4eb82e5a5919f087))
* allow logging to be disabled ([#880](https://www.github.com/googleapis/nodejs-firestore/issues/880)) ([36d75f6](https://www.github.com/googleapis/nodejs-firestore/commit/36d75f6b75d7ede4656636f1d8bf770eb1cb3a80))


### Bug Fixes

* don't format log message if logging is disabled ([#874](https://www.github.com/googleapis/nodejs-firestore/issues/874)) ([b7b5fc9](https://www.github.com/googleapis/nodejs-firestore/commit/b7b5fc993d4cece92833c95487efe63320537058))
* disable non-transactional retries for Code ABORTED ([#881](https://www.github.com/googleapis/nodejs-firestore/issues/881)) ([82273ec](https://www.github.com/googleapis/nodejs-firestore/commit/82273ec0035b2ddae94d8f12791f8a5c55b6560d))
* manually retry ABORTED reads in transactions ([#883](https://www.github.com/googleapis/nodejs-firestore/issues/883)) ([7562033](https://www.github.com/googleapis/nodejs-firestore/commit/7562033876dc006e77d00b576b2541a7dfd30c66))
* remove ticks from code comments ([#885](https://www.github.com/googleapis/nodejs-firestore/issues/885)) ([b2740ed](https://www.github.com/googleapis/nodejs-firestore/commit/b2740ed4fb0e7c34fd407e3de4f47f03067171cb))

### [3.3.4](https://www.github.com/googleapis/nodejs-firestore/compare/v3.3.3...v3.3.4) (2020-01-12)


### Bug Fixes

* do not release client before retry ([#870](https://www.github.com/googleapis/nodejs-firestore/issues/870)) ([47f7ab5](https://www.github.com/googleapis/nodejs-firestore/commit/47f7ab52f9133064785754ee924d9f8736853eba))
* proper routing headers ([43472f6](https://www.github.com/googleapis/nodejs-firestore/commit/43472f6bd51a22a5ee27d7fc0f88a9dd97c22336))
* remove redundant log line ([#868](https://www.github.com/googleapis/nodejs-firestore/issues/868)) ([af3196f](https://www.github.com/googleapis/nodejs-firestore/commit/af3196fe8da2018e0a9842f4f62588ce2c740597))

### [3.3.3](https://www.github.com/googleapis/nodejs-firestore/compare/v3.3.2...v3.3.3) (2020-01-08)


### Bug Fixes

* support Objects created with Object.create({}) ([#842](https://www.github.com/googleapis/nodejs-firestore/issues/842)) ([a85f0c3](https://www.github.com/googleapis/nodejs-firestore/commit/a85f0c32eca5d8cf677d621a8ff326623ad5266e))
* use rejected Promise for terminate() ([#845](https://www.github.com/googleapis/nodejs-firestore/issues/845)) ([f2c4d91](https://www.github.com/googleapis/nodejs-firestore/commit/f2c4d911077c8e5b7713263fc8b2c21bbd50ca11))

### [3.3.2](https://www.github.com/googleapis/nodejs-firestore/compare/v3.3.1...v3.3.2) (2020-01-06)


### Bug Fixes

* add quotes to field name to avoid ambiguity ([#860](https://www.github.com/googleapis/nodejs-firestore/issues/860)) ([8caee71](https://www.github.com/googleapis/nodejs-firestore/commit/8caee71f6105e82faf3f6334e69ed5890f977a3a))

### [3.3.1](https://www.github.com/googleapis/nodejs-firestore/compare/v3.3.0...v3.3.1) (2020-01-06)


### Bug Fixes

* don't recreate instances when client is idle ([0aa2a8b](https://www.github.com/googleapis/nodejs-firestore/commit/0aa2a8b8d0c76e0cfc6d29c37d143cc9c0b45fec))

## [3.3.0](https://www.github.com/googleapis/nodejs-firestore/compare/v3.2.0...v3.3.0) (2020-01-03)


### Features

* add Symbol.asyncInterator to Query.stream() ([#843](https://www.github.com/googleapis/nodejs-firestore/issues/843)) ([68795c4](https://www.github.com/googleapis/nodejs-firestore/commit/68795c43ae9ef6b286650228746c7c16f59347f7))
* use GAX retry config for streams ([#847](https://www.github.com/googleapis/nodejs-firestore/issues/847)) ([218a4c6](https://www.github.com/googleapis/nodejs-firestore/commit/218a4c65afcc55158aac45b98a4ccb28b88c00a1))


### Bug Fixes

* increase test timeout ([#846](https://www.github.com/googleapis/nodejs-firestore/issues/846)) ([b94c367](https://www.github.com/googleapis/nodejs-firestore/commit/b94c367e9655f8a6a3553610ebc655877be502ec))
* retry writes that fail with status code ABORTED ([#854](https://www.github.com/googleapis/nodejs-firestore/issues/854)) ([96f085f](https://www.github.com/googleapis/nodejs-firestore/commit/96f085f3df7c8e6e20dbffb14ebf6ebb533fc036))

## [3.2.0](https://www.github.com/googleapis/nodejs-firestore/compare/v3.1.0...v3.2.0) (2019-12-30)


### Features

* allow specifying how many idle GRPC channels to keep ([#837](https://www.github.com/googleapis/nodejs-firestore/issues/837)) ([37e93da](https://www.github.com/googleapis/nodejs-firestore/commit/37e93da689f985b6b0f30645435b12179513eb64))


### Bug Fixes

* reduce overhead for listDocuments()/listCollections() ([#838](https://www.github.com/googleapis/nodejs-firestore/issues/838)) ([5c870e6](https://www.github.com/googleapis/nodejs-firestore/commit/5c870e615e4774d3d50fc33c17b5da45dcacea4f))

## [3.1.0](https://www.github.com/googleapis/nodejs-firestore/compare/v3.0.0...v3.1.0) (2019-12-19)


### Features

* add ability to close channels ([#824](https://www.github.com/googleapis/nodejs-firestore/issues/824)) ([9ef582a](https://www.github.com/googleapis/nodejs-firestore/commit/9ef582aa0508a3d02fb036f741c8c51e5ff4307c))


### Bug Fixes

* **deps:** update dependency deep-equal to v2 ([#821](https://www.github.com/googleapis/nodejs-firestore/issues/821)) ([25472e1](https://www.github.com/googleapis/nodejs-firestore/commit/25472e11a0e1a4a5e1931b1652d125f9c8cabf11))

## [3.0.0](https://www.github.com/googleapis/nodejs-firestore/compare/v2.6.1...v3.0.0) (2019-12-15)


### ⚠ BREAKING CHANGES

* convert Gapic client to TypeScript (#805)
* remove deprecated timestampInSnapshots setting (#808)

### Features

* convert Gapic client to TypeScript ([#805](https://www.github.com/googleapis/nodejs-firestore/issues/805)) ([5000b2d](https://www.github.com/googleapis/nodejs-firestore/commit/5000b2d4b5c528b66c5a71db343c0e4163d5d8f7))
* remove deprecated timestampInSnapshots setting ([#808](https://www.github.com/googleapis/nodejs-firestore/issues/808)) ([f37fffc](https://www.github.com/googleapis/nodejs-firestore/commit/f37fffc44fb1ddc8177bd24dfb44d830221e2479))


### Bug Fixes

* close GRPC channel when we dispose of clients ([#779](https://www.github.com/googleapis/nodejs-firestore/issues/779)) ([22ef0d0](https://www.github.com/googleapis/nodejs-firestore/commit/22ef0d0229569f0d97ff908b5866264a8de2ca78))

### [2.6.1](https://www.github.com/googleapis/nodejs-firestore/compare/v2.6.0...v2.6.1) (2019-12-05)


### Bug Fixes

* **deps:** pin TypeScript below 3.7.0 ([0d4e558](https://www.github.com/googleapis/nodejs-firestore/commit/0d4e558be4111b3524aa3b855b14e63cb486d2c8))
* **docs:** snippets are now replaced in jsdoc comments ([#795](https://www.github.com/googleapis/nodejs-firestore/issues/795)) ([396bebb](https://www.github.com/googleapis/nodejs-firestore/commit/396bebbe21b4df16b3017d144fd9e505eb99feda))

## [2.6.0](https://www.github.com/googleapis/nodejs-firestore/compare/v2.5.0...v2.6.0) (2019-11-01)


### Features

* add IN queries support  ([#715](https://www.github.com/googleapis/nodejs-firestore/issues/715)) ([00bdf8f](https://www.github.com/googleapis/nodejs-firestore/commit/00bdf8ff81f658c4534adea8d2010a1f68195f45))

## [2.5.0](https://www.github.com/googleapis/nodejs-firestore/compare/v2.4.0...v2.5.0) (2019-10-22)


### Features

* introduces ARRAY_CONTAINS_ANY and IN to operator enum ([2c8869d](https://www.github.com/googleapis/nodejs-firestore/commit/2c8869d23ad1aef024273b640579624cde97849f))


### Bug Fixes

* **deps:** bump google-gax to 1.7.5 ([#786](https://www.github.com/googleapis/nodejs-firestore/issues/786)) ([e5763ba](https://www.github.com/googleapis/nodejs-firestore/commit/e5763baadf7cc424620913a09ca0ed6af4a0971a))

## [2.4.0](https://www.github.com/googleapis/nodejs-firestore/compare/v2.3.0...v2.4.0) (2019-10-03)


### Bug Fixes

* provide custom error for FieldValue subclasses ([#771](https://www.github.com/googleapis/nodejs-firestore/issues/771)) ([29c3e9b](https://www.github.com/googleapis/nodejs-firestore/commit/29c3e9b))
* use compatible version of google-gax ([b0c89c5](https://www.github.com/googleapis/nodejs-firestore/commit/b0c89c5))


### Features

* ability to specify the Collection Group query scope in the V1 Admin API ([#762](https://www.github.com/googleapis/nodejs-firestore/issues/762)) ([b16cd40](https://www.github.com/googleapis/nodejs-firestore/commit/b16cd40))

## [2.3.0](https://www.github.com/googleapis/nodejs-firestore/compare/v2.2.9...v2.3.0) (2019-09-09)


### Features

* load protos from JSON, grpc-fallback support ([#749](https://www.github.com/googleapis/nodejs-firestore/issues/749)) ([6cb9d68](https://www.github.com/googleapis/nodejs-firestore/commit/6cb9d68))

### [2.2.9](https://www.github.com/googleapis/nodejs-firestore/compare/v2.2.8...v2.2.9) (2019-08-30)


### Bug Fixes

* retrying 13 INTERNAL RPC errors ([#742](https://www.github.com/googleapis/nodejs-firestore/issues/742)) ([431edcb](https://www.github.com/googleapis/nodejs-firestore/commit/431edcb))

### [2.2.8](https://www.github.com/googleapis/nodejs-firestore/compare/v2.2.7...v2.2.8) (2019-08-22)


### Bug Fixes

* serialization does not work with null objects ([#736](https://www.github.com/googleapis/nodejs-firestore/issues/736)) ([870d6a7](https://www.github.com/googleapis/nodejs-firestore/commit/870d6a7))

### [2.2.7](https://www.github.com/googleapis/nodejs-firestore/compare/v2.2.6...v2.2.7) (2019-08-16)


### Bug Fixes

* **deps:** use the latest extend ([#728](https://www.github.com/googleapis/nodejs-firestore/issues/728)) ([425bf3d](https://www.github.com/googleapis/nodejs-firestore/commit/425bf3d))
* add logging to client pool ([#733](https://www.github.com/googleapis/nodejs-firestore/issues/733)) ([a4efa09](https://www.github.com/googleapis/nodejs-firestore/commit/a4efa09))

### [2.2.6](https://www.github.com/googleapis/nodejs-firestore/compare/v2.2.5...v2.2.6) (2019-08-02)


### Bug Fixes

*  allow calls with no request, add JSON proto ([#725](https://www.github.com/googleapis/nodejs-firestore/issues/725)) ([8b0624b](https://www.github.com/googleapis/nodejs-firestore/commit/8b0624b))

### [2.2.5](https://www.github.com/googleapis/nodejs-firestore/compare/v2.2.4...v2.2.5) (2019-08-02)


### Bug Fixes

* Better error for Collection Group Queries with documentId() cursors ([#720](https://www.github.com/googleapis/nodejs-firestore/issues/720)) ([169286d](https://www.github.com/googleapis/nodejs-firestore/commit/169286d))

### [2.2.4](https://www.github.com/googleapis/nodejs-firestore/compare/v2.2.3...v2.2.4) (2019-07-08)


### Bug Fixes

* Don't re-open streams on 'error' and 'end' ([#713](https://www.github.com/googleapis/nodejs-firestore/issues/713)) ([104a965](https://www.github.com/googleapis/nodejs-firestore/commit/104a965))

### [2.2.3](https://www.github.com/googleapis/nodejs-firestore/compare/v2.2.2...v2.2.3) (2019-06-26)


### Bug Fixes

* **docs:** link to reference docs section on googleapis.dev ([#701](https://www.github.com/googleapis/nodejs-firestore/issues/701)) ([d7c89a8](https://www.github.com/googleapis/nodejs-firestore/commit/d7c89a8))
* Relax validation of FIRESTORE_EMULATOR_HOST in settings() ([#703](https://www.github.com/googleapis/nodejs-firestore/issues/703)) ([daff9de](https://www.github.com/googleapis/nodejs-firestore/commit/daff9de))

### [2.2.2](https://www.github.com/googleapis/nodejs-firestore/compare/v2.2.1...v2.2.2) (2019-06-25)


### Bug Fixes

* Support non-ISO-8859-1 Collection Names in Queries ([fc6f839](https://www.github.com/googleapis/nodejs-firestore/commit/fc6f839))
* Unset servicePath when FIRESTORE_EMULATOR_HOST is set ([#696](https://www.github.com/googleapis/nodejs-firestore/issues/696)) ([5a19931](https://www.github.com/googleapis/nodejs-firestore/commit/5a19931))
* Use new stream rather than pipe ([#700](https://www.github.com/googleapis/nodejs-firestore/issues/700)) ([0370e03](https://www.github.com/googleapis/nodejs-firestore/commit/0370e03))

### [2.2.1](https://www.github.com/googleapis/nodejs-firestore/compare/v2.2.0...v2.2.1) (2019-06-14)


### Bug Fixes

* **docs:** move to new client docs URL ([#689](https://www.github.com/googleapis/nodejs-firestore/issues/689)) ([58acc46](https://www.github.com/googleapis/nodejs-firestore/commit/58acc46))

## [2.2.0](https://www.github.com/googleapis/nodejs-firestore/compare/v2.1.1...v2.2.0) (2019-06-06)


### Bug Fixes

* Split settings.host into servicePath and port ([#684](https://www.github.com/googleapis/nodejs-firestore/issues/684)) ([b2cbca5](https://www.github.com/googleapis/nodejs-firestore/commit/b2cbca5))
* Store large numbers as doubles ([#683](https://www.github.com/googleapis/nodejs-firestore/issues/683)) ([607b3c0](https://www.github.com/googleapis/nodejs-firestore/commit/607b3c0))


### Features

* support apiEndpoint override in client constructor ([368bc5c](https://www.github.com/googleapis/nodejs-firestore/commit/368bc5c))
* Support host, ssl and FIRESTORE_EMULATOR_HOST for endpoint configuration ([#680](https://www.github.com/googleapis/nodejs-firestore/issues/680)) ([d15f29d](https://www.github.com/googleapis/nodejs-firestore/commit/d15f29d))

## [2.1.1](https://www.github.com/googleapis/nodejs-firestore/compare/v2.1.0...v2.1.1) (2019-05-30)


### Dependencies
- deps: Pin @gprc/grpc-js to 0.4.0 ([#668](https://github.com/googleapis/nodejs-firestore/pull/668))


 ### Internal / Testing Changes
- build: remove verbose logging from test scripts ([#665](https://github.com/googleapis/nodejs-firestore/pull/665))
- build: ignore proto files in test coverage ([#664](https://github.com/googleapis/nodejs-firestore/pull/664))

## [2.1.0](https://www.github.com/googleapis/nodejs-firestore/compare/v2.0.0...v2.1.0) (2019-05-28)


### Bug Fixes

* Add overloads for doc() and doc(id:string) ([#662](https://www.github.com/googleapis/nodejs-firestore/issues/662)) ([cb189e9](https://www.github.com/googleapis/nodejs-firestore/commit/cb189e9))
* retry on abort and limit retry count to 10 ([#655](https://www.github.com/googleapis/nodejs-firestore/issues/655)) ([9e97656](https://www.github.com/googleapis/nodejs-firestore/commit/9e97656))


### Features

* Support listDocuments()/listCollections() via the Firestore Emulator ([#654](https://www.github.com/googleapis/nodejs-firestore/issues/654)) ([eaf5a4e](https://www.github.com/googleapis/nodejs-firestore/commit/eaf5a4e))

## [2.0.0](https://www.github.com/googleapis/nodejs-firestore/compare/v1.3.0...v2.0.0) (2019-05-20)


### ⚠ BREAKING CHANGES

* library now requires Node >= 8.13.0
* **deprecation:** remove legacy support for array arguments (#625)
* **deprecation:** remove deprecated getCollections() (#624)
* upgrade engines field to >=8.10.0 (#608)

### Bug Fixes

* **deps:** update dependency google-gax to ^0.26.0 ([#606](https://www.github.com/googleapis/nodejs-firestore/issues/606)) ([a637a68](https://www.github.com/googleapis/nodejs-firestore/commit/a637a68))
* Fix client pooling for long-lived listens ([#614](https://www.github.com/googleapis/nodejs-firestore/issues/614)) ([479bc9c](https://www.github.com/googleapis/nodejs-firestore/commit/479bc9c)), closes [firebase/firebase-admin-node#499](https://www.github.com/googleapis/nodejs-firestore/issues/499) [#256](https://www.github.com/googleapis/nodejs-firestore/issues/256)
* **deps:** update dependency google-gax to v1 ([#615](https://www.github.com/googleapis/nodejs-firestore/issues/615)) ([687a353](https://www.github.com/googleapis/nodejs-firestore/commit/687a353))
* run the generator ([#616](https://www.github.com/googleapis/nodejs-firestore/issues/616)) ([92b0add](https://www.github.com/googleapis/nodejs-firestore/commit/92b0add))
* **docs:** revert jsdoc and pin to 3.5.5 ([#627](https://www.github.com/googleapis/nodejs-firestore/issues/627)) ([e22f9c6](https://www.github.com/googleapis/nodejs-firestore/commit/e22f9c6))
* Support more than 100 long-lived streams ([#623](https://www.github.com/googleapis/nodejs-firestore/issues/623)) ([9474e3f](https://www.github.com/googleapis/nodejs-firestore/commit/9474e3f))


### Build System

* upgrade engines field to >=8.10.0 ([#608](https://www.github.com/googleapis/nodejs-firestore/issues/608)) ([32485f4](https://www.github.com/googleapis/nodejs-firestore/commit/32485f4))
* upgrade engines field to >=8.13.0 ([#636](https://www.github.com/googleapis/nodejs-firestore/issues/636)) ([a5db7d8](https://www.github.com/googleapis/nodejs-firestore/commit/a5db7d8))


### Code Refactoring

* **deprecation:** remove deprecated getCollections() ([#624](https://www.github.com/googleapis/nodejs-firestore/issues/624)) ([43ac9c6](https://www.github.com/googleapis/nodejs-firestore/commit/43ac9c6))
* **deprecation:** remove legacy support for array arguments ([#625](https://www.github.com/googleapis/nodejs-firestore/issues/625)) ([54dd405](https://www.github.com/googleapis/nodejs-firestore/commit/54dd405))

## v1.3.0

04-26-2019 16:54 PDT

### New Features
- feature: Adding CollectionGroup queries ([#578](https://github.com/googleapis/nodejs-firestore/pull/578))([#595](https://github.com/googleapis/nodejs-firestore/pull/595))

### Dependencies
- chore(deps): update dependency nyc to v14 ([#600](https://github.com/googleapis/nodejs-firestore/pull/600))
- chore(deps): update dependency typescript to ~3.4.0
- docs: add .readme-metadata.json and generate new README.md 

### Documentation
- docs: Add example for Precondition ([#601](https://github.com/googleapis/nodejs-firestore/pull/601))

## v1.2.0

03-21-2019 14:17 PDT

### New Features
- feature: Release the V1 Admin API ([#590](https://github.com/googleapis/nodejs-firestore/pull/590))
  The Firestore Node SDK now exposes the Firestore Admin API (via `v1.FirebaseAdminClient()`).

### Implementation Changes
- deps/refactor: Removing @google-cloud/projectify ([#564](https://github.com/googleapis/nodejs-firestore/pull/564))

### Dependencies
- chore(deps): update dependency hard-rejection to v2

### Documentation
- fix(docs): add namespaces so docs are generated ([#591](https://github.com/googleapis/nodejs-firestore/pull/591))
- docs: fix typo in doc strings ([#585](https://github.com/googleapis/nodejs-firestore/pull/585))

### Internal / Testing Changes
- chore: publish to npm using wombat ([#586](https://github.com/googleapis/nodejs-firestore/pull/586))
- build: use per-repo publish token ([#582](https://github.com/googleapis/nodejs-firestore/pull/582))
- refactor: update json import paths ([#580](https://github.com/googleapis/nodejs-firestore/pull/580))

## v1.1.0

03-10-2019 20:09 PDT

### New Features
- feature: Added `FieldValue.increment()`, which can be used in `create()`, `update()` and `set(..., {merge:true})` to 
  increment or decrement numeric field values safely without transactions ([#444](https://github.com/googleapis/nodejs-firestore/pull/444))

### Implementation Changes
- fix: Allow async functions ([#576](https://github.com/googleapis/nodejs-firestore/pull/576))
- fix: Don't call stream.end() on Watch ended by server ([#565](https://github.com/googleapis/nodejs-firestore/pull/565))

### Internal / Testing Changes
- refactor: async/await to test/order.ts ([#566](https://github.com/googleapis/nodejs-firestore/pull/566))
- build: Add docuploader credentials to node publish jobs ([#572](https://github.com/googleapis/nodejs-firestore/pull/572))
- build: update release config ([#570](https://github.com/googleapis/nodejs-firestore/pull/570))
- build: use node10 to run samples-test, system-test etc ([#571](https://github.com/googleapis/nodejs-firestore/pull/571))

## v1.0.2

03-04-2019 13:32 PST

### Implementation Changes

- fix: throw on invalid credentials ([#548](https://github.com/googleapis/nodejs-firestore/pull/548))

### Dependencies

- fix(deps): update dependency google-gax to ^0.25.0 ([#535](https://github.com/googleapis/nodejs-firestore/pull/535))
- chore(deps): update dependency mocha to v6
- chore(deps): update dependency duplexify to v4 ([#539](https://github.com/googleapis/nodejs-firestore/pull/539))

### Documentation

- docs: update comments on protos ([#559](https://github.com/googleapis/nodejs-firestore/pull/559))
- docs: update API doc comments ([#557](https://github.com/googleapis/nodejs-firestore/pull/557))
- docs: update links in contrib guide ([#550](https://github.com/googleapis/nodejs-firestore/pull/550))
- docs: add lint/fix example to contributing guide ([#541](https://github.com/googleapis/nodejs-firestore/pull/541))
- docs: fix example comments ([#540](https://github.com/googleapis/nodejs-firestore/pull/540))
- doc: show GA message in README.md ([#536](https://github.com/googleapis/nodejs-firestore/pull/536))
- Add note about Datastore mode ([#552](https://github.com/googleapis/nodejs-firestore/pull/552))
- chore: move CONTRIBUTING.md to root ([#543](https://github.com/googleapis/nodejs-firestore/pull/543))
- docs: update contributing path in README ([#544](https://github.com/googleapis/nodejs-firestore/pull/544))

### Internal / Testing Changes

- refactor(typescript): enable noImplicitAny ([#553](https://github.com/googleapis/nodejs-firestore/pull/553))
- chore: update array types ([#555](https://github.com/googleapis/nodejs-firestore/pull/555))
- Finish TypeScript Migration ([#512](https://github.com/googleapis/nodejs-firestore/pull/512))
- refactor: improve generated code style. ([#538](https://github.com/googleapis/nodejs-firestore/pull/538))
- Remove unhandled Promise rejection warning ([#556](https://github.com/googleapis/nodejs-firestore/pull/556))
- build: use linkinator for docs test ([#549](https://github.com/googleapis/nodejs-firestore/pull/549))
- build: create docs test npm scripts ([#547](https://github.com/googleapis/nodejs-firestore/pull/547))
- build: test using @grpc/grpc-js in CI ([#546](https://github.com/googleapis/nodejs-firestore/pull/546))

## v1.0.1

01-29-2019 14:02 PST

# Documentation

- doc: update README.md to show this library as GA ([#532](https://github.com/googleapis/nodejs-firestore/pull/532))
- fix(samples): constructor doesn't need project or cred options ([#533](https://github.com/googleapis/nodejs-firestore/pull/533))

## v1.0.0

01-29-2019 12:12 PST

This is the Firestore Node.js Client Library GA release.

## v0.21.0

01-25-2019 12:21 PST

This release brings in google-gax update to 0.24.0 which had its dependency google-auth-library updated to 3.0.0^ that swaps out axios in favour of gaxios and addresses an issue using the library behind a proxy (https://github.com/googleapis/nodejs-firestore/issues/493).

### Dependencies
- chore(deps): update dependency ts-node to v8 ([#526](https://github.com/googleapis/nodejs-firestore/pull/526))
- fix(deps): update dependency google-gax to ^0.24.0 ([#529](https://github.com/googleapis/nodejs-firestore/pull/529))

### Documentation
- build: ignore googleapis.com in doc link check ([#527](https://github.com/googleapis/nodejs-firestore/pull/527))
- docs: fix import links in the jsdocs ([#524](https://github.com/googleapis/nodejs-firestore/pull/524))

### Internal / Testing Changes
- chore: update year in the license headers. ([#523](https://github.com/googleapis/nodejs-firestore/pull/523))

## v0.20.0

01-16-2019 13:14 PST

#### BREAKING: The `timestampsInSnapshots` default has changed to true.
The `timestampsInSnapshots` setting is now enabled by default so timestamp
fields read from a `DocumentSnapshot` will be returned as `Timestamp` objects
instead of `Date`. Any code expecting to receive a `Date` object must be
updated.

#### DEPRECATED: `Firestore.v1beta1` replaced by `Firestore.v1`
If you are currently using `Firestore.v1beta1.FirestoreClient`, you must switch
to `Firestore.v1.FirestoreClient`. No other changes should be required as the
API is 100% identical.

### Bug Fixes
- fix: getAll function signature to allow array destructuring ([#515](https://github.com/googleapis/nodejs-firestore/pull/515))
- fix: update grpc retry config ([#464](https://github.com/googleapis/nodejs-firestore/pull/464))

### New Features
- feat: update to v1 protos ([#516](https://github.com/googleapis/nodejs-firestore/pull/516))
- feat: add additional field transform types ([#521](https://github.com/googleapis/nodejs-firestore/pull/521))

### Dependencies
- fix(deps): update dependency google-gax to ^0.23.0 ([#518](https://github.com/googleapis/nodejs-firestore/pull/518))

### Documentation
- fix(docs): remove unused long running operations types
- docs: elaborate on QuerySnapshot.forEach ([#480](https://github.com/googleapis/nodejs-firestore/pull/480))
- docs: update doc writetime ([#475](https://github.com/googleapis/nodejs-firestore/pull/475))
- docs: Fix example for writeTime ([#474](https://github.com/googleapis/nodejs-firestore/pull/474))
- chore: update license file ([#473](https://github.com/googleapis/nodejs-firestore/pull/473))
- docs: update readme badges ([#470](https://github.com/googleapis/nodejs-firestore/pull/470))

### Internal / Testing Changes
- build: check broken links in generated docs ([#511](https://github.com/googleapis/nodejs-firestore/pull/511))
- chore(build): inject yoshi automation key ([#492](https://github.com/googleapis/nodejs-firestore/pull/492))
- chore: update nyc and eslint configs ([#491](https://github.com/googleapis/nodejs-firestore/pull/491))
- chore: fix publish.sh permission +x ([#489](https://github.com/googleapis/nodejs-firestore/pull/489))
- fix(build): fix Kokoro release script ([#488](https://github.com/googleapis/nodejs-firestore/pull/488))
- build: add Kokoro configs for autorelease ([#487](https://github.com/googleapis/nodejs-firestore/pull/487))
- chore: add synth.metadata ([#485](https://github.com/googleapis/nodejs-firestore/pull/485))
- chore: always nyc report before calling codecov ([#482](https://github.com/googleapis/nodejs-firestore/pull/482))
- chore: nyc ignore build/test by default ([#479](https://github.com/googleapis/nodejs-firestore/pull/479))
- chore(build): update the prettier config ([#476](https://github.com/googleapis/nodejs-firestore/pull/476))
- chore(deps): update dependency typescript to ~3.2.0 ([#467](https://github.com/googleapis/nodejs-firestore/pull/467))
- fix(build): fix system key decryption ([#468](https://github.com/googleapis/nodejs-firestore/pull/468))
- Adding array-contains to error message ([#465](https://github.com/googleapis/nodejs-firestore/pull/465))

## v0.17.0

### Implementation Changes
- Regenerate library with synth.py customizations ([#345](https://github.com/googleapis/nodejs-firestore/pull/345))
  - contains some documentation and internal timeout changes
- Converting backoff.js to TypeScript ([#328](https://github.com/googleapis/nodejs-firestore/pull/328))
- Making .dotChanges a method ([#324](https://github.com/googleapis/nodejs-firestore/pull/324))

### Dependencies
- chore(deps): update dependency nyc to v13 ([#329](https://github.com/googleapis/nodejs-firestore/pull/329))
- fix(deps): update dependency google-gax to ^0.19.0 ([#325](https://github.com/googleapis/nodejs-firestore/pull/325))

### Documentation
- Fix DocumentReference.get() docs ([#332](https://github.com/googleapis/nodejs-firestore/pull/332))

### Internal / Testing Changes
- Retry npm install in CI ([#341](https://github.com/googleapis/nodejs-firestore/pull/341))
- make synth.py generate library to ./dev ([#337](https://github.com/googleapis/nodejs-firestore/pull/337))
- Revert "Re-generate library using /synth.py ([#331](https://github.com/googleapis/nodejs-firestore/pull/331))" ([#334](https://github.com/googleapis/nodejs-firestore/pull/334))
- Re-generate library using /synth.py ([#331](https://github.com/googleapis/nodejs-firestore/pull/331))
