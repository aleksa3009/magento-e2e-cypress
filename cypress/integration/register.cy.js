/// <reference types="cypress" />

import { faker } from '@faker-js/faker'

describe('Magento 2 Demo - Dynamic Registration and Logout', () => {

  it('Registers a new user with random data and logs out', () => {
    // Generate dynamic user data
    const firstName = faker.person.firstName()
    const lastName = faker.person.lastName()
    const email = `user.${Date.now()}@example.com` // unique email using timestamp
    const password = faker.internet.password(10, true, /[A-Za-z0-9]/) + '!' // ensures complexity

    // Visit the registration page
    cy.visit('https://magento2-demo.magebit.com/customer/account/create/')

    // Fill out the form
    cy.get('#firstname').click().type(firstName)
    cy.get('#lastname').click().type(lastName)
    cy.get('#email_address').click().type(email)
    cy.get('#password').click().type(password)
    cy.get('#password-confirmation').click().type(password)

    // Submit
    cy.get('button[title="Create an Account"]').click()

    // Wait for UI to stabilize
    cy.wait(2500)

    // Open the dropdown menu
    cy.get('button[data-action="customer-menu-toggle"]').first().click()

    // Click Sign Out
    cy.contains('Sign Out').click()

    // Log the credentials to the Cypress console (optional)
    cy.log(`Registered user: ${email} / ${password}`)
  })

})
