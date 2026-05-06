"use strict";

const { z } = require("zod");

/** Single row stored in appbuilder_definition */
const definitionRowSchema = z.object({
   id: z.string().min(1),
   name: z.string(),
   type: z.string().min(1),
   json: z.any(),
});

const processInnerJsonSchema = z.object({
   id: z.string(),
   name: z.string(),
   translations: z.array(z.object({
      language_code: z.string(),
      label: z.string(),
   })),
   xmlDefinition: z.string().min(1),
   elementIDs: z.array(z.string()),
   connections: z.record(z.string(), z.object({
      id: z.string(),
      type: z.string(),
      from: z.string(),
      to: z.string(),
   }).passthrough()),
}).passthrough();

const definitionBundleSchema = z.object({
   process: definitionRowSchema.extend({
      type: z.literal("process"),
      json: processInnerJsonSchema,
   }),
   children: z.array(definitionRowSchema),
});

/**
 * @param {unknown} bundle
 * @returns {{ ok: true, data: import('zod').infer<typeof definitionBundleSchema> } | { ok: false, errors: string[] }}
 */
function validateDefinitionBundle(bundle) {
   const parsed = definitionBundleSchema.safeParse(bundle);
   if (!parsed.success) {
      const errors = parsed.error.errors.map((e) => `${e.path.join(".")}: ${e.message}`);
      return { ok: false, errors };
   }
   const data = parsed.data;
   const errors = [];

   if (data.process.id !== data.process.json.id) {
      errors.push("process.id must equal process.json.id");
   }
   if (data.process.json.elementIDs.length !== data.children.length) {
      errors.push(
         `elementIDs length (${data.process.json.elementIDs.length}) must equal children length (${data.children.length})`,
      );
   }

   const childIds = new Set(data.children.map((c) => c.id));
   for (const eid of data.process.json.elementIDs) {
      if (!childIds.has(eid)) {
         errors.push(`elementIDs contains ${eid} with no matching child row`);
      }
   }

   const procId = data.process.id;
   for (const child of data.children) {
      const j = child.json;
      if (typeof j.processID === "string" && j.processID !== procId) {
         errors.push(`child ${child.id} json.processID must equal process id`);
      }
      if (child.type !== "process" && typeof j.diagramID !== "string") {
         errors.push(`child ${child.id} (${child.type}) should set json.diagramID for BPMN linkage`);
      }
   }

   if (errors.length) {
      return { ok: false, errors };
   }
   return { ok: true, data };
}

module.exports = {
   definitionRowSchema,
   processInnerJsonSchema,
   definitionBundleSchema,
   validateDefinitionBundle,
};
