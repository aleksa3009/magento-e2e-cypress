/// <reference types="cypress" />

describe('Search & Filtering Tests', () => {

    // Runs before each test
    beforeEach(() => {
      cy.visit('/');
      cy.viewport(1280, 800);
  
      // Stub search API for positive results
      cy.intercept('GET', '**/search*', { fixture: 'search-results-term.json' }).as('searchResults');
  
      // Stub categories API
      cy.intercept('GET', '**/V1/categories*', { fixture: 'categories.json' }).as('categories');
    });
  
    // -------------------------
    // Positive Search Tests
    // -------------------------
    it('should display search results for "hoodie"', () => {
      cy.get('input[name="q"]').type('hoodie{enter}');
      cy.wait('@searchResults');
  
      cy.get('.product-item').should('have.length', 3);
  
      cy.fixture('products.json').then((products) => {
        const firstProduct = products[0];
        cy.get('.product-item').first().within(() => {
          cy.get('.product-item-name').should('contain.text', firstProduct.name);
          cy.get('.price').should('contain.text', firstProduct.price);
          cy.get('.sku').should('contain.text', firstProduct.sku);
        });
      });
  
      cy.screenshot('search-hoodie');
    });
  
    it('should display search results for "cap"', () => {
      cy.get('input[name="q"]').type('cap{enter}');
      cy.wait('@searchResults');
  
      cy.get('.product-item').should('have.length', 3);
  
      cy.fixture('products.json').then((products) => {
        const capProduct = products.find(p => p.name.includes('Cap'));
        cy.get('.product-item').contains(capProduct.name).should('exist');
      });
  
      cy.screenshot('search-cap');
    });
  
    // -------------------------
    // Filtering Tests
    // -------------------------
    it('should filter products by category "Clothing"', () => {
      cy.get('input[type="checkbox"][value="Clothing"]').check({ force: true });
  
      cy.fixture('products.json').then((products) => {
        const clothingProducts = products.filter(p => p.category === 'Clothing');
        cy.get('.product-item').should('have.length', clothingProducts.length);
  
        clothingProducts.forEach((product, index) => {
          cy.get('.product-item').eq(index).within(() => {
            cy.get('.product-item-name').should('contain.text', product.name);
          });
        });
      });
  
      cy.screenshot('filter-category-clothing');
    });
  
    it('should filter products by category "Accessories"', () => {
      cy.get('input[type="checkbox"][value="Accessories"]').check({ force: true });
  
      cy.fixture('products.json').then((products) => {
        const accessories = products.filter(p => p.category === 'Accessories');
        cy.get('.product-item').should('have.length', accessories.length);
  
        accessories.forEach((product, index) => {
          cy.get('.product-item').eq(index).within(() => {
            cy.get('.product-item-name').should('contain.text', product.name);
          });
        });
      });
  
      cy.screenshot('filter-category-accessories');
    });
  
    it('should filter products by price range 10-40', () => {
      cy.get('input[name="min-price"]').clear().type('10');
      cy.get('input[name="max-price"]').clear().type('40');
      cy.get('button[name="apply-price-filter"]').click();
  
      cy.fixture('products.json').then((products) => {
        const inRange = products.filter(p => p.price >= 10 && p.price <= 40);
        cy.get('.product-item').should('have.length', inRange.length);
  
        inRange.forEach((product, index) => {
          cy.get('.product-item').eq(index).within(() => {
            cy.get('.price').should('contain.text', product.price);
          });
        });
      });
  
      cy.screenshot('filter-price-10-40');
    });
  
    it('should allow multiple filters at the same time', () => {
      cy.get('input[type="checkbox"][value="Clothing"]').check({ force: true });
      cy.get('input[name="min-price"]').clear().type('30');
      cy.get('input[name="max-price"]').clear().type('60');
      cy.get('button[name="apply-price-filter"]').click();
  
      cy.fixture('products.json').then((products) => {
        const filtered = products.filter(p => p.category === 'Clothing' && p.price >= 30 && p.price <= 60);
        cy.get('.product-item').should('have.length', filtered.length);
      });
  
      cy.screenshot('filter-multiple');
    });
  
    // -------------------------
    // Sorting Tests
    // -------------------------
    it('should sort products by price ascending', () => {
      cy.get('.sorter select, select.sort-by').select('price-asc');
      cy.wait(500);
  
      cy.get('.product-item .price').then($prices => {
        const nums = [...$prices].map(p => parseFloat(p.innerText.replace(/[^0-9.]/g, '')));
        expect(nums[0]).to.be.at.most(nums[nums.length - 1]);
      });
  
      cy.screenshot('sort-price-asc');
    });
  
    it('should sort products by name ascending', () => {
      cy.get('.sorter select, select.sort-by').select('name-asc');
      cy.wait(500);
  
      cy.get('.product-item .product-item-name').then($names => {
        const texts = [...$names].map(el => el.innerText.toLowerCase());
        const sorted = [...texts].sort();
        expect(texts).to.deep.equal(sorted);
      });
  
      cy.screenshot('sort-name-asc');
    });
  
  });  