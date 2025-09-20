/// <reference types="cypress" />

import { faker } from '@faker-js/faker';

describe('Guest Checkout Flow with Faker', () => {
  beforeEach(() => {
    cy.visit('/')
    cy.viewport(1280, 800)
  })

  it('should proceed from cart to payment screen as guest with dynamic info', () => {
    // Generate dynamic guest user data
    const firstname = faker.person.firstName()
    const lastname = faker.person.lastName()
    const email = faker.internet.email({ firstName: firstname, lastName: lastname })
    const address = faker.location.streetAddress()
    const city = faker.location.city()
    const postcode = faker.location.zipCode({ length: 5 })
    const phone = faker.phone.number('06########') // Serbian mobile format
    const country = 'Serbia'

    // Add a product to cart first (Gray Hoodie)
    cy.contains('a.product-item-link', 'Gray Hoodie')
      .first()
      .closest('.product-item')
      .find('button.action.tocart.primary')
      .first()
      .click()

    // Open mini-cart and click Proceed to Checkout
    cy.get('a.action.showcart').first().click()
    cy.contains('button', 'Proceed to Checkout').click()

    // Fill in shipping info dynamically
    cy.get('#customer-email').clear().type(email)
    cy.get('#firstname').clear().type(firstname)
    cy.get('#lastname').clear().type(lastname)
    cy.get('#street_1').clear().type(address)
    cy.get('#city').clear().type(city)
    cy.get('#postcode').clear().type(postcode)
    cy.get('#telephone').clear().type(phone)
    cy.get('#country').select(country)

    // Continue to shipping method
    cy.get('[data-role="opc-continue"]').click()

    // Select first shipping method
    cy.get('input[name="shipping_method"]').first().check({ force: true })
    cy.get('[data-role="opc-continue"]').click()

    // Assert that payment screen is visible
    cy.get('#checkout-payment-method-load').should('be.visible')

    cy.screenshot('checkout-guest-payment-screen-faker')
  })
})