# Getting started

## Installation

Run this command: `npx create-react-app my-app --template rmw`.

Then enter the created folder with `cd my-app`.

You can now start the application with `npm run start`.

If you get error messages about peer dependencies during installation you can enable the legacy configuration for peer dependencies with this command: `npm config set legacy-peer-deps true`. You can find more about that [here](https://github.com/npm/rfcs/discussions/283)

## Changing Firebase project

To change the Firebase project used in the application we need to go to the file `src/config/config.js`. There we have a `json` object with all configurations for the application. The first one is called `firebase`. There we have separate configuraions for `prod` (production) and `dev` (development). I would always recommend to have two separated Firebase projects. For each of them we copy the firebase configuration from our Firebase Console inside.

If you plan to use the messaging feature don't forget to copy the `publicVapidKey` from your Firebase projetc into the configs.

## Publishing to Firebase

### [Login to Firebase over your CLI](https://firebase.google.com/docs/cli)

### Select Firebase project

Using the command `firebase use --add` select your project and set the alias to `dev`, `prod` or `default`. I like to set all 3. That way you can select with the command `firebase use dev` or `firebase use prod` your Firebase project and publish your code there.

### Prepare functions

To publish this template to your Firebase project we need everything the projects needs. The database rules and routing are already prepared but we need to prepary the Firebase Cloud Functions to. To do so we enter the folder for the functions with `cd functions` and run `npm i` to install all needed dependencies.

After that we need to set some environment configs for our functions with: `firebase functions:config:set gmail.email="Some Email" gmail.password="Password for it"`
You can set here dummy data.

### Build and deploy

Before we can deploy our project we need to run `npm run build`.
After that we can deploy it to Firebase with `firebase deploy`.
