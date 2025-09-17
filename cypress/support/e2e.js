// cypress/support/e2e.js

import './commands'

// Automatically take a screenshot on test failure
afterEach(function () {
  if (this.currentTest.state === 'failed') {
    const testName = this.currentTest.fullTitle().replace(/[:\/]/g, ' - ')
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-')
    const fileName = `failure-${testName}-${timestamp}`

    cy.screenshot(fileName, { capture: 'runner' })
  }
})
