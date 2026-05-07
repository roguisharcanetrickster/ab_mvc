// developer/plugins/ab_plugin_ab_mvc/webpack.common.js
// Builds:
//   1) browserEsm: web.js + properties.js -> ABAbMvc_web.mjs / ABAbMvc_properties.mjs
//      (loaded by the ABDesigner runtime as ESM modules)
//   2) serviceUmd: service.js -> ABAbMvc_service.js (loaded server-side via VM)
const path = require("path");
const APP = path.resolve(__dirname);
const webpack = require("webpack");

const common = {
   context: APP,
   module: {
      rules: [
         { test: /\.css$/, use: ["style-loader"] },
         { test: /\.css$/, loader: "css-loader", options: { url: false } },
         {
            test: /\.(eot|woff|woff2|svg|ttf)([?]?.*)$/,
            use: ["url-loader?limit=10000000"],
         },
         {
            test: /\.js$/,
            exclude: /node_modules/,
            use: {
               loader: "babel-loader",
               options: {
                  presets: [["@babel/preset-env", { modules: false }]],
               },
            },
         },
      ],
   },
   plugins: [
      new webpack.DefinePlugin({
         WEBPACK_MODE: JSON.stringify("production"),
         VERSION: JSON.stringify(process.env.npm_package_version),
      }),
   ],
   resolve: {
      fallback: {},
   },
};

const browserEsm = {
   ...common,
   name: "browserEsm",
   entry: {
      web: path.join(APP, "web.js"),
      properties: path.join(APP, "properties.js"),
   },
   output: {
      filename: "ABAbMvc_[name].mjs",
      module: true,
      iife: false,
      chunkFormat: "module",
      library: { type: "module" },
   },
   experiments: {
      outputModule: true,
   },
   target: ["web", "es2020"],
   optimization: { runtimeChunk: false, splitChunks: false },
};

const serviceUmd = {
   ...common,
   name: "serviceUmd",
   entry: { service: path.join(APP, "service.js") },
   output: {
      filename: "ABAbMvc_service.js",
      library: { name: "Plugin", type: "umd" },
      globalObject: "this",
   },
   target: "node",
};

module.exports = [browserEsm, serviceUmd];
