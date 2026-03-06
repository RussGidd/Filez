import pg from "pg";

const db = new pg.Client("postgres://postgres@localhost:5432/filez");

export default db;