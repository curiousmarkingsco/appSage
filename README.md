# app**Sage**
app**Sage** is in preview stages and should not be used in projects where you want to avoid pain.

## Getting started: Non-coders
Go to [app**Sage**.io](https://app.appSage.io/) and start building!

## Getting started: Coders
### 1. Download app**Sage**
```sh
git clone git@github.com:curiousmarkingsco/appSage.git
cd appSage
```

#### 2. Install Node Package Manager
If you don't already have `npm` installed:
1.	Visit the Node.js website.
2.	Download the LTS (Long-Term Support) version, which is recommended for most users.
3.	Run the installer and follow the prompts to complete the installation.
4.	The installation process includes npm automatically.

Veryify the installation:
```sh
node -v
npm -v
```
This should output the versions of Node.js and npm, confirming that they are installed.

Install packages:
```sh
npm install
```

#### 3. Run the localhost servers
Then, get it started up:
```sh
npm run dev
```
This runs both web and Electron services so that you may develop and test both simultaneously.

##### Running individual services

###### Web
```sh
npm run webdev
```

###### Electron (native apps)
```sh
npm run appdev
```

## Package up a release
1. Increment the version number in `package-json` in the root folder of this project.
  * MAJOR for incompatible API changes
  * MINOR for backward-compatible functionality
  * PATCH for backward-compatible bug fixes.
```sh
  npm version [major|minor|patch]
```
2. Run the test suite (which currently does not exist, hey it's an aspirational how-to document)
```sh
  npm test
```
3. Package up the executables for release
(You may need to run `brew install --cask wine-stable` for Linux distribution on a non-Linux machine)
```sh
  npm run package
```
4. Package up the web version for the `docs` folder
```sh
npm run build
```

##### Begin page building
Navigate to: [http://localhost:8080](http://localhost:8080) and make a new page.

## What is app**Sage** and what does it do?
appSage uses vanilla JavaScript to provide designers, developers, and ideally your grandma a way to quickly and easily make a webpage without having to write code. It is intended to be the front-end arm of [macroSage](https://macrosage.io/). If you have ever used Elementor, Divi, or Webflow, you will feel right at home with this application.

## What does app**Sage** *not* do?
As free and open source software, appSage is currently a front-end only application. If you are a developer, it is up to you to decide how to modify appSage in order to integrate with your back-end.

## Who made app**Sage** and why?
appSage is built by [Curious Markings Co.](https://curiousmarkings.com) with our goal to make the software industry more competitive. We aim to do this by providing (for free, whenever possible) tools to make great software value propositions without the traditional barriers that people typically face. In particular:
1. Make building a page faster (reduce time barriers)
2. Make page building accessible to laymens (reduce skill barriers)
3. Make page building easy and fun (reduce emotional barriers)

## Daily Setup

If you find  yourself in a situation where you want to easily clear your localStorage, here's a quick and easy thing to copy/paste to your JS console:

```js
appSageLocalNuke();
```

## Using appSage as an integration

### Make your storage unique
By default, pages created get added to `localStorage` under the name "appSageStorage". To ensure your objects don't get mixed up with appSage or other applications that use appSage, create a global variable called `customAppSageStorage`.

See [`function initializeGlobals()`](https://github.com/curiousmarkingsco/appSage/blob/main/src/app/renderer.js) to see how this works in the code.

For example:
```js
var customAppSageStorage = 'dashSageStorage';
```

## Coming soon / please help!
Search this repository for the text `TODO: `

## Contributing
See: [CONTRIBUTING.md](https://github.com/curiousmarkingsco/appSage/blob/main/CONTRIBUTING.md)
