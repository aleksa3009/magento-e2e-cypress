/// <reference types="cypress" />

describe('Checkout Negative Scenarios & Edge Cases', () => {
    beforeEach(() => {
      cy.visit('/')
      cy.viewport(1280, 800)
    })
  
    it('shows validation error for invalid postcode', () => {
      // Add product to cart
      cy.contains('a.product-item-link', 'Gray Hoodie')
        .first()
        .closest('.product-item')
        .find('button.action.tocart.primary')
        .first()
        .click()
  
      // Proceed to checkout
      cy.get('a.action.showcart').first().click()
      cy.contains('button', 'Proceed to Checkout').click()
  
      // Fill shipping info with invalid postcode
      cy.get('#customer-email').clear().type('guest@example.com')
      cy.get('#firstname').clear().type('Test')
      cy.get('#lastname').clear().type('User')
      cy.get('#street_1').clear().type('123 Cypress St')
      cy.get('#city').clear().type('Testville')
      cy.get('#postcode').clear().type('ABC') // invalid
      cy.get('#telephone').clear().type('123456789')
      cy.get('#country').select('Serbia')
  
      // Continue to shipping method
      cy.get('[data-role="opc-continue"]').click()
  
      // Assert validation error for postcode
      cy.get('#postcode-error')
        .should('be.visible')
        .and('contain', 'Please enter a valid ZIP/postal code')
  
      cy.screenshot('checkout-invalid-postcode')
    })
  
    it('shows message when trying to checkout with empty cart', () => {
      // Ensure cart is empty
      cy.get('a.action.showcart').first().click()
      cy.get('.empty').should('exist') // empty cart message
  
      // Try to click checkout button (if exists)
      cy.contains('button', 'Proceed to Checkout').click({ force: true })
  
      // Assert proper message
      cy.get('.messages')
        .should('be.visible')
        .and('contain', 'You have no items in your shopping cart.')
  
      cy.screenshot('checkout-empty-cart')
    })
  
    it('updates total when removing item at checkout page', () => {
      // Add product to cart
      cy.contains('a.product-item-link', 'Gray Hoodie')
        .first()
        .closest('.product-item')
        .find('button.action.tocart.primary')
        .first()
        .click()
  
      // Proceed to checkout
      cy.get('a.action.showcart').first().click()
      cy.contains('button', 'Proceed to Checkout').click()
  
      // Remove product at checkout page
      cy.get('.action.delete').first().click()
      cy.get('.action-primary.action-accept').click() // confirm removal
  
      // Assert total updated to 0
      cy.get('.grand.totals .price')
        .should('contain', '0.00')
  
      cy.get('.minicart-wrapper')
        .should('contain', 'You have no items in your shopping cart.')
  
      cy.screenshot('checkout-remove-item-total-update')
    })
})  