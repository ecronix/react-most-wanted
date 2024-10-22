# RMW Packages

### How to develop

To start developing any of the three `base-shell`, `material-ui-shell` or `rmw-shell` packages, you can go to any of the package directories and run:

```
npm run dev
```

You can then work on the `src/` folder or the `create-[package]-shell/template` folder to make changes. The `src/` folder contains the package logic, and the `template/` contains an App website to be displayed in the browser.

The `template` folder is also used for creating templates that are used to bootstrap new projects, like `npm create @ecronix/base-shell@latest`.

### Building and publishing the project

You can build a single package by running `npm run build`, update the version in the `package.json` file, and then publish it to npm by running `npm publish`.

But you should do this using Lerna, which will update the version of all packages, build them, and publish them to npm. To do this, run:

```
npx lerna version --since master
npx lerna run build --since master
npx lerna publish from-package
```

Usually these commands are run by the CI/CD pipeline, but you can run them locally if you want to test them.

#### Notes

- The `--since master` flag is used to only update the packages that have changed since the last commit on the `master` branch.

- When running `npx lerna publish from-package`, **DO NOT** commit the changes to the `package.json` files where the `gitHead` section is added. Remove all these changes by running:

```
git checkout -- .
```

### Testing templates

To test how the template is used in a new project, you can run:

```
npx create @ecronix/[package]-shell@latest
```

Do not do this if you want to change the visual appearance of the template. Instead, you should work on the `packages/[package]` folder directly as described in the first section.
