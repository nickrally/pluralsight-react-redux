if (process.env.NODE_ENV === "production") {
  module.exports = require("./configureStore.prod");
} else {
  module.export = require("./configureStore.dev");
}
