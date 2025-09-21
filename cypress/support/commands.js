// cypress/support/commands.js

import 'cypress-axe'
import '@cypress/code-coverage/support'
import { faker } from '@faker-js/faker'

// Custom command: Accessibility check on current page
Cypress.Commands.add('checkA11yPage', () => {
  cy.injectAxe()
  cy.checkA11y()
})

// Custom command: Register a new user dynamically
Cypress.Commands.add('register', () => {
  const user = {
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
    email: `testuser+${Date.now()}@example.com`, // unique email
    password: 'Test1234!'
  }

  // Go to registration page
  cy.visit('/customer/account/create/') // adapt if URL differs

  // Fill form
  cy.get('#firstname').type(user.firstName)
  cy.get('#lastname').type(user.lastName)
  cy.get('#email_address').type(user.email)
  cy.get('#password').type(user.password)
  cy.get('#password-confirmation').type(user.password)

  // Submit
  cy.get('button[title="Create an Account"]').click()

  // Wait for UI update
  cy.wait(2000)

  // Log out to reset state
  cy.get('button[data-action="customer-menu-toggle"]').first().click()
  cy.contains('Sign Out').click()

  // Return user object so test can use it
  return cy.wrap(user)
})
