/**
 * Optional loader when something invokes `register(pluginAPI)` directly (not the URL/VM path).
 * Prefer consuming `AB.abMvc` after the webpack service bundle runs (see service.js).
 */
const lib = require("./service/serviceRegister.js");

module.exports = function register(API) {
   if (API.platform === "service" && API.AB) {
      API.AB.abMvc = lib;
   }
   if (typeof API.registerLib === "function") {
      API.registerLib("ab_mvc", lib);
   }
};
