// cypress/support/commands.js
import 'cypress-axe'
import '@cypress/code-coverage/support'
import { faker } from '@faker-js/faker'

// Custom command to register a new user dynamically
Cypress.Commands.add('register', () => {
  const user = {
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
    email: `testuser+${Date.now()}@example.com`, // unique email
    password: 'Test1234!'
  }

  cy.visit('/customer/account/create/') // adapt URL if needed
  cy.get('#firstname').type(user.firstName)
  cy.get('#lastname').type(user.lastName)
  cy.get('#email_address').type(user.email)
  cy.get('#password').type(user.password)
  cy.get('#password-confirmation').type(user.password)
  cy.get('button[title="Create an Account"]').click()

  // Wait for UI to stabilize
  cy.wait(2000)

  // Log out to reset state
  cy.get('button[data-action="customer-menu-toggle"]').first().click()
  cy.contains('Sign Out').click()

  return cy.wrap(user) // allow test to access registered user
})
