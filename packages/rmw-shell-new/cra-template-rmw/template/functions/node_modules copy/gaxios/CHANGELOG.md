# Changelog

### [2.3.2](https://www.github.com/googleapis/gaxios/compare/v2.3.1...v2.3.2) (2020-02-28)


### Bug Fixes

* update github repo in package ([#239](https://www.github.com/googleapis/gaxios/issues/239)) ([7e750cb](https://www.github.com/googleapis/gaxios/commit/7e750cbaaa59812817d725c74fb9d364c4b71096))

### [2.3.1](https://www.github.com/googleapis/gaxios/compare/v2.3.0...v2.3.1) (2020-02-13)


### Bug Fixes

* **deps:** update dependency https-proxy-agent to v5 ([#233](https://www.github.com/googleapis/gaxios/issues/233)) ([56de0a8](https://www.github.com/googleapis/gaxios/commit/56de0a824a2f9622e3e4d4bdd41adccd812a30b4))

## [2.3.0](https://www.github.com/googleapis/gaxios/compare/v2.2.2...v2.3.0) (2020-01-31)


### Features

* add promise support for onRetryAttempt and shouldRetry ([#223](https://www.github.com/googleapis/gaxios/issues/223)) ([061afa3](https://www.github.com/googleapis/gaxios/commit/061afa381a51d39823e63accf3dacd16e191f3b9))

### [2.2.2](https://www.github.com/googleapis/gaxios/compare/v2.2.1...v2.2.2) (2020-01-08)


### Bug Fixes

* **build:** add publication configuration ([#218](https://www.github.com/googleapis/gaxios/issues/218)) ([43e581f](https://www.github.com/googleapis/gaxios/commit/43e581ff4ed5e79d72f6f29748a5eebb6bff1229))

### [2.2.1](https://www.github.com/googleapis/gaxios/compare/v2.2.0...v2.2.1) (2020-01-04)


### Bug Fixes

* **deps:** update dependency https-proxy-agent to v4 ([#201](https://www.github.com/googleapis/gaxios/issues/201)) ([5cdeef2](https://www.github.com/googleapis/gaxios/commit/5cdeef288a0c5c544c0dc2659aafbb2215d06c4b))
* remove retryDelay option ([#203](https://www.github.com/googleapis/gaxios/issues/203)) ([d21e08d](https://www.github.com/googleapis/gaxios/commit/d21e08d2aada980d39bc5ca7093d54452be2d646))

## [2.2.0](https://www.github.com/googleapis/gaxios/compare/v2.1.1...v2.2.0) (2019-12-05)


### Features

* populate GaxiosResponse with raw response information (res.url) ([#189](https://www.github.com/googleapis/gaxios/issues/189)) ([53a7f54](https://www.github.com/googleapis/gaxios/commit/53a7f54cc0f20320d7a6a21a9a9f36050cec2eec))


### Bug Fixes

* don't retry a request that is aborted intentionally ([#190](https://www.github.com/googleapis/gaxios/issues/190)) ([ba9777b](https://www.github.com/googleapis/gaxios/commit/ba9777b15b5262f8288a8bb3cca49a1de8427d8e))
* **deps:** pin TypeScript below 3.7.0 ([5373f07](https://www.github.com/googleapis/gaxios/commit/5373f0793a765965a8221ecad2f99257ed1b7444))

### [2.1.1](https://www.github.com/googleapis/gaxios/compare/v2.1.0...v2.1.1) (2019-11-15)


### Bug Fixes

* **docs:** snippets are now replaced in jsdoc comments ([#183](https://www.github.com/googleapis/gaxios/issues/183)) ([8dd1324](https://www.github.com/googleapis/gaxios/commit/8dd1324256590bd2f2e9015c813950e1cd8cb330))

## [2.1.0](https://www.github.com/googleapis/gaxios/compare/v2.0.3...v2.1.0) (2019-10-09)


### Bug Fixes

* **deps:** update dependency https-proxy-agent to v3 ([#172](https://www.github.com/googleapis/gaxios/issues/172)) ([4a38f35](https://www.github.com/googleapis/gaxios/commit/4a38f35))


### Features

* **TypeScript:** agent can now be passed as builder method, rather than agent instance ([c84ddd6](https://www.github.com/googleapis/gaxios/commit/c84ddd6))

### [2.0.3](https://www.github.com/googleapis/gaxios/compare/v2.0.2...v2.0.3) (2019-09-11)


### Bug Fixes

* do not override content-type if its given ([#158](https://www.github.com/googleapis/gaxios/issues/158)) ([f49e0e6](https://www.github.com/googleapis/gaxios/commit/f49e0e6))
* improve stream detection logic ([6c41537](https://www.github.com/googleapis/gaxios/commit/6c41537))
* revert header change ([#161](https://www.github.com/googleapis/gaxios/issues/161)) ([b0f6a8b](https://www.github.com/googleapis/gaxios/commit/b0f6a8b))

### [2.0.2](https://www.github.com/googleapis/gaxios/compare/v2.0.1...v2.0.2) (2019-07-23)


### Bug Fixes

* check for existence of fetch before using it ([#138](https://www.github.com/googleapis/gaxios/issues/138)) ([79eb58d](https://www.github.com/googleapis/gaxios/commit/79eb58d))
* **docs:** make anchors work in jsdoc ([#139](https://www.github.com/googleapis/gaxios/issues/139)) ([85103bb](https://www.github.com/googleapis/gaxios/commit/85103bb))
* prevent double option processing ([#142](https://www.github.com/googleapis/gaxios/issues/142)) ([19b4b3c](https://www.github.com/googleapis/gaxios/commit/19b4b3c))
