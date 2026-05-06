const path = require("path");
const APP = path.resolve(__dirname);
const { merge } = require("webpack-merge");
const commons = require("./webpack.common.js");
// exports [browserEsm, serviceUmd]

// const outPath = path.join(
//    APP,
//    "..",
//    "..",
//    "web",
//    "assets",
//    "ab_plugins",
//    "ab-abmvc"
// );
const outPath = path.join(APP, "dev");

let configs = null;
let myChanges = {
   output: {
      path: outPath,
   },
   mode: "development",
   devtool: "source-map",
};

if (Array.isArray(commons)) {
   configs = commons.map((cfg) => merge(cfg, myChanges));
} else {
   configs = merge(commons, myChanges);
}
module.exports = configs;
