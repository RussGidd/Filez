import db from "./client.js";

async function createFolder(name) {
  const sql = `
    INSERT INTO folders (name)
    VALUES ($1)
    RETURNING *;
  `;

  const result = await db.query(sql, [name]);
  return result.rows[0];
}

async function createFile(name, size, folderId) {
  const sql = `
    INSERT INTO files (name, size, folder_id)
    VALUES ($1, $2, $3)
    RETURNING *;
  `;

  const result = await db.query(sql, [name, size, folderId]);
  return result.rows[0];
}

async function seedDatabase() {
  await db.connect();

  const workFolder = await createFolder("Work");
  const schoolFolder = await createFolder("School");
  const photosFolder = await createFolder("Photos");

  await createFile("resume.pdf", 120, workFolder.id);
  await createFile("project-notes.txt", 45, workFolder.id);
  await createFile("budget.xlsx", 200, workFolder.id);
  await createFile("meeting-agenda.docx", 95, workFolder.id);
  await createFile("invoice.pdf", 110, workFolder.id);

  await createFile("homework1.txt", 25, schoolFolder.id);
  await createFile("lecture-notes.pdf", 180, schoolFolder.id);
  await createFile("study-guide.docx", 75, schoolFolder.id);
  await createFile("quiz-review.txt", 30, schoolFolder.id);
  await createFile("schedule.pdf", 60, schoolFolder.id);

  await createFile("vacation1.jpg", 500, photosFolder.id);
  await createFile("vacation2.jpg", 520, photosFolder.id);
  await createFile("family.png", 410, photosFolder.id);
  await createFile("dog-photo.jpg", 390, photosFolder.id);
  await createFile("sunset.png", 430, photosFolder.id);

  await db.end();
  console.log("Database seeded.");
}

seedDatabase().catch(async function (error) {
  console.error(error);
  await db.end();
});
