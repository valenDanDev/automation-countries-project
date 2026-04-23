const { defineConfig } = require("cypress");

module.exports = defineConfig({
  allowCypressEnv: false,

  reporter: "mochawesome",
  reporterOptions: {
    reportDir: "cypress/reports",
    overwrite: false,
    html: false,
    json: true
  },

  e2e: {
    baseUrl: "http://localhost:3000",
    setupNodeEvents(on, config) {
      // future: plugins, logs, tasks
    },
  },
});