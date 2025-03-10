import { v4 as uuidv4 } from 'uuid'
import bcrypt from 'bcryptjs'
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

// Hash password
const hashedPassword = bcrypt.hashSync('iutestacc', 10)

// Generate UUID for user
const userId = uuidv4()

// Create test user
try {
	const insertUser = db.prepare(`
    INSERT INTO users (id, email, password, createdAt)
    VALUES (?, ?, ?, ?)
  `)

	insertUser.run(userId, 'test@iu.org', hashedPassword, Date.now())
	console.log(`Created test user with ID: ${userId}`)
} catch (error) {
	console.log('User might already exist:', error.message)
}

// Create test books
const books = [
	{
		title: 'The Great Gatsby',
		author: 'F. Scott Fitzgerald',
		category: 'Classic',
		status: 'want-to-read'
	},
	{
		title: '1984',
		author: 'George Orwell',
		category: 'Dystopian',
		status: 'reading'
	},
	{
		title: 'To Kill a Mockingbird',
		author: 'Harper Lee',
		category: 'Classic',
		status: 'read'
	},
	{
		title: 'The Hobbit',
		author: 'J.R.R. Tolkien',
		category: 'Fantasy',
		status: 'want-to-read'
	},
	{
		title: 'Clean Code',
		author: 'Robert C. Martin',
		category: 'Programming',
		status: 'read'
	}
]

// Insert books for user
const insertBook = db.prepare(`
  INSERT INTO books (id, userId, title, author, category, status, addedAt)
  VALUES (?, ?, ?, ?, ?, ?, ?)
`)

for (const book of books) {
	try {
		insertBook.run(uuidv4(), userId, book.title, book.author, book.category, book.status, Date.now())
		console.log(`Added book: ${book.title}`)
	} catch (error) {
		console.log(`Error adding book ${book.title}:`, error.message)
	}
}

console.log('Database initialization complete')
db.close()
