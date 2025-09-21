# Daily Report - Day 5

## Date
21-09-2025

## Completed Tasks
- Added **Accessibility Tests** using `cypress-axe`:
  - Created `cypress/integration/accessibility.cy.js`
  - Verified key pages: homepage, cart, checkout
  - Injected Axe and ran automated accessibility checks
- Added **Performance Tests** using `cypress-audit` (Lighthouse):
  - Created `cypress/integration/performance.cy.js`
  - Measured homepage performance, accessibility, and SEO scores
  - Thresholds defined for CI validation
- Refactored **Cypress Commands** (`cypress/support/commands.js`):
  - Grouped user flows: `login`, `register`, `checkout`
  - Added helper functions for key API waits (login, add-to-cart, search)
  - Removed redundant `cy.wait()` where possible
- Stabilized existing tests:
  - Verified Day 1–4 tests pass locally after refactor
  - Improved reliability of dynamic registration and checkout flows
- Updated **GitHub Actions workflow** (`.github/workflows/cypress-tests.yml`):
  - Added matrix testing (`ubuntu-latest` + `windows-latest`)
  - Included accessibility and performance specs in CI
  - Artifact upload: screenshots, videos, HTML reports
  - Chrome browser used for Lighthouse compatibility

### Artifacts produced
- Screenshots: `cypress/screenshots/...`
- Videos: `cypress/videos/...`
- Mochawesome HTML report: `reports/mochawesome/html/report.html`  
- Accessibility and performance results integrated into CI artifacts

## Issues Faced
- Minor warnings from deprecated npm packages (`cypress-audit` dependencies) — no functional impact
- Ensuring Lighthouse performance thresholds in CI required Chrome browser configuration
- Some static waits removed; conditional waits and intercepts tested to ensure stability

## Next Steps
- Review accessibility and performance reports for actionable findings
- Continue **Test Execution Reporting** (TestExecutionReport.md)
- Prepare Day 6 CI summary and push all artifacts to main
- Begin planning additional end-to-end flows for future demo features
- Maintain daily reporting and artifact tracking for portfolio

## Notes
- Day 5 focused on **Accessibility & Performance testing** and overall test stabilization
- All changes merged into `main` via feature branch `feature/accessibility-performance-day5`
- Tests now more reliable, reproducible, and integrated into CI with full reporting
