const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    env: {
      apiUrl: "https://9k9jlkn5lj.execute-api.us-east-1.amazonaws.com/Prod",
      awsAccessKeyId: "AKIAT2ZYTAFKX32ZRDF5",
      awsSecretAccessKey: "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",
      awsRegion: "us-east-1",
    },
  },
});
