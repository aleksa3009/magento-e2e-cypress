/// <reference types="cypress" />

describe('Registered User Checkout Flow', () => {
    beforeEach(() => {
      cy.visit('/')
      cy.viewport(1280, 800)
    })
  
    it('should login, add product and proceed to payment screen with prefilled info', () => {
      // Login (koristi komandu iz Day 1)
      cy.login('roni_cost@example.com', 'Test1234!') // ili svoju funkciju/custom command
  
      // Add a product to cart (Gray Hoodie)
      cy.contains('a.product-item-link', 'Gray Hoodie')
        .first()
        .closest('.product-item')
        .find('button.action.tocart.primary')
        .first()
        .click()
  
      // Open mini-cart and click Proceed to Checkout
      cy.get('a.action.showcart').first().click()
      cy.contains('button', 'Proceed to Checkout').click()
  
      // Assert shipping info prefilled
      cy.get('#customer-email').should('have.value', 'roni_cost@example.com')
      cy.get('#firstname').should('not.have.value', '')
      cy.get('#lastname').should('not.have.value', '')
      cy.get('#street_1').should('not.have.value', '')
      cy.get('#city').should('not.have.value', '')
      cy.get('#postcode').should('not.have.value', '')
      cy.get('#telephone').should('not.have.value', '')
  
      // Continue to shipping method
      cy.get('[data-role="opc-continue"]').click()
  
      // Select first shipping method
      cy.get('input[name="shipping_method"]').first().check({ force: true })
      cy.get('[data-role="opc-continue"]').click()
  
      // Assert that payment screen is visible
      cy.get('#checkout-payment-method-load').should('be.visible')
  
      cy.screenshot('checkout-registered-payment-screen')
    })
})  