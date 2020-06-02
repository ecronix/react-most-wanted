# [![LOGO][logo-image]][logo-url]  **React Most Wanted** 
[![Build Status][travis-image]][travis-url] [![License][license-image]][license-url] [![Code Style][code-style-image]][code-style-url]

RMW is a set of features and best practices **that you can choose from** and use around your React projects, built on [Create React App](https://github.com/facebookincubator/create-react-app). You can checkout the demo at [react-most-wanted.com](https://react-most-wanted.com).

The features include:
- **[Material UI](https://material-ui.com/)**: Material Design ready-to-use React Components
- **[Code splitting](https://webpack.js.org/guides/code-splitting/)**: MPA (Multiple Page Application) ready. Large codebases can be splitted into separate bundles that load different parts of the application, lazy-loading the different bundles on demand.
- **[Redux](https://redux.js.org/)**: predictable state management, by enforcing a strict unidirectional data flow and state immutability.
- **[Firebase](https://firebase.google.com)**: use Firebase's platform as backend and database
- **And many more**: Firebase and Redux sync, authentication, authorization (roles and permissions), push notifications UI integration, theming, internationalisation, built-in CI/CD, realtime forms...

To find out more about the features it includes, visit the [documentation page](https://react-most-wanted.com/docs).

## How to start?

To accomodate major use-cases, we have created three different shells that you can choose depending on your needs:  

**[Base shell](./packages/base-shell/)**:
the basic react setup: routing, internationalization and async load.

**[Material UI shell](./packages/material-ui-shell/)**:
includes all features from the base shell expanded with [Material-UI](https://material-ui.com).


**[React Most Wanted shell](./packages/rmw-shell)**:
Base shell + Material UI shell + [Firebase](https://firebase.google.com/)

## Contributing

We appreciate **any** contribution! 

See [Contributing](https://github.com/TarikHuber/react-most-wanted/blob/master/CONTRIBUTING.md) for details.

## Thanks

[<img src="https://www.browserstack.com/images/mail/browserstack-logo-footer.png" width="120">](https://www.browserstack.com/)

Thank you to [BrowserStack](https://www.browserstack.com/) for providing the infrastructure that allows us to test in real browsers.


## Contributing

This project uses [MIT license](https://github.com/TarikHuber/react-most-wanted/blob/master/LICENSE).


[logo-image]: https://www.react-most-wanted.com/favicon-32x32.png
[logo-url]: https://github.com/TarikHuber/react-most-wanted/blob/master/README.md
[travis-image]: https://travis-ci.org/TarikHuber/react-most-wanted.svg?branch=master
[travis-url]: https://travis-ci.org/TarikHuber/react-most-wanted
[license-image]: https://img.shields.io/npm/l/express.svg
[license-url]: https://github.com/TarikHuber/react-most-wanted/master/LICENSE
[code-style-image]: https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square
[code-style-url]: https://github.com/prettier/prettier
