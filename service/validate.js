/**
 * Cross-row and BPMN consistency checks after Zod parse.
 */

function validateBundleSemantics(bundle) {
   const { process: proc, children } = bundle;
   const inner = proc.json;

   if (inner.id !== proc.id) {
      throw new Error(
         `process.json.id (${inner.id}) must match process.id (${proc.id})`
      );
   }

   const childById = new Map(children.map((c) => [c.id, c]));
   if (childById.size !== children.length) {
      throw new Error("duplicate child definition id in bundle.children");
   }

   for (const elId of inner.elementIDs) {
      if (!childById.has(elId)) {
         throw new Error(
            `process.json.elementIDs entry ${elId} has no matching child row`
         );
      }
   }

   const xml = inner.xmlDefinition;

   for (let i = 0; i < children.length; i++) {
      const row = children[i];
      const j = row.json;

      if (j.processID != null && j.processID !== proc.id) {
         throw new Error(
            `child[${i}] json.processID must match process id (${proc.id})`
         );
      }

      if (j.id != null && j.id !== row.id) {
         throw new Error(`child[${i}] json.id must match row id (${row.id})`);
      }

      const diagramID = j.diagramID;
      if (diagramID != null && typeof diagramID === "string") {
         if (!xml.includes(diagramID)) {
            throw new Error(
               `child[${i}] json.diagramID "${diagramID}" not found in process.json.xmlDefinition`
            );
         }
      }
   }

   return bundle;
}

module.exports = {
   validateBundleSemantics,
};
