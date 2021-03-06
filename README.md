# PraxisFe

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 13.3.1.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the cypress end-to-end tests with the interactive interface.

If you want to run the tests in headless mode, run `ng run praxis-fe:cypress-run`.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.

There are also some shortcuts to quickly get to the most used commands via  `npm`. For more information on the shortcuts, see the `package.json` file in the root of the project, scripts section.

## Backend.

The backend of the application can be found in the repository [praxis-gildedrose](https://github.com/SebMoreno/praxis-gildedrose). For fast infrastructure setup, I recommend reading the [README-VAGRANT.md](https://github.com/SebMoreno/praxis-gildedrose/blob/main/README-VAGRANT.md) file. Be sure to match the [listening port of the frontend](./proxy.config.json) with the one of the backend (click [here](https://github.com/SebMoreno/praxis-gildedrose/blob/main/src/main/resources/application.properties) for standard configuration or [here](https://github.com/SebMoreno/praxis-gildedrose/tree/main/prod) for vagrant configuration).
