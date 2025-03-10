'use client'

import type React from 'react'

import { useState, useEffect } from 'react'
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

interface EditBookDialogProps {
	book: Book
	open: boolean
	onOpenChange: (open: boolean) => void
	onSave: (book: Book) => void
}

export function EditBookDialog({ book, open, onOpenChange, onSave }: EditBookDialogProps) {
	const [title, setTitle] = useState(book.title)
	const [author, setAuthor] = useState(book.author)
	const [category, setCategory] = useState(book.category)
	const [status, setStatus] = useState<Book['status']>(book.status)

	useEffect(() => {
		// Update form when book changes
		setTitle(book.title)
		setAuthor(book.author)
		setCategory(book.category)
		setStatus(book.status)
	}, [book])

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault()

		if (!title || !author || !category) return

		onSave({
			...book,
			title,
			author,
			category,
			status
		})

		onOpenChange(false)
	}

	return (
		<Dialog open={open} onOpenChange={onOpenChange}>
			<DialogContent className="sm:max-w-[425px]">
				<form onSubmit={handleSubmit}>
					<DialogHeader>
						<DialogTitle>Edit Book</DialogTitle>
						<DialogDescription>Make changes to your book details.</DialogDescription>
					</DialogHeader>
					<div className="grid gap-4 py-4">
						<div className="grid gap-2">
							<Label htmlFor="edit-title">Title</Label>
							<Input
								id="edit-title"
								value={title}
								onChange={(e) => setTitle(e.target.value)}
								placeholder="Enter book title"
								required
							/>
						</div>
						<div className="grid gap-2">
							<Label htmlFor="edit-author">Author</Label>
							<Input
								id="edit-author"
								value={author}
								onChange={(e) => setAuthor(e.target.value)}
								placeholder="Enter author name"
								required
							/>
						</div>
						<div className="grid gap-2">
							<Label htmlFor="edit-category">Category</Label>
							<Input
								id="edit-category"
								value={category}
								onChange={(e) => setCategory(e.target.value)}
								placeholder="E.g., Fiction, Non-Fiction, Fantasy"
								required
							/>
						</div>
						<div className="grid gap-2">
							<Label htmlFor="edit-status">Reading Status</Label>
							<Select value={status} onValueChange={(value) => setStatus(value as Book['status'])}>
								<SelectTrigger id="edit-status">
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
						<Button type="submit">Save Changes</Button>
					</DialogFooter>
				</form>
			</DialogContent>
		</Dialog>
	)
}
