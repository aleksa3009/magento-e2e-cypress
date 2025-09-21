// cypress/e2e/performance.cy.js

describe('Performance and Lighthouse audit', () => {
    // Define thresholds for Lighthouse metrics
    const thresholds = {
      performance: 50,
      accessibility: 70,
      seo: 70,
      'best-practices': 70,
      pwa: 50,
    }
  
    beforeEach(() => {
      // Clear cookies and localStorage before each test to start fresh
      cy.clearCookies()
      cy.clearLocalStorage()
    })
  
    it('Homepage performance score', () => {
      // Visit homepage
      cy.visit('/')
      // Run Lighthouse audit using defined thresholds
      cy.lighthouse(thresholds)
    })
  
    it('Cart page performance score', () => {
      // Visit cart page
      cy.visit('/checkout/cart/')
      cy.lighthouse(thresholds)
    })
  
    it('Checkout page performance score', () => {
      // Visit checkout page
      cy.visit('/checkout/')
      cy.lighthouse(thresholds)
    })
  
    it('Product details page performance score', () => {
      // Visit a sample product page
      cy.visit('/fusion-backpack.html') // example product URL
      cy.lighthouse(thresholds)
    })
  
    it('Login page performance score', () => {
      // Visit login page
      cy.visit('/customer/account/login/')
      cy.lighthouse(thresholds)
    })
  
    it('Newly registered user dashboard performance score', () => {
      // Use custom register command to create a new user dynamically
      cy.register().then(user => {
        // After registration, user is logged in
        cy.visit('/customer/account/')
        cy.lighthouse(thresholds)
      })
    })
})