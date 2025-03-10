'use client'

import { useState } from 'react'
import type { Book } from '@/types/book'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { EditBookDialog } from './EditBookDialog'
import { MoreHorizontal } from 'lucide-react'
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle
} from '@/components/ui/alert-dialog'
import { BOOK_STATUS_MAP } from '@/constants/books'

interface BookCardProps {
	book: Book
	onUpdate: (book: Book) => void
	onDelete: (id: string) => void
}

export function BookCard({ book, onUpdate, onDelete }: BookCardProps) {
	const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
	const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)

	const getStatusColor = (status: string) => {
		switch (status) {
			case 'want-to-read':
				return 'bg-blue-100 text-blue-800 hover:bg-blue-100/80 dark:bg-blue-800/20 dark:text-blue-300'
			case 'reading':
				return 'bg-amber-100 text-amber-800 hover:bg-amber-100/80 dark:bg-amber-800/20 dark:text-amber-300'
			case 'read':
				return 'bg-green-100 text-green-800 hover:bg-green-100/80 dark:bg-green-800/20 dark:text-green-300'
			default:
				return ''
		}
	}

	return (
		<>
			<Card className="gap-2">
				<CardHeader className="pb-2">
					<div className="flex justify-between items-start">
						<CardTitle className="line-clamp-1">{book.title}</CardTitle>
						<DropdownMenu>
							<DropdownMenuTrigger asChild>
								<Button variant="ghost" size="icon" className="h-8 w-8">
									<MoreHorizontal className="h-4 w-4" />
									<span className="sr-only">Open menu</span>
								</Button>
							</DropdownMenuTrigger>
							<DropdownMenuContent align="end">
								<DropdownMenuItem onClick={() => setIsEditDialogOpen(true)}>Edit</DropdownMenuItem>
								<DropdownMenuItem
									className="text-destructive focus:text-destructive"
									onClick={() => setIsDeleteDialogOpen(true)}>
									Delete
								</DropdownMenuItem>
							</DropdownMenuContent>
						</DropdownMenu>
					</div>
				</CardHeader>
				<CardContent>
					<div className="space-y-2">
						<p className="text-sm text-muted-foreground">
							<span className="font-medium">Author:</span> {book.author}
						</p>
						<p className="text-sm text-muted-foreground">
							<span className="font-medium">Category:</span> {book.category}
						</p>
						<div className="pt-2"></div>
					</div>
				</CardContent>
				<CardFooter className="flex justify-between align-center text-xs text-muted-foreground">
					<span>Added on {new Date(book.addedAt).toLocaleDateString()}</span>
					<Badge className={getStatusColor(book.status)} variant="outline">
						{BOOK_STATUS_MAP[book.status]}
					</Badge>
				</CardFooter>
			</Card>

			<EditBookDialog book={book} open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen} onSave={onUpdate} />

			<AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
				<AlertDialogContent>
					<AlertDialogHeader>
						<AlertDialogTitle>Are you sure?</AlertDialogTitle>
						<AlertDialogDescription>
							This will permanently delete &quot;{book.title}&quot; from your book list.
						</AlertDialogDescription>
					</AlertDialogHeader>
					<AlertDialogFooter>
						<AlertDialogCancel>Cancel</AlertDialogCancel>
						<AlertDialogAction
							onClick={() => onDelete(book.id)}
							className="bg-destructive text-white hover:bg-destructive/90">
							Delete
						</AlertDialogAction>
					</AlertDialogFooter>
				</AlertDialogContent>
			</AlertDialog>
		</>
	)
}
