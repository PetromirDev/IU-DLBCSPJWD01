export type DbUser = {
	id: string
	email: string
	createdAt: number
	password: string
}

export type User = Omit<DbUser, 'password'>
