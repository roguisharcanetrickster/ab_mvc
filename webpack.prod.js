const path = require("path");
const APP = path.resolve(__dirname);
const { merge } = require("webpack-merge");
const commons = require("./webpack.common.js");
// exports [browserEsm, serviceUmd]

const outPath = path.join(APP, "dist");

const myChanges = {
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
};

module.exports = Array.isArray(commons)
   ? commons.map((cfg) => merge(cfg, myChanges))
   : merge(commons, myChanges);
