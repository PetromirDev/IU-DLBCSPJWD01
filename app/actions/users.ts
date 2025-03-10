'use server'

import { cookies } from 'next/headers'
import { createUser, getUserByEmail, validateUser } from '@/lib/db/users'
import { User } from '@/types/user'
import { MAXIMUM_PASSWORD_LENGTH, MINIMUM_PASSWORD_LENGTH } from '@/constants/user'

/**
 * Signs up a new user by creating a new user in the database and setting the user cookie
 */
export async function signUp(email: string, password: string) {
	// Validate the user input
	if (!email || !password) {
		return { success: false, error: 'Email and password are required.' }
	}
	if (password.length < MINIMUM_PASSWORD_LENGTH) {
		return { success: false, error: `Password must be at least ${MINIMUM_PASSWORD_LENGTH} characters.` }
	}
	if (password.length > MAXIMUM_PASSWORD_LENGTH) {
		return { success: false, error: `Password must be at most ${MAXIMUM_PASSWORD_LENGTH} characters.` }
	}
	// Check if the user already exists
	if (getUserByEmail(email)) {
		return {
			success: false,
			error: 'Email address is already registered. Please use a different email or sign in with your existing account.'
		}
	}

	// Create the user
	const user = createUser(email, password)

	if (user) {
		const cookie = await cookies()

		cookie.set('user', JSON.stringify(user), {
			httpOnly: true,
			secure: process.env.NODE_ENV === 'production'
		})

		return { success: true, user }
	}

	return { success: false, error: 'Failed to create user' }
}

/**
 * Logs the user in by setting the user cookie
 */
export async function login(email: string, password: string) {
	const user = validateUser(email, password)

	if (user) {
		const cookie = await cookies()

		cookie.set('user', JSON.stringify(user), {
			httpOnly: true,
			secure: process.env.NODE_ENV === 'production'
		})

		return { success: true, user: user }
	}

	return { success: false, error: 'Invalid email or password.' }
}

/**
 * Logs the user out by deleting the user cookie
 */
export async function logout() {
	const cookie = await cookies()
	cookie.delete('user')
}

/**
 * Gets the current user from the user cookie
 */
export async function getCurrentUser(): Promise<User | null> {
	const cookie = (await cookies()).get('user')

	if (!cookie) return null

	try {
		const user = JSON.parse(cookie.value) as User
		const dbUser = getUserByEmail(user.email)

		if (!dbUser) return null

		// Omit the password from the user object
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		const { password, ...userWithoutPassword } = dbUser

		return { ...userWithoutPassword }
	} catch (error) {
		console.error('Error getting current user:', error)

		return null
	}
}
