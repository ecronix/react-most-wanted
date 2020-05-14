# ‌‌ [![LOGO][logo-image]][logo-url] React Most Wanted

[![Build Status][travis-image]][travis-url]
[![Dependency Status][daviddm-image]][daviddm-url]
[![License][license-image]][license-url]
[![Code Style][code-style-image]][code-style-url]

I like `short` README's so here we go :sunglasses:

## Idea and concept

<<<<<<< HEAD
With [Create React App](https://reactjs.org/docs/create-a-new-react-app.html) (CRA) we can start easy with a new react project but we still need to do some tricky parts to make it work. For developers who are starting with react it's not clear what to do next and for the experienced it's anoing to repeat for every project the basic setup and configuration like the routing, intl, auth and other main parts of most applications. The latest CRA versions give us the opportunity to create our own custom templates. Templates are nice but not the solution that solves our problems. We need a tool from witch we can start out very easy and get updates during time for bugfixes and API changes of the dependencies. Sounds like a framework? I don't think that there is a need for a react framework. Everyone can make his project up and running in short time.
=======
With [Create React App](https://reactjs.org/docs/create-a-new-react-app.html) (CRA) we can start easy with a new React project but we still need to do some tricky parts to make it work. For developers who are starting with React it's not clear what to do next and for the experienced it's annoying to repeat for every project the basic setup and configuration like the routing, intl, auth and other main parts of most applications. The latest CRA versions give us the opportunity to create our own custom templates. Templates are nice but not the solution for these identified problems. We need a tool that starts out easily and gets updates over time for bugfixes and API changes of the dependencies. Sounds like a framework? I don't think that there is a need for a React framework. Everyone can make their own project and be running in short time. 
>>>>>>> c7d14ee89315103ed95f3ab1d5b11a73334d067e

This project will provide templates for new projects that can be updated during usage but won't update as frequently as most frameworks. We can start with each project using a simple CLI command. They can be configured with configs and most parts can be replaced with custom ones. To cover most use cases this project has multiple templates:

### [base-shell](./packages/base-shell/)
<<<<<<< HEAD

The basic react setup (routing, intl, async load). It has an optimised `routing` where the initial load page is completely separated from rest of the routing to ensure best performance for applications that need to scale. Simple and easy `intl` based on `react-intl` and async load using the new react `suspense` API. The resulting template is very basic and has not more than basic `html`inside. To start a new project with this template just run this command:
=======
The basic React setup (routing, intl, async load). It has an optimised `routing` where the initial load page is completely separated from rest of the routing to ensure best performance for applications that need to scale. Simple and easy `intl` based on `react-intl` and async load using the new React `suspense` API. The resulting project is basic and has only `html` to start. To start a new project with this template just run this command:
>>>>>>> c7d14ee89315103ed95f3ab1d5b11a73334d067e

```js
npx create-react-app my-app --template base
cd my-app
npm start
```

### [material-ui-shell](./packages/material-ui-shell/)

Includes all features from `base-shell` expanded with [Material-UI](https://material-ui.com). It has some basic pages like `Page not found`, a responsive `menu` and other configurations for `Material-UI`. To start a new project with this template just run this command:

```js
npx create-react-app my-app --template material-ui
cd my-app
npm start
```

### [rmw-shell](./packages/rmw-shell)

[base-shell](./packages/base-shell/) + [material-ui-shell](https://material-ui.com) +
<<<<<<< HEAD

- [Firebase](https://firebase.google.com/) Take your app to the cloud, enabling the possibility to:
  - Real time database updates
=======
- [Firebase](https://firebase.google.com/) Take your app to the cloud, enabling the possibility of:
  - Realtime database updates
>>>>>>> c7d14ee89315103ed95f3ab1d5b11a73334d067e
  - OAuth with the major platforms
  - Monitoring, metrics, reports...
  - CDN as a storage layer for static assets, for Ultra Quick Delivery Anywhere in the World
  - And much more...

Any help here is welcome :smile:

## How to start?

Just run this command:

```js
npx create-react-app my-app --template rmw
cd my-app
npm start
```

If you are using this `npx` command make sure to uninstall `create-react-app` on your device to have the newest version. To do so run:

```js
npm uninstall create-react-app
```

## I rather checkout the DEMO first. Where is it?

Here you go [DEMO](https://www.react-most-wanted.com). The DEMO is just a DEMO. It has no real purpose "to do" some useful stuff. Just to show you what your project could look like.

## What is this?

React Most Wanted is a React Starter Kit based on [Create React App](https://github.com/facebookincubator/create-react-app) and [Material-UI](https://material-ui.com/) that uses [Firebase](https://firebase.google.com/).

## Why should I use it?

Check this out:

- It is built with CRA.  Our Starter Kit is a CRA template and your CRA scripts will work as expected, such as taking all CRA updates. We don't eject anyone from CRA :smile:.
- It is based on our [rmw-shell](packages/rmw-shell) library that keeps your project up to date when we make bugfixes or add new features. It is like a `shell` for your project where the hard work is already done for you.
- There is a simple script to start a fresh project without forking anything `npx create-react-app test-app --scripts-version rmw-react-scripts`.
- It has all "MOST WANTED" features built in (see below). That is where the name comes from! :wink:
- It is customizable.
- It uses Firebase. :smile:
- It is a Best Practice Project for creating a PWA (Progressive Web Application).
- You will love it once you start using it. :smile:

## What are those "Most Wanted" features?

Let's take a look at some of them:

- [Material UI](https://material-ui.com/) Material Design ready-to-use React Components
- [Code splitting](https://webpack.js.org/guides/code-splitting/) MPA (Multiple Page Application) ready. Large codebases can be splitted into separate bundles that load different parts of the application, lazy-loading the different bundles on demand.
- [Redux](https://redux.js.org/) predictable state management, by enforcing a strict unidirectional data flow and state immutability.
- **Firebase to Redux sync**: sync your state automatically to the cloud using firebase.
- **Authentication**: User login / registration built in.
- **Authorization** Roles and permissions built in.
- **Push notifications UI integration**
- **Theming**
- **Internationalisation**
- **Built-in CI (Continuous Integration)**
- **Built-in CD (Continuous Deployment)**
- **Realtime forms** (isn't that awesome :smile:)
- ... and a lot more I just can't remember

# Is there more in depth information about this project?

Sure. It is a project made over years and still fully supported. Reason for that is that we use it in our company for production projects so it has to work for at least some years. Good enough for the JavaScript ecosystem :wink:.

The information you are seeking is scattered over some Medium articles written by me at the time I was working on solving some problems in this project. So they should explain some core parts in detail:.

- [Beyond create-react-app](https://codeburst.io/beyond-create-react-app-cra-a2063196a124)
- [Organising your Firebase Cloud Functions](https://codeburst.io/organizing-your-firebase-cloud-functions-67dc17b3b0da)
- [Firekit concepts to sync Firebase and Redux](https://codeburst.io/firekit-concepts-to-sync-firebase-and-redux-606a1e3e50d6)
- [Firebase and react Continuous Deployment](https://codeburst.io/firebase-and-react-continuous-deployment-2e6d81f0b6a1)
- [Redux simple values](https://codeburst.io/redux-simple-values-7712694f311)
- [React Most Wanted](https://medium.com/@tarikhuber/react-most-wanted-d4e916782c2e)

## I have a problem. Where to ask?

It depends on your problem. If you have a question please join our [Gitter room](https://gitter.im/react-most-wanted/Lobby). If you notice an issue in the project don't hesitate to fill out an issue report to this project [here](https://github.com/TarikHuber/react-most-wanted/issues).

## I like this. Can I help somehow?

YEEEEEEES :smile: Everyone is welcome to send PRs and if you don't know where to start just write to me on [twitter](https://twitter.com/TarikHuber). There is always some work to do.

And if you don't have time to code with us show some :blue_heart: and give this project a :star: and tell the :earth_africa: about it.

## There are way too much :smile: in this README. Are you crazy?

YES! :trollface:

## Thanks

[<img src="https://www.browserstack.com/images/mail/browserstack-logo-footer.png" width="120">](https://www.browserstack.com/)

Thank you to [BrowserStack](https://www.browserstack.com/) for providing the infrastructure that allows us to test in real browsers.
Thanks to @SiradDev for creating the logo for this project :smile:.

## TO DO

- [ ] finish tests

## License

MIT

[logo-image]: https://www.react-most-wanted.com/favicon-32x32.png
[logo-url]: https://github.com/TarikHuber/react-most-wanted/blob/master/README.md
[travis-image]: https://travis-ci.org/TarikHuber/react-most-wanted.svg?branch=master
[travis-url]: https://travis-ci.org/TarikHuber/react-most-wanted
[daviddm-image]: https://img.shields.io/david/TarikHuber/react-most-wanted.svg?style=flat-square
[daviddm-url]: https://david-dm.org/TarikHuber/react-most-wanted
[license-image]: https://img.shields.io/npm/l/express.svg
[license-url]: https://github.com/TarikHuber/react-most-wanted/master/LICENSE
[code-style-image]: https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square
[code-style-url]: https://github.com/prettier/prettier
