/**
 * Insert process + child rows via AB.definitionCreate; rollback with
 * definitionDestroy on failure (no cross-connection SQL transaction in this stack).
 */

/**
 * @param {object} req - service request (ab-utils)
 * @param {object} AB - ABFactory
 * @param {object} bundle - validated bundle (secrets already processed by caller if needed)
 * @return {Promise<{ process: object, children: object[] }>}
 */
async function persistBundle(req, AB, bundle) {
   const createdIds = [];
   const tryDestroy = async (id) => {
      try {
         if (typeof req.retry === "function") {
            await req.retry(() => AB.definitionDestroy(req, id));
         } else {
            await AB.definitionDestroy(req, id);
         }
      } catch (e) {
         req.log("ab_mvc bundle rollback: destroy failed", id, e);
      }
   };

   const runCreate = (def) => {
      if (typeof req.retry === "function") {
         return req.retry(() => AB.definitionCreate(req, def));
      }
      return AB.definitionCreate(req, def);
   };

   try {
      const processDef = {
         id: bundle.process.id,
         name: bundle.process.name,
         type: bundle.process.type,
         json: bundle.process.json,
      };

      const procRow = await runCreate(processDef);
      createdIds.push(procRow.id);

      const childObjs = [];
      for (const child of bundle.children) {
         const c = {
            id: child.id,
            name: child.name,
            type: child.type,
            json: child.json,
         };
         const row = await runCreate(c);
         createdIds.push(row.id);
         childObjs.push(row.toObj());
      }

      return {
         process: procRow.toObj(),
         children: childObjs,
      };
   } catch (err) {
      for (let i = createdIds.length - 1; i >= 0; i--) {
         await tryDestroy(createdIds[i]);
      }
      throw err;
   }
}

module.exports = {
   persistBundle,
};
