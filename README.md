#React Most Wanted

## Table of Contents

- [Description](#description)
- [Features](#features)
- [Folder Structure](#folder-structure)
- [Libraries](#libraries)
  - [react and redux](#react and redux)
  - [create-react-app](#create-react-app)
  - [material-ui](#material-ui)
- [Supported Language Features and Polyfills](#supported-language-features-and-polyfills)
- [Syntax Highlighting in the Editor](#syntax-highlighting-in-the-editor)





## Description

This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).

It should be a `shell` for my further applications with the minimum features I would like them to have. Because of that it should be as simple as possible but with no regrets for the feature implementation.


## Features

`React Most Wanted` is a "base project", "starter kit", "boilerplate" (call it however you want) project with my **personal** "Most Wanted" features:
* *easy to maintain*
* *PWA* - has Progressive Web App features
* *responsive* - included with PWA
* *material-ui*
* *theming*
* *internationalization*

All these features can be programmed from scratch. But why should you do this to you? Out there are so mutch greate developers creating greate application, libraries and tools to help them and you to develop fast and easy. This should also be a small part from my side to help other make they'r starting with react much easier. If all that is true why did I create this project? There must be already a starter kit for react applications! Well, there are lots of them but unfortunaly non of them was as I would like it to be. Some don't have enough fatures to just start and some are have so many that I had to delete features I don't need. I want to create a starting point that has, as said before, my **personal** "Most Wanted" features. If someone likes it, greate :)

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

### react and redux

You want to make a web application and use only `react` without any library to manage the state. Hmm... well, I won't say thats madness but... ;) It is possible but you can also go without shoes to work. I'll stay with my confortable `redux` "shoes". There are also other libraries but I think that `redux` is one of the best and if you know that you are building a application that will get bigger and bigger `redux` should be your choise.

Yes, you will need to write more code but there are much more pros than cons! There are lots of discussions on witch library is the best to use with `react` even if you should use `react` or some other project like [preact](https://github.com/developit/preact), [inferno](https://github.com/infernojs/inferno) and a very loooong etc....

My private favorits are `react` and `redux` because I can shurely say that they are not some hiped projects that will die in a couple of months or years. 'react' is maintained by Facebook so I can be shure that lots of greate developers will take care of witch path the library will go.


### create-react-app

The project should be easy to update in long term. That brings me to the first used and base library `create-react-app`. I will not explain how to use it. There is enough [documentation](https://github.com/facebookincubator/create-react-app/blob/master/packages/react-scripts/template/README.md) on that. But I would like to explain why I use it:
* maintained by Facebook
* it is very easy to use
* it will take care of the nasty environment configuration
* it can be updated to the latest version without any or small changes to your application and
* if you feel strangled by the configs and setup you can `eyect` and leave the prepared path and go your own way.

There is a large team from Facebook taking care that everithing is up to date witch makes me more confortable using this tool than any other there. And there are others! My second favorite would be [nwb](https://github.com/insin/nwb). I havend made applications with it but for making standalone react or react-redux components it is just fantastic.


### material-ui

Because I make most of the time web applications and not "just" web pages and because I'm not a designer there is only one solution that I could use for design and that is Googles Material-UI design patterns. And ofcourse there is a greate react library that we can use for that [material-ui](https://github.com/callemall/material-ui). It has most of the parts you would need for a Material-UI designed application. It comes with a greate feature that we can use in our application and that is `theming` or "customatisation" how they call it in they'r [documentation](http://www.material-ui.com/#/get-started/required-knowledge).

This application uses 100% `material-ui`! There are no other libraries for styling. But there are other libraries that rely on `material-ui`. We will explain them in the further text.

The team around `material-ui` is working in the `@next` branch on a greate new version with lots of modifications and new features and components like `Layouts`. For now it isn't stable so we will stick with the current stable version untill the `@next` brantch is satable enough.





The next feature, or in this case "fatures", would be [PWA](https://developers.google.com/web/progressive-web-apps/) (Progressive Web App) capability. It's not just about making the application work offline. There are lots of other requirements that your application should have without having just PWA in mind. The PWA [checklist](https://developers.google.com/web/progressive-web-apps/checklist) is a great overview of all of them. There is also a greate Chrome plugin [Lighthouse](https://chrome.google.com/webstore/detail/lighthouse/blipmdconlkpinefehnmjammfjpmpbjk) that alowes you to check all aspects of PWA for your application in detail.

One feature that is already in the PWA can be threated seperately. It's the `responsive` feature. I don't have any statistic or some other data but I know one thing: "If I open a web page with my phone this days and it doesn't adopt to my screen size I just leave that **old** thing". For me personaly this is one of the main features that every page that want's to be used in the mobile world, and we all are mobile, should have. There are lots of ways to make your app responsive. Some are using bootstrap with react
