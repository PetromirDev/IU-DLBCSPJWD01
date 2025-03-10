'use server'

import { revalidatePath } from 'next/cache'
import { addBook, updateBook, removeBook, getBooksByUser } from '@/lib/db/books'
import { getCurrentUser } from './users'
import type { Book } from '@/types/book'
import {
	BOOK_STATUSES,
	MAX_BOOK_AUTHOR_LENGTH,
	MAX_BOOK_CATEGORY_LENGTH,
	MAX_BOOK_TITLE_LENGTH
} from '@/constants/books'

/**
 * Adds a new book to the database
 */
export async function addBookAction(book: Omit<Book, 'id' | 'addedAt' | 'userId'>) {
	// Validate the user input
	if (!book.title || !book.author || !book.category) {
		return { success: false, error: 'Title, author, and category are required' }
	}
	if (book.title.length > MAX_BOOK_TITLE_LENGTH) {
		return { success: false, error: `Title must be at most ${MAX_BOOK_TITLE_LENGTH} characters` }
	}
	if (book.category.length > MAX_BOOK_CATEGORY_LENGTH) {
		return { success: false, error: `Category must be at most ${MAX_BOOK_CATEGORY_LENGTH} characters` }
	}
	if (book.author.length > MAX_BOOK_AUTHOR_LENGTH) {
		return { success: false, error: `Author name must be at most ${MAX_BOOK_AUTHOR_LENGTH} characters` }
	}
	if (!BOOK_STATUSES.includes(book.status)) {
		return { success: false, error: 'Invalid status' }
	}
	const user = await getCurrentUser()

	if (!user) {
		return { success: false, error: 'User not authenticated' }
	}

	const newBook = addBook({ ...book, userId: user.id })

	if (newBook) {
		revalidatePath('/dashboard')
		return { success: true, book: newBook }
	}

	return { success: false, error: 'Failed to add book' }
}

/**
 * Updates an existing book in the database
 */
export async function updateBookAction(book: Book) {
	const user = await getCurrentUser()

	if (!user) {
		return { success: false, error: 'User not authenticated' }
	}

	const updatedBook = updateBook({ ...book, userId: user.id })

	if (updatedBook) {
		revalidatePath('/dashboard')
		return { success: true, book: updatedBook }
	}
	return { success: false, error: 'Failed to update book' }
}

/**
 * Removes a book from the database
 */
export async function removeBookAction(bookId: string) {
	const user = await getCurrentUser()

	if (!user) {
		return { success: false, error: 'User not authenticated' }
	}

	const result = removeBook(bookId, user.id)

	if (result) {
		revalidatePath('/dashboard')
		return { success: true }
	}
	return { success: false, error: 'Failed to remove book' }
}

/**
 * Gets all books for the current user
 */
export async function getUserBooksAction() {
	const user = await getCurrentUser()

	if (!user) {
		return { success: false, error: 'User not authenticated' }
	}

	const books = getBooksByUser(user.id)

	return { success: true, books }
}
