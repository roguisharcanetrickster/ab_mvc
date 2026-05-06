"use strict";

const { z } = require("zod");
const { generateLeaderInterviewBundle } = require("./agent.js");
const { validateDefinitionBundle } = require("./schema.js");
const { publishDefinitionBundleToDb } = require("./persist.js");

/** @param {import('@modelcontextprotocol/sdk/server/mcp.js').McpServer} mcp */
function registerAbMvcTools(mcp) {
   const bundleOutputSchema = z.object({
      workflowKey: z.string().optional(),
      mode: z.string().optional(),
      bundle: z.record(z.string(), z.unknown()),
   });

   mcp.registerTool(
      "generate_leader_interview_process",
      {
         description:
            "Generate full WORKFLOW 2: LEADER INTERVIEW PROCESS DefinitionBundle (BPMN xmlDefinition + task/trigger rows). Uses OpenAI when OPENAI_API_KEY is set, else stub.",
         outputSchema: bundleOutputSchema,
      },
      async () => {
         const result = await generateLeaderInterviewBundle();
         return {
            content: [{ type: "text", text: JSON.stringify(result, null, 2) }],
            structuredContent: result,
         };
      },
   );

   mcp.registerTool(
      "validate_definition_bundle",
      {
         description: "Validate a DefinitionBundle (process + children) for AppBuilder.",
         inputSchema: z.object({
            bundle: z.record(z.string(), z.unknown()),
         }),
         outputSchema: z.object({
            ok: z.boolean(),
            errors: z.array(z.string()).optional(),
         }),
      },
      async ({ bundle }) => {
         const v = validateDefinitionBundle(bundle);
         const payload = v.ok ? { ok: true } : { ok: false, errors: v.errors };
         return {
            content: [{ type: "text", text: JSON.stringify(payload) }],
            structuredContent: payload,
         };
      },
   );

   mcp.registerTool(
      "publish_definitions_to_db",
      {
         description:
            "Insert or replace rows in appbuilder_definition from a bundle (requires MYSQL_* env).",
         inputSchema: z.object({
            bundle: z.record(z.string(), z.unknown()),
         }),
         outputSchema: z.object({
            inserted: z.number(),
         }),
      },
      async ({ bundle }) => {
         const out = await publishDefinitionBundleToDb(bundle);
         return {
            content: [{ type: "text", text: JSON.stringify(out) }],
            structuredContent: out,
         };
      },
   );
}

module.exports = { registerAbMvcTools };
