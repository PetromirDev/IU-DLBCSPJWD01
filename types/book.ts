export type Book = {
	id: string
	userId: string
	title: string
	author: string
	category: string
	status: 'want-to-read' | 'reading' | 'read'
	addedAt: number
}
