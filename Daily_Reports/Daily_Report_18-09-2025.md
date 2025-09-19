# Daily Report - Day 2

## Date
18-09-2025

## Completed Tasks
- Added **Search & Filtering Tests** using fixtures:
  - `products.json` for product data
  - `search-results-term.json` for search results
- Implemented deterministic test behavior with fixture stubbing (`cy.intercept`) to avoid live site variability.
- Created test suite **Search & Filter** (`search.cy.js`):
  - Search by product name and term
  - Verify search results match fixture data
  - Validate empty and invalid search term handling
- Added assertions on product titles, prices, and links.
- Verified tests run successfully in Electron and Chrome headless locally.
- Screenshots captured on failures; video recording enabled for CI.
- Integrated Mochawesome reporting for this test suite.
- Created initial **Cart Functionality Tests** (`cart.cy.js`):
  - Add product to cart from product page
  - Verify mini-cart updates correctly
  - Remove product from cart (selectors confirmed: `.minicart-items .action.delete, .minicart .action.delete, a.action.delete`)
  - Update quantity in mini-cart (selector: `input.qty`)
- Updated Cypress commands and support files to handle cart actions (`addToCart`, `removeFromCart`, `updateQuantity`).
- **Used dummy products and test data** because the demo site catalog and locators change frequently, ensuring deterministic and stable test execution.

## Issues Faced
- Occasional flaky behavior in mini-cart updates; resolved by adding explicit `cy.get().should()` assertions.
- Selector conflicts in mini-cart between product list and cart overlay.
- Live site catalog changes required fixtures to ensure deterministic test results.

## Next Steps
- Expand **Cart Tests** to cover multiple products, promo codes, and checkout flow.
- Implement **Checkout Tests** with billing and shipping info (fixtures planned).
- Refactor and parameterize existing search and cart tests for reusability.
- Integrate CI for nightly test runs and report generation.
- Begin documenting test data and workflows in README for clarity.

## Notes
- Day 2 focused on **Search, Filtering, and basic Cart functionality**.
- Test execution is deterministic due to fixture usage with dummy products.
- CI configuration partially set up; screenshots and videos working as expected.
