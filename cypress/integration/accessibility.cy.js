// cypress/e2e/accessibility.cy.js

describe('Accessibility checks with axe', () => {
    beforeEach(() => {
      // Reset state before each test
      cy.clearCookies()
      cy.clearLocalStorage()
    })
  
    it('Homepage has no a11y violations', () => {
      cy.visit('/')
      cy.checkA11yPage()
    })
  
    it('Cart page has no a11y violations', () => {
      cy.visit('/checkout/cart/')
      cy.checkA11yPage()
    })
  
    it('Checkout page has no a11y violations', () => {
      cy.visit('/checkout/')
      cy.checkA11yPage()
    })
  
    it('Login page has no a11y violations', () => {
      cy.visit('/customer/account/login/')
      cy.checkA11yPage()
    })
  
    it('Registration page has no a11y violations', () => {
      cy.visit('/customer/account/create/')
      cy.checkA11yPage()
    })
  
    it('Product details page has no a11y violations', () => {
      cy.visit('/fusion-backpack.html') // example product
      cy.checkA11yPage()
    })
  
    it('Newly registered user dashboard has no a11y violations', () => {
      // Use custom register command
      cy.register().then(user => {
        cy.visit('/customer/account/')
        cy.checkA11yPage()
      })
    })
})
