# ICS UI

This project is the front-end for the Occupational Medicine Self Scheduler application. 
To use this application you must also set up and run the [ICS API](https://bitbucket.mmm.com/projects/MIS/repos/ics-api/browse). 

## Development server

Run `npm run start` or `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive/pipe/service/class/module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. There is a different build configuration for every environment.
To build the ICS UI for a specific environment, run the corresponding command:

| Environment | Build command |
| ----------- | ------------- |
| Dev         | `ng build --configuration=development`|
| QA          | `ng build --configuration=qa`         |
| Stage       | `ng build --configuration=stage`      |
| Prod        | `ng build --configuration=production` |

Configurations are defined in `angular.json`

Environment files are stored in `src/environments`


## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

*** The ICS UI currently does not have unit tests ***

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).
Before running the tests make sure you are serving the app via `ng serve`.

End-to-end configuration is located in `protractor.conf.js`

End-to-end code is located in `/e2e`. This directory consists of the following:
* `/config` - SQL scripts and test data
* `/e2e-helpers` - reusable end-to-end test methods
* `/tests` - test suites for parts of the application
  * `*.e2e.conf.js` - configuration file for the test suite: loads data when running the suite by itself
  * `*.e2e-spec.ts` - end-to-end test script: contains test cases, actions, and expected results
  * `*.po.ts` - test methods: methods specific to the test suite (optional)


## Further help
This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 1.0.0.

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
