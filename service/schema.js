/**
 * Zod schema for DefinitionBundle (process row + child definition rows).
 * @see lib/DEFINITION_SCHEMA.md
 */

const { z } = require("zod");

const translationSchema = z.object({
   language_code: z.string(),
   label: z.string(),
});

const processInnerJsonSchema = z
   .object({
      id: z.string().uuid(),
      name: z.string(),
      translations: z.array(translationSchema),
      xmlDefinition: z.string().min(1),
      elementIDs: z.array(z.string().uuid()),
      connections: z.record(z.unknown()),
   })
   .passthrough();

const definitionRowSchema = z
   .object({
      id: z.string().uuid(),
      name: z.string(),
      type: z.string().min(1),
      json: z.any(),
   })
   .strict();

const definitionBundleSchema = z.object({
   process: z
      .object({
         id: z.string().uuid(),
         name: z.string(),
         type: z.literal("process"),
         json: processInnerJsonSchema,
      })
      .strict(),
   children: z.array(definitionRowSchema),
});

module.exports = {
   definitionBundleSchema,
   processInnerJsonSchema,
   definitionRowSchema,
};
