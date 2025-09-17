const { defineConfig } = require('cypress')

module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://magento2-demo.magebit.com',
    specPattern: 'cypress/integration/**/*.cy.{js,ts}',
    supportFile: 'cypress/support/e2e.js',
    setupNodeEvents(on, config) {
      require('@cypress/code-coverage/task')(on, config)
      return config
    },
    defaultCommandTimeout: 8000,
    pageLoadTimeout: 60000,
    requestTimeout: 15000,
    viewportWidth: 1280,
    viewportHeight: 800,
    retries: { runMode: 1, openMode: 0 },
    video: true,                      
    videosFolder: 'cypress/videos',   
    screenshotOnRunFailure: true,     
    screenshotsFolder: 'cypress/screenshots',
    trashAssetsBeforeRuns: true       
  }
})
