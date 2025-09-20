/// <reference types="cypress" />

describe('Cart tests - add/remove and badge count', () => {
  beforeEach(() => {
    // Visit homepage before each test
    cy.visit('/')
    cy.viewport(1280, 800)
    cy.fixture('cart').as('cartData')
  })

  it('adds a product to cart (UI) and verifies mini-cart badge', function () {
    // Add Gray Hoodie via UI (from fixture)
    cy.contains('a.product-item-link', this.cartData[0].name)
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

    // Assert product details in mini-cart
    cy.get('.minicart-items')
      .should('contain', this.cartData[0].name)
      .and('contain', this.cartData[0].price)

    cy.screenshot('cart-add-ui-success')
  })

  it('adds a product using stubbed API and verifies badge', () => {
    // Stub GET cart to initially empty
    cy.intercept('GET', '**/V1/carts/**', { fixture: 'cart-empty.json' }).as('getCartEmpty')

    // Stub POST add-to-cart
    cy.intercept('POST', '**/V1/carts*/items', req => {
      req.reply({ statusCode: 200, body: { item_id: 3001, sku: 'HOODIE-GRAY-01', qty: 1 } })
    }).as('postAddItem')

    // Stub GET cart after adding item (use your cart.json)
    cy.fixture('cart').then(cartData => {
      cy.intercept('GET', '**/V1/carts/**', { body: { items: [cartData[0]], items_count: 1 } }).as('getCartAfterAdd')
    })

    // Add product via UI
    cy.contains('a.product-item-link', 'Gray Hoodie')
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

  it('updates quantity and verifies total price', function () {
    // Add Hoodie
    cy.contains('a.product-item-link', this.cartData[0].name)
      .first()
      .closest('.product-item')
      .find('button.action.tocart.primary')
      .first()
      .click()

    cy.get('a.action.showcart').first().click()

    // Go to product edit
    cy.get('.action.edit').first().click()
    cy.get('#qty').clear().type('2')
    cy.get('#product-updatecart-button').click()

    cy.get('a.action.showcart').first().click()

    // Verify qty updated
    cy.get('.minicart-items').should('contain', '2')

    // Verify total price
    const expectedTotal = (this.cartData[0].price * 2).toFixed(2)
    cy.get('.subtotal .price').should('contain', expectedTotal)
  })

  it('removes product and sees empty cart message', function () {
    // Add Hoodie
    cy.contains('a.product-item-link', this.cartData[0].name)
      .first()
      .closest('.product-item')
      .find('button.action.tocart.primary')
      .first()
      .click()

    cy.get('a.action.showcart').first().click()

    // Remove product
    cy.get('.action.delete').first().click()
    cy.get('.action-primary.action-accept').click() // confirm removal

    // Assert empty cart message
    cy.get('.minicart-wrapper')
      .should('contain', 'You have no items in your shopping cart.')
  })
})