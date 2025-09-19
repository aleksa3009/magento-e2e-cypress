/// <reference types="cypress" />

describe('Advanced Cart Tests - remove, update quantity, negative flows', () => {

    beforeEach(() => {
      cy.visit('/')
      cy.viewport(1280, 800)
    })
  
    it('removes an item from cart and verifies badge decrements', () => {
      cy.intercept('GET', '**/V1/carts/**', { fixture: 'cart-with-items.json' }).as('getCartWithItems')
      cy.intercept('DELETE', '**/V1/carts*/items/*', req => req.reply({ statusCode: 200, body: {} })).as('deleteCartItem')
  
      cy.wait('@getCartWithItems')
      cy.get('a.action.showcart').first().click()
      cy.get('a.action.delete').first().click()
      cy.wait('@deleteCartItem')
  
      cy.intercept('GET', '**/V1/carts/**', { fixture: 'cart-after-remove.json' }).as('getCartAfterRemove')
      cy.wait('@getCartAfterRemove')
  
      cy.get('span.counter-number').first().should(($el) => {
        const val = parseInt($el.text().replace(/\D/g, ''), 10)
        expect(val).to.be.lessThan(3)
      })
  
      cy.screenshot('cart-remove-success')
    })
  
    it('updates quantity of an item and verifies totals', () => {
      cy.intercept('GET', '**/V1/carts/**', { fixture: 'cart-with-items.json' }).as('getCartWithItems')
      cy.intercept('PATCH', '**/V1/carts*/items/*', req => req.reply({ statusCode: 200, body: {} })).as('updateCartItem')
  
      cy.wait('@getCartWithItems')
      cy.get('a.action.showcart').first().click()
      cy.get('input.item-qty.cart-item-qty').first().clear().type('3').trigger('change')
      cy.wait('@updateCartItem')
  
      cy.get('span.counter-number').first().should(($el) => {
        const val = parseInt($el.text().replace(/\D/g, ''), 10)
        expect(val).to.be.greaterThan(0)
      })
  
      cy.screenshot('cart-update-quantity-success')
    })
  
    it('shows error for out-of-stock product', () => {
      cy.intercept('POST', '**/V1/carts*/items', {
        statusCode: 409,
        body: { message: 'Product out of stock' }
      }).as('postAddOOS')
  
      cy.get('button[title="Add to Cart"]').first().click()
      cy.wait('@postAddOOS')
  
      cy.get('.message-error, .cart-error').should('contain.text', 'out of stock')
      cy.screenshot('cart-oos-error')
    })
  
    it('handles server error on cart GET and shows error message', () => {
      cy.intercept('GET', '**/V1/carts/**', {
        statusCode: 500,
        body: { message: 'Internal Server Error' }
      }).as('getCartError')
  
      cy.visit('/')
      cy.get('a.action.showcart').first().click()
      cy.wait('@getCartError')
  
      cy.get('.message-error, .cart-error').should('contain.text', 'Internal Server Error')
      cy.screenshot('cart-get-500-error')
    })
})