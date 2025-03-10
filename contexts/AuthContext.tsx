'use client'

import type React from 'react'
import { createContext, useContext, useState, useEffect } from 'react'
import type { User } from '@/types/user'
import { getCurrentUser, login, logout, signUp } from '@/app/actions/users'
import { useRouter } from 'next/navigation'

interface AuthContextType {
	user: User | null
	loading: boolean
	login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>
	logout: () => Promise<void>
	signUp: (email: string, password: string) => Promise<{ success: boolean; error?: string }>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
	const router = useRouter()
	const [user, setUser] = useState<User | null>(null)
	const [loading, setLoading] = useState(true)

	useEffect(() => {
		const initAuth = async () => {
			try {
				const currentUser = await getCurrentUser()
				setUser(currentUser)
			} catch (error) {
				console.error('Error initializing auth:', error)
			} finally {
				setLoading(false)
			}
		}
		initAuth()
	}, [])

	const handleLogin = async (email: string, password: string) => {
		const result = await login(email, password)
		if (result.success) {
			setUser(result.user ?? null)
		}
		return result
	}

	const handleLogout = async () => {
		await logout()
		setUser(null)
		router.push('/')
	}

	const handleSignUp = async (email: string, password: string) => {
		const result = await signUp(email, password)
		if (result.success) {
			setUser(result.user ?? null)
		}
		return result
	}

	return (
		<AuthContext.Provider value={{ user, loading, login: handleLogin, logout: handleLogout, signUp: handleSignUp }}>
			{children}
		</AuthContext.Provider>
	)
}

export const useAuth = () => {
	const context = useContext(AuthContext)
	if (context === undefined) {
		throw new Error('useAuth must be used within an AuthProvider')
	}
	return context
}
