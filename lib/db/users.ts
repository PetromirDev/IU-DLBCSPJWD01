import { db } from './index'
import bcrypt from 'bcryptjs'
import { v4 as uuidv4 } from 'uuid'
import type { DbUser, User } from '@/types/user'

/**
 * Creates a new user in the database
 */
export function createUser(email: string, password: string): User | null {
	const hashedPassword = bcrypt.hashSync(password, 10)
	const id = uuidv4()
	try {
		const createdAt = Date.now()
		const stmt = db.prepare('INSERT INTO users (id, email, password, createdAt) VALUES (?, ?, ?, ?)')
		stmt.run(id, email, hashedPassword, createdAt)

		return {
			id,
			email,
			createdAt
		}
	} catch (error) {
		console.error('Error creating user:', error)
		return null
	}
}

/**
 * Gets a user by their email address
 */
export function getUserByEmail(email: string): DbUser | null {
	const stmt = db.prepare('SELECT * FROM users WHERE email = ?')
	const user = stmt.get(email) as DbUser | undefined

	return user || null
}

/**
 * Validates a user's email and password
 */
export function validateUser(email: string, password: string): User | null {
	const user = getUserByEmail(email)

	if (user && bcrypt.compareSync(password, user.password)) {
		// Remove the password from the user object before returning it
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		const { password, ...userWithoutPassword } = user

		return userWithoutPassword
	}
	return null
}
