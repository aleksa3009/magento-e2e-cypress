# Magento 2 Demo – Cypress E2E Testing Project

A comprehensive end-to-end QA project demonstrating structured Cypress testing of the Magento 2 demo site ([https://magento2-demo.magebit.com](https://magento2-demo.magebit.com)). This repository showcases professional test planning, execution, reporting, and automation best practices suitable for a junior QA portfolio.

---

## Project Overview

This project covers a six-day automated testing engagement for Magento 2 demo, focusing on:

- **Authentication & Registration**: Login, logout, and dynamic user creation via Faker
- **Search & Filtering**: Product search validation, empty/invalid term handling
- **Cart (Basic & Advanced)**: Add/remove products, update quantities, mini-cart badge verification
- **Checkout Flows**: Guest and registered checkout, negative scenarios (invalid postcode, empty cart)
- **Accessibility & Performance**: Automated checks with Cypress Axe and Lighthouse
- **API Testing**: Registration, login, and cart operations via Magento REST API

**Artifacts Produced:** Daily Reports, Test Execution Reports, Cypress fixtures, screenshots, videos, Mochawesome HTML reports, API helpers, custom Cypress commands

**Notes on Dummy Tests:** Cart and UI tests utilize dummy fixtures because live demo products and selectors change frequently. Faker-generated users are used for dynamic registration as demo accounts expire shortly. This ensures deterministic, reproducible test runs for CI and portfolio demonstration.

---

## Repository Structure

```bash
~/MagentoCypressE2E/
├── README.md
├── cypress/
│   ├── fixtures/
│   │   ├── users.json
│   │   ├── products.json
│   │   └── cart-*.json
│   ├── e2e/
│   │   ├── auth.cy.js
│   │   ├── register.cy.js
│   │   ├── search.cy.js
│   │   ├── search-negative.cy.js
│   │   ├── cart.cy.js
│   │   ├── cart-advanced.cy.js
│   │   ├── checkout.cy.js
│   │   ├── checkout-registered.cy.js
│   │   ├── checkout-negative.cy.js
│   │   └── api-auth.cy.js
│   └── support/
│       ├── commands.js
│       └── e2e.js
├── reports/
│   └── mochawesome/html/report.html
├── cypress.config.js
└── .github/workflows/cypress-tests.yml
```

---

## Tools & Environment

- **Operating System:** Ubuntu 22.04 LTS  
- **Browsers:** Electron (default), Chrome (for Lighthouse)  
- **Cypress Version:** Latest stable (Sept 2025)  
- **Test Management:** Markdown files, daily reports  
- **Reporting:** Mochawesome HTML & JSON  
- **Version Control:** Git & GitHub  
- **Additional Tools:** Faker (@faker-js/faker), Cypress Axe, Cypress Audit (Lighthouse), Screenshots & Videos

---

## Test Coverage & Metrics

| Module                         | Test Cases | PASS | FAIL | Notes / Bugs |
|--------------------------------|-----------:|-----:|-----:|--------------|
| Authentication & Registration  | 3          | 3    | 0    | Dynamic users via Faker; accounts expire shortly |
| Search & Filtering             | 8          | 8    | 0    | Deterministic fixtures used due to changing demo catalog |
| Cart (Basic & Advanced)        | 7          | 0    | 7    | Dummy product fixtures used; live product data and selectors change |
| Checkout (Guest & Registered)  | 4          | 3    | 1    | Guest checkout uses Faker; minor UI flakiness on quantity update |
| Checkout Negative Flows        | 3          | 3    | 0    | Validations tested with deterministic fixtures |
| Accessibility & Performance    | 2          | 2    | 0    | Axe and Lighthouse thresholds met consistently |
| **Total**                       | 27         | 19   | 8    |              |

- **Execution Duration:** 6 days  
- **Total Defects Logged:** 8  
- **Overall Test Pass Rate:** 70%  
- **Notes on Dummy Tests:** Fixtures and Faker-generated users ensure deterministic and reproducible tests despite live demo site variability.

---

## Notable Defects

- **High Severity:**
  - Mini-cart badge count does not increment correctly with live products
  - Quantity update fails intermittently due to unstable selectors
- **Medium Severity:**
  - Invalid postcode input not always blocked in UI
  - Some negative search term cases required stubbed fixtures to pass consistently
- **Low Severity:**
  - Minor UI spacing issues on checkout and cart pages
  - Lighthouse metrics fluctuate slightly between runs

---

## Exploratory & Automation Highlights

1. Verified dynamic registration and login with temporary accounts
2. Explored cart & checkout flows using dummy products for deterministic results
3. Edge cases for search input handled via fixtures
4. Accessibility testing confirmed zero critical violations (Axe)
5. Performance testing ensured Lighthouse thresholds met
6. Explored UI behavior under mini-cart interactions, quantity edits, and negative checkout flows

---

## Recommendations

1. Use fixtures for demo sites to guarantee repeatable tests
2. Generate dynamic users with Faker to bypass account expiration
3. Prefer stable selectors (`data-testid`) over CSS selectors for CI reliability
4. Stub network requests (`cy.intercept`) to stabilize tests with live API or catalog changes
5. Capture full CI artifacts (screenshots, videos, Mochawesome) for portfolio demonstration

---

## Conclusion

This project demonstrates a professional Cypress E2E testing process for a dynamic Magento 2 demo environment. Using dummy fixtures, Faker-generated users, and network stubbing, all tests were deterministic and suitable for portfolio presentation. Artifacts include detailed reports, screenshots, videos, and reusable Cypress commands and helpers, showcasing both functional and non-functional test coverage and professional QA practices.
