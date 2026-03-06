import db from "./client.js";

export async function getAllFiles() {
  const sql = `
    SELECT files.*, folders.name AS folder_name
    FROM files
    JOIN folders
    ON files.folder_id = folders.id
    ORDER BY files.id;
  `;

  const result = await db.query(sql);
  return result.rows;
}

export async function createFile(name, size, folderId) {
  const sql = `
    INSERT INTO files (name, size, folder_id)
    VALUES ($1, $2, $3)
    RETURNING *;
  `;

  const result = await db.query(sql, [name, size, folderId]);
  return result.rows[0];
}
