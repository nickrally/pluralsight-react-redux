const webpack = require("webpack");
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

//declare node environment
process.env.NODE_ENV = "development";

module.exports = {
  mode: "development",
  target: "web",
  devtool: "cheap-module-source-map", //source maps let us see original code when debug in browser
  entry: "./src/index", //default, could leave it out
  output: {
    //in dev mode webpack doesn't output code, it serves app from memory
    path: path.resolve(__dirname, "build"), //__dirname is current dir, but it's not going to write to "build"
    publicPath: "/", //public ulr of output dir when referenced in browser
    filename: "bundle.js", //in dev it won't be created, but setting still needed
  },
  devServer: {
    stats: "minimal",
    overlay: true,
    historyApiFallback: true, //all requests sent to index.htlm, so that deep links will be handled by react-router
    disableHostCheck: true,
    headers: { "Access-Control-Allow-Origin": "*" },
    https: false,
  },
  plugins: [
    new webpack.DefinePlugin({
      "process.env.API_URL": JSON.stringify("http://localhost:3001"),
    }),
    new HtmlWebpackPlugin({
      template: "src/index.html",
      favicon: "src/favicon.ico",
    }),
  ],
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ["babel-loader", "eslint-loader"], //run bable on js files & webpack will bundle it up
      },
      {
        test: /(\.css)$/,
        use: ["style-loader", "css-loader"], //allows importing css just like js & webpack will bundle it in one css file
      },
    ],
  },
};
