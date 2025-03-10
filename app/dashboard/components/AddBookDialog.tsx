'use client'

import type React from 'react'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import type { Book } from '@/types/book'
import { MAX_BOOK_AUTHOR_LENGTH, MAX_BOOK_CATEGORY_LENGTH, MAX_BOOK_TITLE_LENGTH } from '@/constants/books'
import { toast } from 'sonner'
import { addBookAction } from '@/app/actions/books'

interface AddBookDialogProps {
	open: boolean
	onOpenChange: (open: boolean) => void
	onAddBook: (book: Omit<Book, 'id' | 'addedAt' | 'userId'>) => void
}

export function AddBookDialog({ open, onOpenChange, onAddBook }: AddBookDialogProps) {
	const [title, setTitle] = useState('')
	const [author, setAuthor] = useState('')
	const [category, setCategory] = useState('')
	const [status, setStatus] = useState<Book['status'] | null>(null)

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault()

		if (!title || !author || !category || !status) {
			toast.error('Please fill out all fields.')
			return
		}

		try {
			const book = {
				title,
				author,
				category,
				status
			}
			const result = await addBookAction(book)
			if (result.success && result.book) {
				onAddBook(book)
				// Reset form
				setTitle('')
				setAuthor('')
				setCategory('')
				setStatus(null)

				onOpenChange(false)
			} else {
				toast.error(result.error || 'Failed to add book :( Please try again.')
			}
		} catch {
			toast.error('Failed to add book :( Please try again.')
		}
	}

	return (
		<Dialog open={open} onOpenChange={onOpenChange}>
			<DialogContent className="sm:max-w-[425px]">
				<form onSubmit={handleSubmit}>
					<DialogHeader>
						<DialogTitle>Add New Book</DialogTitle>
						<DialogDescription>Add a new book to your reading list.</DialogDescription>
					</DialogHeader>
					<div className="grid gap-4 py-4">
						<div className="grid gap-2">
							<Label htmlFor="title">Title</Label>
							<Input
								id="title"
								value={title}
								onChange={(e) => setTitle(e.target.value)}
								placeholder="Enter book title"
								maxLength={MAX_BOOK_TITLE_LENGTH}
								required
							/>
						</div>
						<div className="grid gap-2">
							<Label htmlFor="author">Author</Label>
							<Input
								id="author"
								value={author}
								onChange={(e) => setAuthor(e.target.value)}
								placeholder="Enter author name"
								maxLength={MAX_BOOK_AUTHOR_LENGTH}
								required
							/>
						</div>
						<div className="grid gap-2">
							<Label htmlFor="category">Category</Label>
							<Input
								id="category"
								value={category}
								onChange={(e) => setCategory(e.target.value)}
								placeholder="E.g., Fiction, Non-Fiction, Fantasy"
								maxLength={MAX_BOOK_CATEGORY_LENGTH}
								required
							/>
						</div>
						<div className="grid gap-2">
							<Label htmlFor="status">Reading Status</Label>
							<Select required value={status || ''} onValueChange={(value) => setStatus(value as Book['status'])}>
								<SelectTrigger id="status">
									<SelectValue placeholder="Select status" />
								</SelectTrigger>
								<SelectContent>
									<SelectItem value="want-to-read">Want to Read</SelectItem>
									<SelectItem value="reading">Reading</SelectItem>
									<SelectItem value="read">Read</SelectItem>
								</SelectContent>
							</Select>
						</div>
					</div>
					<DialogFooter>
						<Button type="submit">Add Book</Button>
					</DialogFooter>
				</form>
			</DialogContent>
		</Dialog>
	)
}
