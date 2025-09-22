# Daily Report - Day 6

## Date
22-09-2025

## Completed Tasks
- Added **API Authentication & Cart Tests**:
  - Created `cypress/e2e/api-auth.cy.js`
  - Implemented API helpers for:
    - `apiRegister()` — user registration via Magento REST API
    - `apiLogin()` — login via API and storing token in `localStorage`
    - Adding product to cart via API (`sku: 24-MB01`)
  - Verified all API flows pass and tokens are correctly stored
- Generated **Test Execution Report** for Day 6:
  - Documented all 3 tests: Register, Login, Add to Cart
  - Confirmed 100% pass rate and stable execution
  - HTML report saved: `reports/mochawesome/html/report.html`
- Prepared **Final Report** for project:
  - Summarized all test suites and execution results
  - Included API and UI test coverage overview
- Updated **README** with:
  - Project description, tech stack, test setup instructions
  - Notes on API helpers and Cypress commands
- Reviewed **Code & GitHub repository**:
  - Verified folder structure, commits, and pushed final changes
  - Ensured project ready for portfolio submission

### Artifacts produced
- Screenshots: `cypress/screenshots/api-auth.cy.js/*`
- Daily report `.md` and Test Execution Report `.md`

## Issues Faced
- No functional issues encountered
- Ensured API helpers work reliably without UI interaction

## Next Steps
- Prepare portfolio with final project structure and documentation
- Optionally integrate API helpers into other UI flows in future projects
- Maintain CI integration and artifact tracking for learning purposes

## Notes
- Day 6 focused on **API test implementation, documentation, and project finalization**
- All tests passed and artifacts generated for portfolio use
- Repository reviewed and ready for submission
