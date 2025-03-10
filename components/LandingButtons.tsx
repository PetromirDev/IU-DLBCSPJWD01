'use client'
import { useAuth } from '@/contexts/AuthContext'
import Link from 'next/link'
import React from 'react'
import { Button } from './ui/button'

const LandingButtons = () => {
	const { user, loading } = useAuth()

	if (loading) return null

	return (
		<div className="space-x-4">
			<Link href={user ? '/dashboard' : '/signup'}>
				<Button size="lg">{user ? 'To the Dashboard' : 'Get Started'}</Button>
			</Link>
			{!user && (
				<Link href="/login">
					<Button variant="outline" size="lg">
						Login
					</Button>
				</Link>
			)}
		</div>
	)
}

export default LandingButtons
