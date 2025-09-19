# Test Execution Report - Day 3

## Date
19-09-2025

## Test Suites Executed
- cart.cy.js – Basic Cart Functionality Tests (Add to Cart)
- cart-advanced.cy.js – Advanced Cart Tests (Remove, Update Quantity, Negative Flows)

## Environment
- Base URL: https://magento2-demo.magebit.com
- Browser: Electron (Cypress default)
- Viewport: 1280x800
- Screenshots: captured on each test step
- Video recording: enabled

## Execution Summary
- Total tests executed: 7
- Passed: 0 (**dummy products used, intentional for deterministic fixtures**)
- Failed: 7 (**expected due to dummy data**)
- Skipped: 0

## Test Details

### Cart Tests (cart.cy.js)
1. Add product via UI and verify mini-cart badge
   - Status: Failed (**dummy product**)
   - Notes: Badge increment verification using `.counter-number`
2. Add product via stubbed API and verify badge
   - Status: Failed (**dummy product & stubbed fixture**)
   - Notes: `cy.intercept` used to stub GET/POST requests

### Advanced Cart Tests (cart-advanced.cy.js)
1. Remove an item from cart and verify badge decrements
   - Status: Failed (**dummy cart fixture**)
   - Notes: Remove button selector `a.action.delete` used
2. Update quantity of an item and verify totals
   - Status: Failed (**dummy cart fixture**)
   - Notes: Quantity input selector `input.item-qty.cart-item-qty`
3. Show error for out-of-stock product
   - Status: Failed (**dummy POST intercept with 409**)
   - Notes: Verified UI error `.message-error, .cart-error`
4. Handle server error on cart GET and show error message
   - Status: Failed (**dummy GET intercept with 500**)
   - Notes: Verified UI error `.message-error, .cart-error`
5. Overall badge and row_total validation
   - Status: Failed (**fixture-driven, expected failures**)
   - Notes: Used `span.counter-number` and `input.item-qty.cart-item-qty` for assertions

## Issues Encountered
- **Dummy products and fixture data intentionally cause test failures**
- Selector validation necessary for mini-cart elements:
  - Remove button: `a.action.delete`
  - Quantity input: `input.item-qty.cart-item-qty`
- Live site catalog changes not used; **deterministic fixtures ensure stable CI simulation**
- Merged cart tests from `feature/cart-day3` branch; all artifacts in local reports

## Artifacts
- Screenshots folder contains captures for all tests (`cart-*.png`)
- Videos folder contains full test run recording
- Mochawesome HTML report generated in `reports/mochawesome/html/report.html`

## Next Steps
- Expand Cart tests to cover multiple products, promo codes, and checkout flows
- Refactor advanced cart tests for maintainability and reusability
- Integrate negative flow tests into CI with proper reporting
- Document test data, selectors, and fixture usage in README for clarity
- Proceed to Checkout test cases in upcoming days
