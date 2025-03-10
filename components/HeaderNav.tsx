'use client'
import React, { FC } from 'react'
import { Button } from './ui/button'
import { useAuth } from '@/contexts/AuthContext'
import Link from 'next/link'

type Props = {
	variant?: 'landing' | 'in-app'
}

const HeaderNav: FC<Props> = ({ variant = 'in-app' }) => {
	const { user, logout, loading } = useAuth()

	if (loading) return null

	if (variant === 'in-app') {
		return (
			<Button variant="secondary" onClick={logout}>
				Logout
			</Button>
		)
	}

	return !user ? (
		<Link href="/signup">
			<Button>Get Started</Button>
		</Link>
	) : (
		<Link href="/dashboard">
			<Button>To the Dashboard</Button>
		</Link>
	)
}

export default HeaderNav
