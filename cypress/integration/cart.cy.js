/// <reference types="cypress" />

describe('Cart tests - add/remove and badge count', () => {
    beforeEach(() => {
      // Visit homepage before each test
      cy.visit('/')
      cy.viewport(1280, 800)
    })
  
    it('adds a product to cart (UI) and verifies mini-cart badge', () => {
      // Add Argus All-Weather Tank via UI
      cy.contains('a.product-item-link', 'Argus All-Weather Tank')
        .first()
        .closest('.product-item')
        .find('button.action.tocart.primary')
        .first()
        .click()
  
      // Open mini-cart and check badge
      cy.get('a.action.showcart').first().click()
      cy.get('span.counter-number').first()
        .invoke('text')
        .then(text => expect(parseInt(text.replace(/\D/g, ''), 10)).to.be.greaterThan(0))
  
      cy.screenshot('cart-add-ui-success')
    })
  
    it('adds a product using stubbed API and verifies badge', () => {
      // Stub GET cart to initially empty
      cy.intercept('GET', '**/V1/carts/**', { fixture: 'cart-empty.json' }).as('getCartEmpty')
  
      // Stub POST add-to-cart
      cy.intercept('POST', '**/V1/carts*/items', req => {
        req.reply({ statusCode: 200, body: { item_id: 1003, sku: 'ARGUS-TANK-01', qty: 1 } })
      }).as('postAddItem')
  
      // Stub GET cart after adding item
      cy.intercept('GET', '**/V1/carts/**', { fixture: 'cart-after-add.json' }).as('getCartAfterAdd')
  
      // Add product via UI
      cy.contains('a.product-item-link', 'Argus All-Weather Tank')
        .first()
        .closest('.product-item')
        .find('button.action.tocart.primary')
        .first()
        .click()
  
      // Wait for stubbed requests
      cy.wait('@postAddItem')
      cy.wait('@getCartAfterAdd')
  
      // Open mini-cart and verify badge
      cy.get('a.action.showcart').first().click()
      cy.get('span.counter-number').first().should('contain', '1')
  
      cy.screenshot('cart-add-stubbed-success')
    })
})