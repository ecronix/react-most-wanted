# ‌‌ [![LOGO](public/icons/icon_32x32.png)](https://github.com/TarikHuber/react-most-wanted/master/LICENSE) React Most Wanted [![Build Status](https://travis-ci.org/TarikHuber/react-most-wanted.svg?branch=master)](https://travis-ci.org/TarikHuber/react-most-wanted) [![LICENCE](https://img.shields.io/npm/l/express.svg)](https://github.com/TarikHuber/react-most-wanted/master/LICENSE) 

This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).

It should be a `shell` for my further applications with the minimum features I would like them to have. Because of that it should be as simple as possible but with no regrets for the feature implementation.

You can find a example of this project in this [DEMO](https://react-most-wanted.firebaseapp.com/).

I tried to make the project as clean as possible and to use all libraries in they're pure way.

## Table of Contents

- [Features](#features)
- [Folder Structure](#folder-structure)
- [Libraries](#libraries)
  - [react and redux](#react-and-redux)
  - [create-react-app](#create-react-app)
  - [material-ui](#material-ui)
  - [react-router-redux](#react-router-redux)
  - [react-intl](#react-intl)
  - [redux-persist](#redux-persist)
  - [material-ui-responsive-drawer](#material-ui-responsive-drawer)
  - [material-ui-selectable-menu-list](#material-ui-selectable-menu-list)
  - [redux-logger](#redux-logger)
  - [sw-precache](#sw-precache)
- [TO DO](#to-do)
- [License](#license)


## Features

`React Most Wanted` is a "base project", "starter kit", "boilerplate" (call it however you want) project with my **personal** "Most Wanted" features:
* *easy to maintain*
* *PWA* - has Progressive Web App features
* *responsive* - included with PWA
* *material-ui*
* *routing*
* *theming*
* *internationalization*

All these features can be programmed from scratch. But why should you do this? Out there are so mutch greate developers creating greate applications, libraries and tools to help them and you to develop fast and easy. This should also be a small part from my side to help other make they'r starting with react much easier.

If all that is true why did I create this project? There must be already a starter kit for react applications! Well, there are lots of them but unfortunaly non of them was as I would like it to be. Some don't have enough fatures to just start and some are have so many that I had to delete features I don't need. I want to create a starting point that has, as said before, my **personal** "Most Wanted" features. If someone likes it, greate :)

The further text explains witch libraries/modules are used and why. Some of them are installed and used in they're `pure` way as in documentation described so in that cases we will just show the link to the official documentation to awoid outdated descriptions of the usage.

## Folder Structure

The project has following folder structure:

```
react-most-wanted/
  .gitignore
  README.md
  node_modules/
  package.json
  sw-precache-config.js
  public/
    icons/
    index.html
    favicon.ico
    manifest.json
  src/
    actions/
    components/
    containers/
    helpers/
    locales/
    reducers/
    store/
    themes/
    index.css
    index.js
```

All application parts and code should be stored in the `src` folder.

All `react` components shold be seperated in presentational and container compnents. This greate [article](https://www.fullstackreact.com/p/using-presentational-and-container-components-with-redux/) is describing it why and how. For that purpose we have the `components` and `containers` folders.

Because we are using `redux` there are the `actions` and `reducers` folders. You can find more about redux [here](http://redux.js.org/docs/introduction/).

We have a `store` folder in witch we can seperate the `dev` and `prod` store. It is just for future preparation. We still have in this project a single store file.

The folders `locales` and `themes` are used to store data for different locales and themes.


## Libraries

### React and Redux

You want to make a web application and use only `react` without any library to manage the state. Hmm... well, I won't say thats madness but... ;) It is possible but you can also go without shoes to work. I'll stay with my confortable `redux` "shoes". There are also other libraries but I think that `redux` is one of the best and if you know that you are building a application that will get bigger and bigger `redux` should be your choise.

Yes, you will need to write more code but there are much more pros than cons! There are lots of discussions on witch library is the best to use with `react` even if you should use `react` or some other project like [preact](https://github.com/developit/preact), [inferno](https://github.com/infernojs/inferno) and a very loooong etc....

My private favorits are `react` and `redux` because I can shurely say that they are not some hiped projects that will die in a couple of months or years. `react` is maintained by Facebook so I can be shure that lots of greate developers will take care of witch path the library will go.


### create-react-app

The project should be easy to update in long term. That brings me to the first used and base library `create-react-app`. I will not explain how to use it. There is enough [documentation](https://github.com/facebookincubator/create-react-app/blob/master/packages/react-scripts/template/README.md) on that. But I would like to explain why I use it:
* maintained by Facebook
* it is very easy to use
* it will take care of the nasty environment configuration
* it can be updated to the latest version without any or small changes to your application and
* if you feel strangled by the configs and setup you can `eyect` and leave the prepared path and go your own way.

There is a large team from Facebook taking care that everything is up to date witch makes me more confortable using this tool than any other there. And there are others! My second favorite would be [nwb](https://github.com/insin/nwb). I havend made applications with it but for making standalone react or react-redux components it is just fantastic.


### material-ui

Because I make most of the time web applications and not "just" web pages and because I'm not a designer there is only one solution that I could use for design and that is Googles Material-UI design patterns. And ofcourse there is a greate react library that we can use for that: [material-ui](https://github.com/callemall/material-ui).

It has most of the parts you would need for a Material-UI designed application. It comes with a greate feature that we can use in our application and that is `theming` or "customatisation" how they call it in they'r [documentation](http://www.material-ui.com/#/get-started/required-knowledge).

This application uses 100% `material-ui`! There are no other libraries for styling. But there are other libraries that rely on `material-ui`. We will explain them in the further text.

The team around `material-ui` is working in the `@next` branch on a greate new version with lots of modifications and new features and components like `Layouts`. For now it isn't stable so we will stick with the current stable version untill the `@next` brantch is satable enough.

This library gives use all we need for theming our application. All you have to do is to provide some theme in the `themes` folder and update the `index.js` file in the `themes` folder. After that your theme should be visible and ready to use. Just watch how it is done with the `ics_theme`.

### react-router-redux

Every application would need some kind of routing. I desided to use `react-router` in this project and to use the new version 4 for witch the `react-router-redux` is unfortunaly only in alpha state. But the main features are working in the alpha so I desided to use it even it is not released in stable version. Why should I do this when there is the older versio of `react-router` and the stable version of `react-router-redux`. At first it was the old version and when I wanted to try the new one there where so drastical changes that I had to change the complete routing code. The whole concept is different in the version 4. Because of that we are using here the newer version to be prepared for the future.

The main difference is that every `Route` is now a real react component that renders its childs:
Example in the [Routes.js](https://github.com/TarikHuber/react-most-wanted/blob/master/src/components/Routes/Routes.js) folder.
```js

<Switch>
  <Route path="/" exact component={Dashboard} />
  <Route path="/dashboard" exact component={Dashboard} />
  <Route path="/about" exact component={About} />
  <Route path="/*" component={PageNotFound} />
</Switch>

```

### react-helmet

This library allows us to change the HTML meta data during runtime. With this one we change the title in our application on page change. In the `App.js`, one of the root elements of the project, we use it to change the `theme-color` of our application witch gives a greate user expiriences when changing the application theme.

### react-intl

Internationalization is very importand. Even if you use just a single language your application should be prepared for a more of them. It is easy to aply it from beginning than refactoring the whole application afterwads. `react-intl` has also a huge maintainer Yahoo. It is one of the larges or maby the larges Internationalization library for react so I desided to use it for our application.

There is also a redux project that should make the usage with redux easier but it has a modified `Provider` and I'm not confortable with it to put my application `Provider` in hands of a external library than `react-redux`. Because of that I implemented a simple solution that is very similar to the `theming` solution. You just have to provide the locales in the `locales` folder and to update the `index.js` file in it. Just follow the `de` example.

The only thing you'll have to do more than by the `theming` feature is that you have to add the localisationData in the [Root.js](https://github.com/TarikHuber/react-most-wanted/blob/master/src/components/Root/Root.js) folder:

```js

import {addLocaleData} from 'react-intl';
import en from 'react-intl/locale-data/en';
import de from 'react-intl/locale-data/de';

addLocaleData([...en, ...de]);

```

For example after adding the `fr` locale it would look like this:

```js

import {addLocaleData} from 'react-intl';
import en from 'react-intl/locale-data/en';
import de from 'react-intl/locale-data/de';
import fr from 'react-intl/locale-data/fr';

addLocaleData([...en, ...de, ...fr]);

```

### redux-persist

It allows us to save the state to the `localStoreage` or another storage and to rehidrate it on full oage reload or page visit after longer time. It allows us to load the full store even if the client is offline witch is one of the requirements for Pgrogressive Web Apps.


### material-ui-responsive-drawer

This library helps us to make the main `Drawer` menu responsible and even to enable or disable the responsive behavior in runtime. It uses the libraries `material-ui` and `redux-responsive`. You can find more about this library [here](https://github.com/TarikHuber/material-ui-responsive-drawer).

I hope that the `@next` branch of `material-ui` has some features that allow us to make the `Drawer` responsible without such libraries.


### material-ui-selectable-menu-list

This is also a library that should make our life easier. It also uses `material-ui` as peer dependency. It allows us to send to a single component an array of menu items we would like to have in it and the component renders all of them. You can find more about it [here](https://github.com/TarikHuber/material-ui-selectable-menu-list).


### redux-logger

We use the simple `redux-logger` dev library to see how the redux state changes during application usage.

### sw-precache

Is also a dev library that helps us to create a service worker during build proccess. The service worker then allows the user to open our application even if he has no connection. Because the implementation is fully used how it is described in [this](https://github.com/jeffposnick/create-react-pwa) project we leave the detaile explanation to them.


## TO DO

- [ ] finish unit tests
- [ ] implement [redux-offline](https://github.com/jevakallio/redux-offline) with examples

## License

MIT
