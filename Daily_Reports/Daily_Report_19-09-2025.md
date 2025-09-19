# Daily Report - Day 3

## Date
19-09-2025

## Completed Tasks
- Expanded **Cart Functionality Tests** with advanced scenarios:
  - Created fixtures for deterministic testing:
    - `cart-empty.json` – empty cart
    - `cart-with-items.json` – cart with multiple items
    - `cart-after-add.json` – cart state after adding an item
    - `cart-after-remove.json` – cart state after removing an item
  - Added **cart.cy.js**:
    - UI-driven add-to-cart test
    - Stubbed POST/GET add-to-cart with `cy.intercept` for deterministic behavior
    - Verified mini-cart badge count updates
  - Added **cart-advanced.cy.js**:
    - Remove item from mini-cart and verify badge decrements
    - Update quantity in mini-cart and verify row totals and badge
    - Negative flows:
      - Out-of-stock product simulation with stubbed POST returning 409
      - Verified error message displayed in UI
- Confirmed selectors for mini-cart actions:
  - Remove button: `a.action.delete`
  - Quantity input: `input.item-qty.cart-item-qty`
  - Mini-cart toggle: `a.action.showcart`
- Performed local commits and merged `feature/cart-day3` into `main`.
- Pushed updates to remote repository; branch set up to track origin.
- Headless execution and artifact generation configured (screenshots, videos, Mochawesome reports), though tests currently fail due to dummy product data.
- Tests designed to demonstrate structured Cypress E2E testing, stubbing, and intercept usage.

## Issues Faced
- Using dummy products means test execution fails on live demo site.
- Frequent changes to fixture and selectors required careful verification.
- Merge conflicts resolved manually when integrating feature branch into main.
- CI reporting fails if `merged.json` is empty (expected for failing dummy tests).

## Next Steps
- Expand Cart Tests to include:
  - Multiple items in mini-cart
  - Promo codes and discount logic
  - Checkout flow (billing & shipping) with fixture-driven data
- Refactor existing cart tests for reusability and maintainability.
- Integrate CI with nightly runs and artifact uploads, even for failing dummy tests, to showcase pipeline usage.
- Document test data structure and workflows in README for clarity.
- Continue daily reporting to track progress.

## Notes
- Day 3 focused on **Advanced Cart Functionality** (add/remove items, update quantity, badge count, negative scenarios).
- Tests use fixtures and intercepts for deterministic behavior.
- Screenshots and videos configured to capture outcomes; all artifacts are ignored in Git per `.gitignore`.
- Designed for CV/portfolio demonstration of structured Cypress testing practices rather than live site pass/fail.
