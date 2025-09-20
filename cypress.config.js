const { defineConfig } = require('cypress')

module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://magento2-demo.magebit.com',

    specPattern: 'cypress/e2e/**/*.cy.{js,ts}',

    supportFile: 'cypress/support/e2e.js',

    setupNodeEvents(on, config) {
      // Code coverage task (ako je instaliran)
      require('@cypress/code-coverage/task')(on, config)

      // Mochawesome reporter
      require('cypress-mochawesome-reporter/plugin')(on)
      return config
    },

    defaultCommandTimeout: 8000,
    pageLoadTimeout: 60000,
    requestTimeout: 15000,
    viewportWidth: 1280,
    viewportHeight: 800,
    retries: { runMode: 1, openMode: 0 },

    // Video & screenshot settings
    video: true,
    videosFolder: 'cypress/videos',
    screenshotOnRunFailure: true,
    screenshotsFolder: 'cypress/screenshots',
    trashAssetsBeforeRuns: true,

    // Reporter settings
    reporter: 'cypress-mochawesome-reporter',
    reporterOptions: {
      reportDir: 'reports/mochawesome/html',
      overwrite: false,
      html: true,
      json: true
    }
  }
})
