# ‌‌ [![LOGO][logo-image]][logo-url] React Most Wanted
[![Build Status][travis-image]][travis-url]
[![Dependency Status][daviddm-image]][daviddm-url]
[![License][license-image]][license-url]
[![Code Coverage][coverage-image]][coverage-url]
[![Code Style][code-style-image]][code-style-url]

This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).

It should be a `shell` for my further applications with the minimum features I would like them to have. Because of that it should be as simple as possible but with no regrets for the feature implementation.

You can find a example of this project in this [DEMO](https://www.react-most-wanted.com/).

I tried to make the project as clean as possible and to use all libraries in they're pure way.

## Table of Contents

- [Features](#features)
- [Folder Structure](#folder-structure)
- [Usage](#usage)
  - [Simple run](#simple-run)
  - [Reuse for own project](#reuse-for-own-project)
- [Customatisation](#customatisation)
  - [Internationalization](#internationalization)
  - [Theming](#theming)
  - [Firebase lists](#firebase-lists)
  - [Drawer width](#drawer-width)
  - [Authorisation](#authorisation)
- [TO DO](#to-do)
- [License](#license)
- [Logo](#logo)


## Features

`React Most Wanted` is a "base project", "starter kit", "boilerplate" (call it however you want) project with my **personal** "Most Wanted" features:
* **easy to maintain**
* ***PWA** - has Progressive Web App features
* **responsive** - included with PWA
* **material-ui**
* **routing**
* **theming**
* **forms** - with realtime sync of untouched fields
* **internationalization**
* **authentication**
* **authorisation**
* **CI** and **CD**

All these features can be programmed from scratch. But why should you do this? Out there are so mutch greate developers creating greate applications, libraries and tools to help them and you to develop fast and easy. This should also be a small part from my side to help other make they'r starting with react much easier.

If all that is true why did I create this project? There must be already a starter kit for react applications! Well, there are lots of them but unfortunaly non of them was as I would like it to be. Some don't have enough fatures to just start and some are have so many that I had to delete features I don't need. I want to create a starting point that has, as said before, my **personal** "Most Wanted" features. If someone likes it, greate :)

There are also other cool features:
* **realtime database**
* **realtime forms**
* **messaging/notifications** - every loged user that approved messaging on login will recieve notifications for new tasks created
* **full authentication** - with google, facebook, twitter, github, email and **phone**
* **online and last time offline state for users**
* **file uploads to the firebase storage**


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
    components/
    containers/
    firebase/
    utils/
    locales/
    store/
      index.js
      reducers.js
    themes/
    config.js
    index.js
```

All application parts and code should be stored in the `src` folder.

All `react` components shold be seperated in presentational and container compnents. This greate [article](https://www.fullstackreact.com/p/using-presentational-and-container-components-with-redux/) is describing it why and how. For that purpose we have the `components` and `containers` folders.

All `redux` related files are in the `store` folder. You can find more about redux [here](http://redux.js.org/docs/introduction/).

The folders `locales` and `themes` are used to store data for different locales and themes.

## Usage

### Simple run


To just run the project on you won device you should have installed: git, node and npm. Let's asume that this is the case.

Now in your concole go to the destionation where you want to save the project and run this command:

```js
git clone https://github.com/TarikHuber/react-most-wanted
```

or

```js
git clone https://github.com/TarikHuber/react-most-wanted my_project
```

if you want to save the project into a specific folder (inthis example "my_project"). The folder must be empty!

Now go with the console into the folder. If you havn't provided a name like "my_project" then it will be the default "react-most-wanted".

In he folder run this command to start the develeoplemt mode of the project:

```js
npm run dev
```

For publishing run:

```js
npm run build
```

After it finished folloe the instructions or publish the project build folder to your prefered  provider or own server.

### Reuse for own project

You can eather fork this project or clone it into your own repo. I use the second for new projects. You can find [here](https://help.github.com/articles/duplicating-a-repository/) more information about how to clone/duplicate a repo into your own.

After cloning the repo into your own you should change the configurations like project name and the firebase config. Here is a list of all changes you should make:
* **package.json**  - here you should change the name and version
* **src/config.js**  - here you should change all firebase data and other options
* **public/index.html**  - change the title (it will be overriden but it looks better)
* **public/firebase-messaging-sw.js**  - change the ``messagingSenderId``


After setting up the code we need to deploy our application to firebase. As first create an application biuld with runing `npm run build`.

To use firebase we need to install the firebase tools by running `npm install -g firebase-tools` and after that login to firebase with `firebase login`.

After the login run `fribease init` to setup the firebase project. Override the existing project and select yours from your firebase console.
Override only the '.firebasesrc' file and leave the other as they are because the database and storage rules, functions and firebase settings should stay as they are. If you override them the project would probably not work as it should.

Don't forget to setup the email configs into the firebase functions using `firebase functions:config:set gmail.email="myusername@gmail.com" gmail.password="secretpassword"`.

You should now be able to deploy your application to your firebase using `firebase deploy`.


##Customatisation

### Internationalization

Internationalization is very importand. Even if you use just a single language your application should be prepared for a more of them. It is easy to aply it from beginning than refactoring the whole application afterwads.

The only thing you'll have to do to add a new language is that you have to add the localisationData in the locales [index.js](https://github.com/TarikHuber/react-most-wanted/blob/master/src/locales/index.js) folder like in the code sniped below. Here we add the language fr to the project:

```js

import fr from 'react-intl/locale-data/fr';
import fr_messages from './fr';

//... other code

const locales = [
  {
    locale: 'en',
    messages: en_messages,
    data: en
  },
  {
    locale: 'de',
    messages: de_messages,
    data: de
  },
  {
    locale: 'bs',
    messages: bs_messages,
    data: bs
  },
  {
    locale: 'fr',
    messages: fr_messages,
    data: fr
  },

]

```

We also need to create a file 'fr.js' into the 'locales' fodler. I would recommend to juts copy the 'en.js' file and to translate the strings.

To add more translated strings just add them to every language file you have in the 'locales' folder.

### Theming

To change or to add a new theme you would habe to add or edit a theme file into the 'themes' folder and a reference to it into the 'index.js' file.

FOr example we crate a file 'my_theme.js' and change the 'index.j' file like below. You can use the 'ics_theme' as bootstrapp for new projects or get a new one from the offical 'material-ui' documentation.

```js

import ics_theme from './ics_theme';
import my_theme from './my_theme';

const themes= [
  {
    id: 'light',
    source: lightBaseTheme,
  },
  {
    id: 'dark',
    source: darkBaseTheme,
  },
  {
    id: 'ics',
    source: ics_theme,
  },
  {
    id: 'my_theme',
    source: my_theme,
  },
];

```

### Firebase lists

To add a new list that is synced with firebase there are more steps to do.
First of all ist to crete a component that will represent the list. You can use the 'Tasks.js' component as example.

In that you should change folowing code parts to make it work:

```js
//....code before
const actions = new ListActions('your_list').createActions();
//....code after

```

And in the folder 'store' you should add the generated reducers into the 'reducers.js' file, like this

```js
//....code before
const reducers = combineReducers({
  browser: responsiveStateReducer,
  responsiveDrawer,
  form: formReducer,
  auth,
  connection,
  dialogs,
  messaging,
  locale,
  theme,
  tasks: getListReducers('public_tasks'),
  companies: getListReducers('companies'),
  your_list: getListReducers('your_list'), //your new list
  users: getListReducers('users')
})
//....code after

```

That is all you have to do to add a new list. It is up to you how the lists will be presented. Just don't forget to leave into the mounting and unmounting part of you component following code parts:

```js
//....code before
componentDidMount() {
  const {initialiseList}=this.props;
  initialiseList();
}

componentWillUnmount() {
  const {unsubscribeList}=this.props;
  unsubscribeList();
}
//....code after

```

They are initialising the list and unsubscribing from it if we leave the component. You can add other code to those functions or move thos calls on other places of your component life cycle if you wish.

### Drawer width

To change the drawer (left menu) width go to the 'config.js' file and change the value of  'drawer_width' :)

### Authorisation

Authentication and authorisation are not the same thing! With authentication we identify who we have as user and with athorisation we identify what that user can do in our application. In this project authorisation is managed over `grants` and `roles`. Every grant gives the user the authorisation to do a specific action (read, create, edit or delete) in the database. Roles are defining a group of grants you can give a user. They are just for managing large number of grants easely. Every grant can still be managed seperately.

Only administrators have access to add or remove grants and roles to a user. Only administrators can make other users to administrators.

**WARNING:** In this demo the rules are manipulated that everyone can make other users to admins and even himselfe. So everyone can see how it works. In production there should be made a change in the database.rules file.

From:

```js
"admins":{
  ".read": "auth != null",
  "$uid":{
    ".write": "auth != null || root.child('admins/'+auth.uid).exists()"
  }
},

```

To:

```js
"admins":{
  ".read": "auth != null",
  "$uid":{
    ".write": "auth != null && root.child('admins/'+auth.uid).exists()"
  }
},

```



## TO DO

- [X] implement all or most firebase functionalities
- [ ] finish tests
- [X] implement [redux-offline](https://github.com/jevakallio/redux-offline) with examples
- [ ] update to material-ui@next

## License

MIT

## Logo

Thanks to @SiradDev for creating the logo for this project :)

[logo-image]: public/favicon-32x32.png
[logo-url]: https://github.com/TarikHuber/react-most-wanted/blob/master/README.md
[travis-image]: https://travis-ci.org/TarikHuber/react-most-wanted.svg?branch=master
[travis-url]: https://travis-ci.org/TarikHuber/react-most-wanted
[daviddm-image]: https://img.shields.io/david/TarikHuber/react-most-wanted.svg?style=flat-square
[daviddm-url]: https://david-dm.org/TarikHuber/react-most-wanted
[coverage-image]: https://img.shields.io/codecov/c/github/TarikHuber/react-most-wanted.svg?style=flat-square
[coverage-url]: https://codecov.io/gh/TarikHuber/react-most-wanted
[license-image]: https://img.shields.io/npm/l/express.svg
[license-url]: https://github.com/TarikHuber/react-most-wanted/master/LICENSE
[code-style-image]: https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat-square
[code-style-url]: http://standardjs.com/
