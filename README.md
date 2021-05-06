# UN Disaster Risk Reduction Scorecard Documentation v1.0

## Introduction

---

### Developers:

- [Jacob Curtis](https://github.com/nnazo)
- [Jose Carlos Acosta](https://github.com/Josekeitor)
- [Peiyang Chang](https://github.com/peiyang-chang)
- [Leighton Glim](https://github.com/leightonglim)

### Advisors:

- Dr. Matthew Fendt
- Dr. Pablo Rivas
- Dr. Benjamin Ryan

This app is being developed in an effort to improve collaboration and discussion as well as data visualization when compared to the existing UN Scorecard website.

## Setup

---

This app was bootstraped with [Expo](https://expo.io), using the React Navigation Template with [TypeScript](https://www.typescriptlang.org).

- Start PostgreSQL with the user specified in the `config.py` file and run the `up.sql` file in your psql shell. These files are found in the API repository.
- Run the [Python API](https://github.com/mwfendt/UN_Scorecard) on your local machine.
- Run the [Visualization Web App](https://github.com/CSI3374-SPM/un-scorecard-visualization) on your local machine with `yarn install` and then `yarn dev`
- Run `yarn install` to install the depencies required to run the scripts mentioned below.

## Table of Contents
* UN Disaster Risk Reduction Scorecard Documentation v1.0
    * Introduction
    * Setup
    * Table of Contents
    * Available Scripts
        * `yarn start [--android | --ios | --web]`
        * `yarn android`
        * `yarn ios`
        * `yarn web`
        * `yarn eject`
        * `yarn jest`
        * `yarn jest:watch`
    * Writing and Running Tests
    * Environment
    * Sharing and Deployment
        * Publishing to Expo's React Native Community
    * Troubleshooting
        * Networking
        * iOS Simulator won't open
        * QR Code does not scan
    * Continued Support

### Available scripts:

- `yarn start [--android | --ios | --web]`
Runs the application. Open it in the Expo app to view it.
- `yarn android`
Similar to `yarn  start` but attempts to open in an Android simulator.
- `yarn ios`
Similar to `yarn  start` but attempts to open in an iOS simulator.
- `yarn web`
Similar to `yarn  start` but attempts to open as a web application on a browser.
- `yarn eject`
Ejects from the build scripts of React Native.
Warning: Ejection is permanent.
- `yarn jest`
Runs application's tests.
- `yarn jest:watch`
Similar to `yarn jest` but allows you to watch files for changes related to tests.

### Writing and Running Tests:
This application uses `jest` for its tests. Test files are created in the ```__test__``` directory in order to be loaded and used by `jest`.

### Environment:

- Copy the `.env.example` file to a `.env` file in the same directory (the root of the project)
  - `cp .env.example .env`

The following environment variables can be modified:

- `GRAPH_URL` which indicates the URL of the web application that shows a web view of a survey's radar graph.

### Communicating with the API
Make sure to update the API url string inside of `api/Wrapper.ts`. This could also be moved to an environment variable, but hasn't as of yet.

### Sharing and Deployment
##### Publishing to Expo's React Native Community:
Expo allows for hosting of React native applications. It is published by using Expo's publish command line prompt:
```expo publish```

### Troubleshooting:
#### Networking:
For the application to load on your phone, your computer and phone need to be on the same network so that they can communicate. If they are and there are still connectivity issues, restart the packager.
#### iOS Simulator won't open:
1. Make sure Xcode is installed from the Mac App Store
2. Ensure command line tools are installed for Xcode (Preferences -> Locations -> Command Line Tools)
3. Re-run `yarn run ios`
4. If the simulator still doesn't work, open the Simulator and select 'Reset Contents'. Then re-run `yarn run ios`
#### QR Code does not scan:
If the QR code does not scan, ensure your phone's camer is focusing on the QR code correctly and that it could easily distinguish between the two colors of the code.

### Continued Support:
As the application is updated, this documentation will continue to be updated. Please check back for any future updates.
