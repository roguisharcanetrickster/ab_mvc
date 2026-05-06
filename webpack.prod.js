const path = require("path");
const APP = path.resolve(__dirname);
const { merge } = require("webpack-merge");
const commons = require("./webpack.common.js");

const outPath = path.join(APP, "dist");

module.exports = merge(commons, {
   output: {
      path: outPath,
   },
   mode: "production",
   devtool: false,
   optimization: {
      minimize: true,
   },
   performance: {
      hints: false,
   },
});
