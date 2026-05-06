"use strict";

const mysql = require("mysql2/promise");
const { validateDefinitionBundle } = require("./schema.js");

/** @type {import('mysql2/promise').Pool | null} */
let pool = null;

function getPool() {
   if (pool) {
      return pool;
   }
   const host = process.env.MYSQL_HOST || "127.0.0.1";
   const port = Number(process.env.MYSQL_PORT || 3306);
   const user = process.env.MYSQL_USER || "root";
   const password = process.env.MYSQL_PASSWORD ?? "";
   const database = process.env.MYSQL_DATABASE || "appbuilder-admin";

   pool = mysql.createPool({
      host,
      port,
      user,
      password,
      database,
      waitForConnections: true,
      connectionLimit: 10,
   });
   return pool;
}

/**
 * Insert or replace all bundle rows in one transaction.
 * @param {unknown} bundle
 * @returns {Promise<{ inserted: number }>}
 */
async function publishDefinitionBundleToDb(bundle) {
   const v = validateDefinitionBundle(bundle);
   if (!v.ok) {
      throw new Error(`Invalid bundle: ${v.errors.join("; ")}`);
   }
   const { data } = v;
   const p = getPool();
   const conn = await p.getConnection();
   const rows = [data.process, ...data.children];
   try {
      await conn.beginTransaction();
      for (const row of rows) {
         const jsonStr = typeof row.json === "string" ? row.json : JSON.stringify(row.json);
         await conn.execute(
            `INSERT INTO appbuilder_definition (id, name, type, json, createdAt, updatedAt)
             VALUES (?, ?, ?, ?, NOW(), NOW())
             ON DUPLICATE KEY UPDATE name = VALUES(name), type = VALUES(type), json = VALUES(json), updatedAt = NOW()`,
            [row.id, row.name, row.type, jsonStr],
         );
      }
      await conn.commit();
      return { inserted: rows.length };
   } catch (e) {
      await conn.rollback();
      throw e;
   } finally {
      conn.release();
   }
}

function resetPoolForTests() {
   pool = null;
}

module.exports = {
   getPool,
   publishDefinitionBundleToDb,
   resetPoolForTests,
};
