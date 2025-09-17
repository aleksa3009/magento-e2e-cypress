/// <reference types="cypress" />

describe('Authentication Tests - Magebit Demo', () => {
  const base = 'https://magento2-demo.magebit.com'

  beforeEach(() => {
    cy.visit(`${base}/customer/account/login/`)
  })

  it('should login with valid credentials', () => {
    cy.fixture('users').then(users => {
      const user = users.validUser
      cy.get('#email').type(user.email)
      cy.get('#pass').type(user.password)
      cy.get('#send2').click()

      // wait for UI to stabilize
      cy.wait(1000)

      // open dropdown menu
      cy.get('button[data-action="customer-menu-toggle"]').first().click()

      // verify that "Sign Out" is visible
      cy.contains('Sign Out').should('be.visible')
    })
  })

  it('should fail login with invalid credentials', () => {
    cy.fixture('users').then(users => {
      const user = users.invalidUser
      cy.get('#email').type(user.email)
      cy.get('#pass').type(user.password)
      cy.get('#send2').click()

      // verify that an error message is visible
      cy.get('.message-error').should('be.visible')
    })
  })
})
