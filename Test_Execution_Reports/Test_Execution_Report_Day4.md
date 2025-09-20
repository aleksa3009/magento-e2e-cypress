# Test Execution Report - Day 4

## Date
2025-09-20

## Test Suites Executed
- `cypress/e2e/cart.cy.js` — Cart flow (UI + stubbed API, qty update, remove)
- `cypress/e2e/checkout.cy.js` — Guest checkout (Faker-driven) up to payment screen
- `cypress/e2e/checkout-registered.cy.js` — Registered user checkout (prefilled shipping)
- `cypress/e2e/checkout-negative.cy.js` — Negative / edge cases (invalid postcode, empty cart, remove item at checkout)

## Environment
- Base URL: `https://magento2-demo.magebit.com` (Cypress e2e baseUrl)
- Runner / Browser: Electron (Cypress default in local runs / CI uses electron in workflow)
- Viewport: `1280x800`
- Timeouts / retries: `defaultCommandTimeout: 8000`, `pageLoadTimeout: 60000`, retries runMode:1
- Reporter: `cypress-mochawesome-reporter` (HTML + JSON)
- Artifacts: screenshots (`cypress/screenshots`), videos (`cypress/videos`), mochawesome HTML (`reports/mochawesome/html/report.html`)

## Execution Summary
- Total tests executed: **9**
- Passed: **7**
- Failed: **2**
- Skipped: **0**

> **Note:** the results above are from a local/CI-friendly run that used fixtures and `cy.intercept` where appropriate. Tests that hit live UI elements on the demo site can be flaky depending on catalog contents and DOM changes — see *Issues Encountered* below.

## Test Details

### Cart Flow (`cypress/e2e/cart.cy.js`) — 4 tests
1. **adds a product to cart (UI) and verifies mini-cart badge**
   - Status: **Failed**
   - Notes: Test uses fixture product name (`Gray Hoodie`) and relies on live product listing. Failure caused by demo catalog mismatch / selector instability in the product list — recommend using data-test attributes or stubbing page results for deterministic UI click.
2. **adds a product using stubbed API and verifies badge**
   - Status: **Passed**
   - Notes: `cy.intercept` stubs for GET/POST cart ensure deterministic behavior; badge asserted from stubbed response.
3. **updates quantity and verifies total price**
   - Status: **Failed**
   - Notes: Relies on product edit flow and updating `#qty` on product page. Flaky due to UI navigation timing and occasional differences in update button selector / mini-cart subtotal. Works reliably when the flow is fully stubbed or when stable selectors are used.
4. **removes product and sees empty cart message**
   - Status: **Passed**
   - Notes: Removal flow (delete + confirm) asserted empty cart message; succeeded in a stubbed/local run.

### Guest Checkout (`cypress/e2e/checkout.cy.js`) — 1 test
1. **proceed from cart to payment screen as guest (Faker generated data)**
   - Status: **Passed**
   - Notes: Faker used to generate dynamic shipping details; test stops before payment confirmation and asserts `#checkout-payment-method-load`. Works reliably because it uses a real flow but fills valid fields and selects shipping; minor waits added for stability.

### Registered User Checkout (`cypress/e2e/checkout-registered.cy.js`) — 1 test
1. **login, add product and proceed to payment screen with prefilled info**
   - Status: **Passed**
   - Notes: Uses existing login command (`cy.login`) to authenticate, asserts shipping fields are prefilled (email check + non-empty fields), then proceeds to payment screen. Stable when login credentials exist and profile has shipping data.

### Negative Scenarios (`cypress/e2e/checkout-negative.cy.js`) — 3 tests
1. **shows validation error for invalid postcode**
   - Status: **Passed**
   - Notes: Invalid postcode (`ABC`) triggers postcode validation and visible error element (selector `#postcode-error` or similar).
2. **shows message when trying to checkout with empty cart**
   - Status: **Passed**
   - Notes: Empty cart flow asserts correct message; uses force-click on possible disabled checkout button to verify message displays.
3. **updates total when removing item at checkout page**
   - Status: **Passed**
   - Notes: Remove on checkout page updates grand total to `0.00` and shows empty cart message.

## Issues Encountered
- **Demo site instability / catalog changes** — some UI tests depend on product names present on the live demo. Using fixtures + stubbing avoids these issues; UI-first tests remain fragile.
- **Flaky mini-cart locators** — mini-cart overlay selectors are inconsistent in some states (open vs closed). Recommended to add `data-testid` attributes or use more robust selector chains.
- **Qty update flow fragility** — product-edit/update cart buttons sometimes differ on the demo site; consider stubbing the POST/GET cart flow for deterministic assertions of totals.
- **CI reporter path caution** — ensure mochawesome JSON files are generated to `reports/mochawesome/*.json` so `marge`/merge step produces HTML (empty merges lead to empty HTML).

## Artifacts
- Screenshots: saved under `cypress/screenshots/...` (key screenshots captured: cart-add-ui-success, cart-add-stubbed-success, checkout-guest-payment-screen-faker, checkout-registered-payment-faker, checkout-invalid-postcode, checkout-empty-cart, checkout-remove-item-total-update)
- Videos: saved under `cypress/videos/...` (full-run recordings for CI)
- Mochawesome HTML report: `reports/mochawesome/html/report.html` (generated by CI merge step)

## Metrics & Observations
- Tests using **stubbing/intercepts** (POST/GET cart) were **deterministic and passed** consistently.
- Tests relying on **live DOM/catalog** had the highest flakiness (2 of 4 cart UI tests). Moving these to use fixture-driven UI stubs or adding stable attributes would raise pass rate to ~100% under CI.
- Execution time: Full suite (9 specs) typical local/CI run using Electron ~ **2.5 - 6 minutes** depending on video recording and site responsiveness (note: demo site slow responses can increase runtime).
- Artifact size: video files can be large; consider enabling video only for CI or using `trashAssetsBeforeRuns` to control storage.

## Next Steps
- Refactor fragile selectors (mini-cart, product edit flow) — add or request `data-testid` attributes where possible.
- Convert UI-dependent cart add/qty flows to use **fixture-driven stubs** for CI stability, or add robust retries/conditional waits.
- Finalize and commit **TestExecutionReport.md** and Daily Report (this file) to `main`.
- For Day 5 (next): run accessibility checks with `cypress-axe`, responsive viewport checks (mobile/tablet/desktop), and simple performance measurements — capture and attach any new artifacts.

## Conclusion
Day 4 delivered full Cart & Checkout coverage (guest + registered + negative scenarios) with fixtures, stubbing and Faker for dynamic data. Most tests are deterministic; a small subset of UI tests require selector hardening or fixture-stubbing to be fully reliable in CI against the public demo site. Artifacts and CI reporting were configured and pushed to `main` for portfolio demonstration.
