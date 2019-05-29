# Change Log

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

<a name="2.1.1"></a>
## [2.1.1](https://github.com/vivaxy/impression/compare/v2.1.0...v2.1.1) (2019-05-29)


### Bug Fixes

* **npm:** :bug:Fix publish to yarnkng ([ab84289](https://github.com/vivaxy/impression/commit/ab84289))
* **scroll:** :bug:Fix scroll not triggered ([c20e218](https://github.com/vivaxy/impression/commit/c20e218))



<a name="2.1.0"></a>
# [2.1.0](https://github.com/vivaxy/impression/compare/v2.0.0...v2.1.0) (2019-04-26)


### Features

* **scan:** :sparkles:Support scan current state ([6973039](https://github.com/vivaxy/impression/commit/6973039))



<a name="2.0.0"></a>
# [2.0.0](https://github.com/vivaxy/impression/compare/v1.1.3...v2.0.0) (2017-05-31)


### Bug Fixes

* **bundle:** :package:Support IE9 in rollup bundle ([95da4c4](https://github.com/vivaxy/impression/commit/95da4c4))


### build

* **bundle:** :boom:Make rollup bundle support umd ([3819024](https://github.com/vivaxy/impression/commit/3819024))


### Code Refactoring

* **Project:** :boom:Rename `impression.js` to `[@vivaxy](https://github.com/vivaxy)/impression` ([4f57e8a](https://github.com/vivaxy/impression/commit/4f57e8a))


### BREAKING CHANGES

* Project: Rename npm package.
* bundle: Removed `exports.default` and `module.exports` usage in npm package



<a name="1.1.3"></a>
## [1.1.3](https://github.com/vivaxy/impression/compare/v1.1.2...v1.1.3) (2017-04-19)


### Bug Fixes

* **rollup:** :bug:Fix rollup bundle without EventEmitter3 ([b2745c8](https://github.com/vivaxy/impression/commit/b2745c8))



<a name="1.1.2"></a>
## [1.1.2](https://github.com/vivaxy/impression/compare/v1.1.1...v1.1.2) (2017-04-19)



<a name="1.1.1"></a>
## [1.1.1](https://github.com/vivaxy/impression/compare/v1.1.0...v1.1.1) (2017-03-08)


### Bug Fixes

* :bug:Fix default options; Update README.md; Using yarn; Using standard-version; ([253c308](https://github.com/vivaxy/impression/commit/253c308))



# 1.1.0 more APIs, more accuracy when telling impression changed

- added types into callback arguments
- added observers events
- `end` event now triggered by `beforeunload` browser event

# 1.0.1 bugfix

- fixed event callback data

# 1.0.0 first version
