import Database from 'better-sqlite3'

const db = new Database('database.db')

// Initialize the database with the necessary tables
db.exec(`
  CREATE TABLE IF NOT EXISTS users (
    id TEXT PRIMARY KEY,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    createdAt INTEGER NOT NULL
  );

  CREATE TABLE IF NOT EXISTS books (
    id TEXT PRIMARY KEY,
    userId TEXT NOT NULL,
    title TEXT NOT NULL,
    author TEXT NOT NULL,
    category TEXT NOT NULL,
    status TEXT CHECK(status IN ('want-to-read', 'reading', 'read')) NOT NULL,
    addedAt INTEGER NOT NULL,
    FOREIGN KEY (userId) REFERENCES users(id)
  );
`)

export { db }
