import db from "./client.js";

export async function getAllFolders() {
  const sql = `
    SELECT *
    FROM folders
    ORDER BY id;
  `;

  const result = await db.query(sql);
  return result.rows;
}

export async function getFolderById(folderId) {
  const sql = `
    SELECT
      folders.*,
      json_agg(files.*) AS files
    FROM folders
    LEFT JOIN files
      ON folders.id = files.folder_id
    WHERE folders.id = $1
    GROUP BY folders.id;
  `;

  const result = await db.query(sql, [folderId]);
  return result.rows[0];
}
