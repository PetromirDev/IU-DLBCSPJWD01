import { Book } from '@/types/book'
import { db } from './index'
import { v4 as uuidv4 } from 'uuid'

/**
 * Adds a new book to the database
 */
export function addBook(book: Omit<Book, 'id' | 'addedAt'> & { userId: string }): Book | null {
	const id = uuidv4()
	const addedAt = Date.now()
	try {
		const stmt = db.prepare(
			'INSERT INTO books (id, userId, title, author, category, status, addedAt) VALUES (?, ?, ?, ?, ?, ?, ?)'
		)
		stmt.run(id, book.userId, book.title, book.author, book.category, book.status, addedAt)

		return { id, ...book, addedAt }
	} catch (error) {
		console.error('Error adding book:', error)
		return null
	}
}

/**
 * Updates an existing book in the database
 */
export function updateBook(book: Book): Book | null {
	try {
		const stmt = db.prepare(
			'UPDATE books SET title = ?, author = ?, category = ?, status = ? WHERE id = ? AND userId = ?'
		)
		const result = stmt.run(book.title, book.author, book.category, book.status, book.id, book.userId)
		if (result.changes === 0) {
			return null // Book not found or user doesn't own the book
		}
		return book
	} catch (error) {
		console.error('Error updating book:', error)
		return null
	}
}

/**
 * Removes a book from the database
 */
export function removeBook(bookId: string, userId: string): boolean {
	try {
		const stmt = db.prepare('DELETE FROM books WHERE id = ? AND userId = ?')
		const result = stmt.run(bookId, userId)

		return result.changes > 0
	} catch (error) {
		console.error('Error removing book:', error)

		return false
	}
}

/**
 * Gets all books for the current user
 */
export function getBooksByUser(userId: string): Book[] {
	try {
		const stmt = db.prepare('SELECT * FROM books WHERE userId = ? ORDER BY addedAt DESC')

		return stmt.all(userId) as Book[]
	} catch (error) {
		console.error('Error getting books:', error)
		return []
	}
}
