# Changelog

[npm history][1]

[1]: https://www.npmjs.com/package/gcs-resumable-upload?activeTab=versions

### [2.3.3](https://www.github.com/googleapis/gcs-resumable-upload/compare/v2.3.2...v2.3.3) (2020-03-06)


### Bug Fixes

* **docs:** progress event in readme file  ([#313](https://www.github.com/googleapis/gcs-resumable-upload/issues/313)) ([0dfdd07](https://www.github.com/googleapis/gcs-resumable-upload/commit/0dfdd07d7472e63eb19e5c216171a13a517bf29a))

### [2.3.2](https://www.github.com/googleapis/gcs-resumable-upload/compare/v2.3.1...v2.3.2) (2019-12-05)


### Bug Fixes

* **deps:** TypeScript 3.7.0 causes breaking change in typings ([#285](https://www.github.com/googleapis/gcs-resumable-upload/issues/285)) ([3e671b2](https://www.github.com/googleapis/gcs-resumable-upload/commit/3e671b262a7ef5383fbc5e5b6232d7bcd2c6641e))
* **typescript:** add return type for base uri getter ([#286](https://www.github.com/googleapis/gcs-resumable-upload/issues/286)) ([7121624](https://www.github.com/googleapis/gcs-resumable-upload/commit/71216249ee781714b73826ee7902ed1847402102))

### [2.3.1](https://www.github.com/googleapis/gcs-resumable-upload/compare/v2.3.0...v2.3.1) (2019-11-14)


### Bug Fixes

* **docs:** add jsdoc-region-tag plugin ([#282](https://www.github.com/googleapis/gcs-resumable-upload/issues/282)) ([4942669](https://www.github.com/googleapis/gcs-resumable-upload/commit/494266901b0cdcc9956dda721a4ca19d3b4ced53))

## [2.3.0](https://www.github.com/googleapis/gcs-resumable-upload/compare/v2.2.5...v2.3.0) (2019-10-09)


### Features

* support all query parameters during URI creation ([#275](https://www.github.com/googleapis/gcs-resumable-upload/issues/275)) ([383a490](https://www.github.com/googleapis/gcs-resumable-upload/commit/383a490))

### [2.2.5](https://www.github.com/googleapis/gcs-resumable-upload/compare/v2.2.4...v2.2.5) (2019-09-07)


### Bug Fixes

* typecast metadata.size from string to number ([#263](https://www.github.com/googleapis/gcs-resumable-upload/issues/263)) ([64ea7a1](https://www.github.com/googleapis/gcs-resumable-upload/commit/64ea7a1))

### [2.2.4](https://www.github.com/googleapis/gcs-resumable-upload/compare/v2.2.3...v2.2.4) (2019-08-15)


### Bug Fixes

* let gaxios handle API errors ([#255](https://www.github.com/googleapis/gcs-resumable-upload/issues/255)) ([7a913ef](https://www.github.com/googleapis/gcs-resumable-upload/commit/7a913ef))

### [2.2.3](https://www.github.com/googleapis/gcs-resumable-upload/compare/v2.2.2...v2.2.3) (2019-07-26)


### Bug Fixes

* **deps:** update dependency google-auth-library to v5 ([#250](https://www.github.com/googleapis/gcs-resumable-upload/issues/250)) ([8bc4798](https://www.github.com/googleapis/gcs-resumable-upload/commit/8bc4798))

### [2.2.2](https://www.github.com/googleapis/gcs-resumable-upload/compare/v2.2.1...v2.2.2) (2019-07-17)


### Bug Fixes

* **deps:** update dependency pumpify to v2 ([#237](https://www.github.com/googleapis/gcs-resumable-upload/issues/237)) ([a2a2636](https://www.github.com/googleapis/gcs-resumable-upload/commit/a2a2636))

### [2.2.1](https://www.github.com/googleapis/gcs-resumable-upload/compare/v2.2.0...v2.2.1) (2019-07-17)


### Bug Fixes

* handle a `0` generation ([#247](https://www.github.com/googleapis/gcs-resumable-upload/issues/247)) ([0b991d5](https://www.github.com/googleapis/gcs-resumable-upload/commit/0b991d5)), closes [#246](https://www.github.com/googleapis/gcs-resumable-upload/issues/246)

## [2.2.0](https://www.github.com/googleapis/gcs-resumable-upload/compare/v2.1.1...v2.2.0) (2019-07-14)


### Bug Fixes

* **docs:** make anchors work in jsdoc ([#238](https://www.github.com/googleapis/gcs-resumable-upload/issues/238)) ([86e4433](https://www.github.com/googleapis/gcs-resumable-upload/commit/86e4433))
* expose 'Retry limit exceeded' server error message ([#240](https://www.github.com/googleapis/gcs-resumable-upload/issues/240)) ([40a1306](https://www.github.com/googleapis/gcs-resumable-upload/commit/40a1306))
* make cache key unique by including generation ([#243](https://www.github.com/googleapis/gcs-resumable-upload/issues/243)) ([85f80ab](https://www.github.com/googleapis/gcs-resumable-upload/commit/85f80ab))


### Features

* allow removing cache file ([#244](https://www.github.com/googleapis/gcs-resumable-upload/issues/244)) ([eb8976a](https://www.github.com/googleapis/gcs-resumable-upload/commit/eb8976a))

### [2.1.1](https://www.github.com/googleapis/gcs-resumable-upload/compare/v2.1.0...v2.1.1) (2019-06-20)


### Bug Fixes

* **deps:** update dependency configstore to v5 ([#234](https://www.github.com/googleapis/gcs-resumable-upload/issues/234)) ([9b957c6](https://www.github.com/googleapis/gcs-resumable-upload/commit/9b957c6))

## [2.1.0](https://www.github.com/googleapis/gcs-resumable-upload/compare/v2.0.0...v2.1.0) (2019-06-19)


### Features

* support apiEndpoint override ([#230](https://www.github.com/googleapis/gcs-resumable-upload/issues/230)) ([41325ac](https://www.github.com/googleapis/gcs-resumable-upload/commit/41325ac))

## [2.0.0](https://www.github.com/googleapis/gcs-resumable-upload/compare/v1.1.0...v2.0.0) (2019-05-09)


### Bug Fixes

* **deps:** update dependency abort-controller to v3 ([0c4f6c0](https://www.github.com/googleapis/gcs-resumable-upload/commit/0c4f6c0))
* **deps:** update dependency gaxios to v2 ([#210](https://www.github.com/googleapis/gcs-resumable-upload/issues/210)) ([d5a1a5c](https://www.github.com/googleapis/gcs-resumable-upload/commit/d5a1a5c))
* **deps:** update dependency google-auth-library to v4 ([#219](https://www.github.com/googleapis/gcs-resumable-upload/issues/219)) ([1e60178](https://www.github.com/googleapis/gcs-resumable-upload/commit/1e60178))


### Build System

* upgrade engines field to >=8.10.0 ([#213](https://www.github.com/googleapis/gcs-resumable-upload/issues/213)) ([5a81a8b](https://www.github.com/googleapis/gcs-resumable-upload/commit/5a81a8b))


### BREAKING CHANGES

* upgrade engines field to >=8.10.0 (#213)

## v1.1.0

03-26-2019 07:13 PDT
  
### New Features
- feat: support ConfigStore configPath option ([#194](https://github.com/googleapis/gcs-resumable-upload/pull/194))

### Internal / Testing Changes
- chore: publish to npm using wombat ([#197](https://github.com/googleapis/gcs-resumable-upload/pull/197))
- build: use per-repo npm publish token ([#195](https://github.com/googleapis/gcs-resumable-upload/pull/195))
- build: Add docuploader credentials to node publish jobs ([#192](https://github.com/googleapis/gcs-resumable-upload/pull/192))
- build: use node10 to run samples-test, system-test etc ([#190](https://github.com/googleapis/gcs-resumable-upload/pull/190))
- build: update release configuration

## v1.0.0

02-28-2019 06:27 PST

**This release has breaking changes**. The underlying transport library was changed from [request](https://github.com/request/request) to [gaxios](https://github.com/JustinBeckwith/gaxios).  Any `response` objects returned via the API will now return a [`GaxiosResponse`](https://github.com/JustinBeckwith/gaxios/blob/88a47e000625d8192689acac5c40c0b1e1d963a2/src/gaxios.ts#L197-L203) object.


#### Old Code
```js
.on('response', function (resp, metadata) {
  console.log(resp.statusCode);
})
```

#### New Code
```js
.on('response', function (resp) {
  console.log(resp.status);
});
```

### Implementation Changes
- fix: replace request with gaxios ([#174](https://github.com/GoogleCloudPlatform/gcs-resumable-upload/pull/174))

### Documentation
- docs: update links in contrib guide ([#184](https://github.com/GoogleCloudPlatform/gcs-resumable-upload/pull/184))
- docs: add lint/fix example to contributing guide ([#177](https://github.com/GoogleCloudPlatform/gcs-resumable-upload/pull/177))

### Internal / Testing Changes
- chore(deps): update dependency mocha to v6 ([#185](https://github.com/GoogleCloudPlatform/gcs-resumable-upload/pull/185))
- build: use linkinator for docs test ([#183](https://github.com/GoogleCloudPlatform/gcs-resumable-upload/pull/183))
- build: create docs test npm scripts ([#182](https://github.com/GoogleCloudPlatform/gcs-resumable-upload/pull/182))
- build: test using @grpc/grpc-js in CI ([#181](https://github.com/GoogleCloudPlatform/gcs-resumable-upload/pull/181))
- chore: move CONTRIBUTING.md to root ([#179](https://github.com/GoogleCloudPlatform/gcs-resumable-upload/pull/179))
- chore(deps): update dependency typescript to ~3.3.0 ([#176](https://github.com/GoogleCloudPlatform/gcs-resumable-upload/pull/176))

## v0.14.1

01-25-2019 10:39 PST
  
### Implementation Changes

- fix: return GaxiosError directly ([#171](https://github.com/googleapis/gcs-resumable-upload/pull/171))

### Documentation

- build: exclude googleapis in 404 check. ([#172](https://github.com/googleapis/gcs-resumable-upload/pull/172))
- build: exclude googleapis.com checks in 404 checker ([#170](https://github.com/googleapis/gcs-resumable-upload/pull/170))

## v0.14.0

01-23-2019 17:57 PST

### New Features
- feat: support async functions ([#164](https://github.com/googleapis/gcs-resumable-upload/pull/164))
- fix: use the reject handler for promises ([#144](https://github.com/googleapis/gcs-resumable-upload/pull/144))
- feat: add progress events ([#135](https://github.com/googleapis/gcs-resumable-upload/pull/135))

### Dependencies
- fix(deps): update dependency google-auth-library to v3 ([#165](https://github.com/googleapis/gcs-resumable-upload/pull/165))
- refactor: use teeny-request (part 1) ([#141](https://github.com/googleapis/gcs-resumable-upload/pull/141))
- chore(deps): update dependency @types/configstore to v4 ([#145](https://github.com/googleapis/gcs-resumable-upload/pull/145))
- chore(deps): update dependency typescript to ~3.2.0 ([#140](https://github.com/googleapis/gcs-resumable-upload/pull/140))
- chore(deps): update dependency gts to ^0.9.0 ([#137](https://github.com/googleapis/gcs-resumable-upload/pull/137))
- chore(deps): update dependency through2 to v3 ([#131](https://github.com/googleapis/gcs-resumable-upload/pull/131))
- refactor: move from axios back to request ([#123](https://github.com/googleapis/gcs-resumable-upload/pull/123))
- chore(deps): update dependency nock to v10 ([#113](https://github.com/googleapis/gcs-resumable-upload/pull/113))
- chore: update the version of typescript ([#106](https://github.com/googleapis/gcs-resumable-upload/pull/106))

### Documentation
- build: ignore googleapis.com in doc link checker ([#166](https://github.com/googleapis/gcs-resumable-upload/pull/166))
- build: check broken links in generated docs ([#162](https://github.com/googleapis/gcs-resumable-upload/pull/162))

### Internal / Testing Changes
- fix: fix the unit tests ([#161](https://github.com/googleapis/gcs-resumable-upload/pull/161))
- chore(build): inject yoshi automation key ([#160](https://github.com/googleapis/gcs-resumable-upload/pull/160))
- chore: update nyc and eslint configs ([#159](https://github.com/googleapis/gcs-resumable-upload/pull/159))
- chore: fix publish.sh permission +x ([#156](https://github.com/googleapis/gcs-resumable-upload/pull/156))
- fix(build): fix Kokoro release script ([#155](https://github.com/googleapis/gcs-resumable-upload/pull/155))
- build: add Kokoro configs for autorelease ([#154](https://github.com/googleapis/gcs-resumable-upload/pull/154))
- chore: always nyc report before calling codecov ([#153](https://github.com/googleapis/gcs-resumable-upload/pull/153))
- chore: nyc ignore build/test by default ([#152](https://github.com/googleapis/gcs-resumable-upload/pull/152))
- chore: update synth and common config ([#150](https://github.com/googleapis/gcs-resumable-upload/pull/150))
- fix(build): fix system key decryption ([#142](https://github.com/googleapis/gcs-resumable-upload/pull/142))
- chore: add synth.metadata
- chore: update eslintignore config ([#136](https://github.com/googleapis/gcs-resumable-upload/pull/136))
- chore: use latest npm on Windows ([#134](https://github.com/googleapis/gcs-resumable-upload/pull/134))
- chore: update CircleCI config ([#129](https://github.com/googleapis/gcs-resumable-upload/pull/129))
- chore: include build in eslintignore ([#126](https://github.com/googleapis/gcs-resumable-upload/pull/126))
- chore: update issue templates ([#121](https://github.com/googleapis/gcs-resumable-upload/pull/121))
- chore: remove old issue template ([#119](https://github.com/googleapis/gcs-resumable-upload/pull/119))
- build: run tests on node11 ([#118](https://github.com/googleapis/gcs-resumable-upload/pull/118))
- chores(build): run codecov on continuous builds ([#112](https://github.com/googleapis/gcs-resumable-upload/pull/112))
- chores(build): do not collect sponge.xml from windows builds ([#114](https://github.com/googleapis/gcs-resumable-upload/pull/114))
- chore: update new issue template ([#111](https://github.com/googleapis/gcs-resumable-upload/pull/111))
- build: fix codecov uploading on Kokoro ([#108](https://github.com/googleapis/gcs-resumable-upload/pull/108))
- Update kokoro config ([#105](https://github.com/googleapis/gcs-resumable-upload/pull/105))
- Update CI config ([#103](https://github.com/googleapis/gcs-resumable-upload/pull/103))
- Update kokoro config ([#101](https://github.com/googleapis/gcs-resumable-upload/pull/101))
- test: remove appveyor config ([#100](https://github.com/googleapis/gcs-resumable-upload/pull/100))
- Update kokoro config ([#99](https://github.com/googleapis/gcs-resumable-upload/pull/99))
- Enable prefer-const in the eslint config ([#98](https://github.com/googleapis/gcs-resumable-upload/pull/98))
- Enable no-var in eslint ([#97](https://github.com/googleapis/gcs-resumable-upload/pull/97))
- Update to new repo location ([#96](https://github.com/googleapis/gcs-resumable-upload/pull/96))
- Update CI config ([#95](https://github.com/googleapis/gcs-resumable-upload/pull/95))

## v0.13.0

### Dependencies
- fix(deps): update dependency google-auth-library to v2 (#89)
- chore(deps): update dependency nyc to v13 (#86)

### Docs
- docs: update the README (#79)

### Internal / Testing Changes
- Retry npm install in CI (#92)
- Update CI config (#90)
- Update CI config (#88)
- Update the CI config (#85)
- chore: update CircleCI config
- chore: ignore package-lock.json (#83)
- chore: update renovate config (#81)
- chore: enable noImplicitThis (#82)
- chore: enable CI and synth script (#77)

## v0.12.0

### Implemenation Changes
BREAKING CHANGE:
- chore: drop support for node.js 4 (#75)

### Dependencies
- chore(deps): update dependency gts to ^0.8.0 (#71)
- fix(deps): update dependency configstore to v4 (#72)
- chore(deps): update dependency typescript to v3 (#74)

### Internal / Testing Changes
- chore: make it OSPO compliant (#73)
- fix: quarantine axios types (#70)
