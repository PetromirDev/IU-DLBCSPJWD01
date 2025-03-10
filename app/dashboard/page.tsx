'use client'

import { useState, useEffect } from 'react'
import { Plus } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { BookCard } from './components/BookCard'
import { AddBookDialog } from './components/AddBookDialog'
import type { Book } from '@/types/book'
import { addBookAction, updateBookAction, removeBookAction, getUserBooksAction } from '@/app/actions/books'
import { PrivateRoute } from '@/components/PrivateRoute'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { BOOK_STATUSES } from '@/constants/books'
import { toast } from 'sonner'

export default function Dashboard() {
	const [books, setBooks] = useState<Book[]>([])
	const [searchQuery, setSearchQuery] = useState('')
	const [isAddBookOpen, setIsAddBookOpen] = useState(false)

	// Fetch books on mount
	useEffect(() => {
		fetchBooks()
	}, [])

	const fetchBooks = async () => {
		const result = await getUserBooksAction()
		if (result.success && result.books) {
			setBooks(result.books)
		}
	}

	const handleAddBook = async (book: Omit<Book, 'id' | 'addedAt' | 'userId'>) => {
		const result = await addBookAction(book)
		if (result.success && result.book) {
			setBooks([result.book, ...books])
			setIsAddBookOpen(false)
		} else {
			toast.error('Failed to add book :( Please try again.')
		}
	}

	const handleUpdateBook = async (updatedBook: Book) => {
		const result = await updateBookAction(updatedBook)
		if (result.success) {
			setBooks(books.map((book) => (book.id === updatedBook.id ? updatedBook : book)))
		} else {
			toast.error('Failed to update book :( Please try again.')
		}
	}

	const handleDeleteBook = async (bookId: string) => {
		const result = await removeBookAction(bookId)
		if (result.success) {
			setBooks(books.filter((book) => book.id !== bookId))
		} else {
			toast.error('Failed to delete book :( Please try again.')
		}
	}

	const filteredAndSortedBooks = books
		.filter((book) => {
			if (!searchQuery) return true
			const query = searchQuery.toLowerCase()
			return (
				book.title.toLowerCase().includes(query) ||
				book.author.toLowerCase().includes(query) ||
				book.category.toLowerCase().includes(query)
			)
		})
		.sort((a, b) => {
			// Order by title if the status is the same
			if (a.status === b.status) {
				return a.title.localeCompare(b.title)
			}

			// Order by status
			return BOOK_STATUSES.indexOf(a.status) - BOOK_STATUSES.indexOf(b.status)
		})

	return (
		<PrivateRoute>
			<div className="flex flex-col min-h-screen">
				<Header />
				<main className="flex-1 container py-6 pt-8 lg:pt-12">
					<div className="flex items-center gap-4 justify-between mb-12 lg:mb-16">
						<Input
							type="text"
							placeholder="Search books..."
							value={searchQuery}
							onChange={(e) => setSearchQuery(e.target.value)}
							className="max-w-md"
						/>
						<Button onClick={() => setIsAddBookOpen(true)}>
							<Plus className="h-4 w-4 mr-2" /> Add Book
						</Button>
					</div>

					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
						{filteredAndSortedBooks.map((book) => (
							<BookCard key={book.id} book={book} onUpdate={handleUpdateBook} onDelete={handleDeleteBook} />
						))}
					</div>
					{filteredAndSortedBooks.length === 0 && (
						<>
							<p className="text-center text-muted-foreground">
								{!searchQuery ? 'No books found. Ready to add your first book?' : `No books match "${searchQuery}"`}
							</p>
						</>
					)}

					<AddBookDialog open={isAddBookOpen} onOpenChange={setIsAddBookOpen} onAddBook={handleAddBook} />
				</main>
				<Footer />
			</div>
		</PrivateRoute>
	)
}
