# Magento Demo - Cypress End-to-End Automation Project

A comprehensive end-to-end automation project showcasing Cypress E2E testing of the demo e-commerce website https://magento2-demo.magebit.com.

---

## Project Overview

This repository contains all artifacts produced during a six-day Cypress automation engagement, covering:

- **Authentication:** Registration, Login, Duplicate users, Invalid credentials
- **Search & Filtering:** Product search, category filters, sorting
- **Cart:** Add/remove items, badge count verification
- **Checkout:** Guest flow, form validation, payment simulation
- **Accessibility:** Axe analysis via `cypress-axe`
- **Performance:** Page load time < 2s
- **CI Integration:** GitHub Actions, Mochawesome reports, code coverage

**Note:** This is a portfolio project. Test cases include realistic scenarios and optional demo artifacts. The README.md will be updated at the end of the project with final instructions and badges.

---

## Tools & Environment

| Tool / Technology      | Purpose                               |
|------------------------|---------------------------------------|
| Cypress                | E2E test framework                    |
| JavaScript (ES6)       | Test scripting language               |
| Mocha + Chai           | Test runner & assertions (built-in)  |
| Faker.js               | Dynamic test data generation          |
| Cypress-axe            | Accessibility testing                 |
| Mochawesome            | HTML + JSON reporting                 |
| Istanbul (nyc)         | Code coverage reports                 |
| GitHub Actions         | CI/CD pipeline                        |
| Lightshot              | Screenshot documentation              |

---

## Projected Repository Structure

magento-e2e-cypress/
├── cypress/
│   ├── fixtures/            # test data: users.json, products.json, checkout.json
│   ├── integration/         # test specs by functionality (auth, search, cart, checkout)
│   ├── plugins/             # Cypress plugins: axe, mochawesome, code coverage
│   ├── support/             # custom commands & global hooks
│   ├── videos/              # CI run recordings
│   └── screenshots/         # error screenshots
├── reports/
│   ├── mochawesome/         # HTML + JSON reports
│   └── coverage/            # Istanbul + nyc coverage
├── .github/workflows/       # CI configuration
│   └── cypress-tests.yml
├── cypress.config.js        # baseUrl, timeouts, retries, viewport
├── package.json             # dependencies and test scripts
├── TestPlan.md              # this file
├── TestCases.md             # table of test scenarios
├── TestExecutionReport.md   # pass/fail, metrics, comments
├── DefectReport.md          # reported bugs
├── FinalReport.md           # summary, coverage, recommendations
├── README.md                # overview, badges, setup instructions
├── .prettierrc              # code style
└── .gitignore

---

## Deliverables

1. `TestPlan.md` - objectives, tools, schedule  
2. `TestCases.md` - table with IDs, descriptions, steps, priorities  
3. `cypress/` - all test scripts, fixture files, custom commands  
4. `reports/mochawesome/` - HTML + JSON reports  
5. `screenshots/` and `videos/` - artifacts from CI runs  
6. `TestExecutionReport.md` - execution results & metrics  
7. `DefectReport.md` - documented defects with steps and screenshots  
8. `FinalReport.md` - coverage, lessons learned, next steps  
9. `README.md` - badges, instructions, usage examples  
10. `.github/workflows/` - CI pipeline  
11. `accessibility.log` - summary from `cypress-axe`  
12. Optional: Demo video (1-2 min test run)

---

## Test Coverage Summary

- Registration (valid & duplicate)  
- Login (valid & invalid)  
- Search & Filtering  
- Cart (add/remove items, badge count)  
- Checkout (guest, validation)  
- Accessibility (`cypress-axe`)  
- Performance (< 2s page load)

---

## 6-Day Detailed Execution Schedule

| Day   | Activities                                                                 |
|-------|---------------------------------------------------------------------------|
| Day 1 | Repository setup, authentication tests, create fixtures (`users.json`)    |
| Day 2 | Search & filtering scenarios, implement `cy.intercept` stubs             |
| Day 3 | Cart functionality, badge count, API stubbing                             |
| Day 4 | Checkout flow, form validations, `cy.screenshot` for artifacts            |
| Day 5 | Accessibility testing (`cypress-axe`), responsive & performance checks    |
| Day 6 | CI integration, merge Mochawesome reports, generate coverage, finalize `README.md` & `FinalReport.md` |

---

## Additional Practices & Recommendations

- **Fixtures:** `users.json`, `products.json` for dynamic data  
- **Custom Commands:** `cy.login()`, `cy.register()`, `cy.addProduct()`  
- **Network Stubbing:** `cy.intercept` for `GET /cart` and `POST /checkout`  
- **Accessibility Log:** Save `cypress-axe` results in `accessibility.log`  
- **Code Coverage:** Use `@cypress/code-coverage` + Istanbul (nyc)  
- **Mochawesome Merge:** Combine all runs into single HTML report  
- **CI Fail Thresholds:** Optional: fail if `loadTime > 2s` or `axe violations > 0`  
- **Best Practices:** atomic commits, live documentation updates, clear screenshots/videos  

---

## Conclusion

This project demonstrates a structured Cypress E2E automation approach, covering functional, negative, accessibility, responsive, and performance tests. With multiple test scenarios, CI integration, coverage reports, and detailed artifacts, this repository provides a strong showcase of junior-to-intermediate automation QA skills.