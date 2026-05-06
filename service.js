/**
 * Webpack service entry for UMD bundle `ABAbMvc_service.js`.
 *
 * Tenant bootstrap loads this URL and passes `module.exports.Plugin` to
 * `AB.pluginRegister`, which requires a **function** `(pluginAPI) => class | class[]`.
 * Attach helpers on `pluginAPI.AB.abMvc`; return `[]` when there are no ClassManager types.
 */
const lib = require("./service/serviceRegister.js");

module.exports = function abMvcServicePlugin(pluginAPI) {
   if (pluginAPI && pluginAPI.AB) {
      pluginAPI.AB.abMvc = lib;
   }
   return [];
};
