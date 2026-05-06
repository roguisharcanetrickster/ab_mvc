// developer/plugins/ab_plugin_ab_mvc/webpack.common.js — service UMD bundle only
const path = require("path");
const APP = path.resolve(__dirname);

const common = {
   context: APP,
   module: {
      rules: [
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
   resolve: {
      fallback: {},
   },
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

module.exports = serviceUmd;
