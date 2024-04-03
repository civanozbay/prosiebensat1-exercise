const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    env: {
      apiUrl: "https://5fxqbwmm9a.execute-api.us-east-1.amazonaws.com/Prod",
    },
  },
});
