// ***********************************************************
// This example support/index.js is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

import { Utils } from "cypress/utils/utils";

// When a command from ./commands is ready to use, import with `import './commands'` syntax
// import './commands';
beforeEach(() => {
    cy.intercept("GET", "/api/items").as(Utils.getItemsRequestAlias);
    cy.intercept("DELETE", "/api/items/*").as(Utils.deleteItemRequestAlias);
})