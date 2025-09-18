/// <reference types="cypress" />

describe('Search - Negative Flows & Edge Cases', () => {

    beforeEach(() => {
      cy.visit('/');
      cy.viewport(1280, 800);
    });
  
    // -------------------------
    // No results search
    // -------------------------
    it('should show "no results" message for empty search', () => {
      cy.intercept('GET', '**/search*', { fixture: 'search-no-results.json' }).as('searchNoResults');
  
      cy.get('input[name="q"]').type('nonexistent-product{enter}');
      cy.wait('@searchNoResults');
  
      cy.get('.message.notice, .message-empty, .no-results').should('be.visible');
      cy.screenshot('search-no-results');
    });
  
    // -------------------------
    // Special characters search
    // -------------------------
    it('should handle special characters in search', () => {
      cy.intercept('GET', '**/search*', { fixture: 'search-no-results.json' }).as('searchSpecial');
  
      cy.get('input[name="q"]').type('@#$%^&*(){enter}');
      cy.wait('@searchSpecial');
  
      cy.get('.message.notice, .message-empty, .no-results').should('be.visible');
      cy.screenshot('search-special-characters');
    });
  
    // -------------------------
    // Simulated server error
    // -------------------------
    it('should display error message on server error', () => {
      cy.intercept('GET', '**/search*', {
        statusCode: 500,
        body: { message: 'Server error' }
      }).as('searchError');
  
      cy.get('input[name="q"]').type('error-trigger{enter}');
      cy.wait('@searchError');
  
      cy.get('.message-error, .search-error').should('be.visible');
      cy.screenshot('search-server-error');
    });
  
  });
  