# UN_Scorecard_RN

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

### Available scripts:

- `yarn start [--android | --ios | --web]`
- `yarn android`
- `yarn ios`
- `yarn web`
- `yarn eject`
- `yarn jest`
- `yarn jest:watch`

### Environment

- Copy the `.env.example` file to a `.env` file in the same directory (the root of the project)
  - `cp .env.example .env`

The following environment variables can be modified:

- `GRAPH_URL` which indicates the URL of the web application that shows a web view of a survey's radar graph.
