const { definitionBundleSchema } = require("./schema");
const { validateBundleSemantics } = require("./validate");
const { persistBundle } = require("./persist");

function parseBundle(bundleParam) {
   const raw =
      typeof bundleParam === "string" ? JSON.parse(bundleParam) : bundleParam;
   return definitionBundleSchema.parse(raw);
}

function validateBundle(bundle) {
   definitionBundleSchema.parse(bundle);
   validateBundleSemantics(bundle);
}

module.exports = {
   parseBundle,
   validateBundle,
   persistBundle,
};
