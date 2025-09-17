# Daily Report - Day 1

## Date
17-09-2025

## Completed Tasks
- Set up Cypress project structure (`cypress/`, `reports/`, `.github/workflows/`).
- Created `cypress.config.js` with:
  - baseUrl
  - timeouts
  - retries
  - viewport settings
  - code coverage task
  - screenshot/video settings
- Created support files:
  - `cypress/support/e2e.js` (imports commands)
  - `cypress/support/commands.js` with `login`, `register`, `generateUser` commands
- Created fixtures (`cypress/fixtures/users.json`) for valid, invalid, and duplicate users.
- Created first test suites:
  - **Authentication Tests - Magebit Demo** (`auth.cy.js`)
    - Valid login test
    - Invalid login test
  - **Dynamic Registration Test** (`register.cy.js`) using Faker to generate unique users.
- Screenshots captured on test failures; video recording enabled for CI.
- Set up Mochawesome reporting and merging of JSON files to HTML.
- Verified that tests open in Electron and run successfully locally.

## Issues Faced
- Selector issues for login and dropdown menus.
- Temporary `cy.wait()` used for UI stabilization (to be replaced with conditional waits).
- The demo site prevents reusing previously registered emails, requiring Faker for dynamic registration.
- - Newly created accounts expire or become invalid after a short period, making repeated test runs with the same credentials impossible.

## Next Steps
- Refactor selectors for better reliability (avoid fragile CSS selectors).
- Add additional test cases for **Account Creation**, **Search & Filtering**, **Cart**, and **Checkout** flows.
- Improve test stability by replacing static waits with conditional checks (`cy.intercept` or `cy.get().should()`).
- Configure environment variables for credentials (optional, for reusable login).
- Integrate CI fully with caching, matrix testing, and artifact uploads.
- Add accessibility and performance tests on later days.
- Continue daily reporting for transparency and progress tracking.

## Notes
- Day 1 focused on project setup, basic authentication tests, and foundation for future tests.
- Code coverage and screenshot/video capture are configured and working.
- Environment is ready for building additional test cases in upcoming days.
