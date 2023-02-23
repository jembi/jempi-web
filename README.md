# Getting Started with JeMPI Web

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

## Deployment

App is deployed using docker and port 3000 is exposed.

### Build the image

Run `./build-image.sh {version}`

e.g. `./build-image.sh 1.0.0`

Version will default to `latest` if none is supplied

### Run regular stack deploy

Run `./deploy-stack.sh`

OR

### Run with [Jembi Platform](https://github.com/jembi/platform)

Run `./get-cli.sh {linux|macos|windows}` to download the relevant `platform` binary

Run `./deploy-platform-local.sh init` to start up the stack

The script can also be run with `up down destroy` to perform the respective action
