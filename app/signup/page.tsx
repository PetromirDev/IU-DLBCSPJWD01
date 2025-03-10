'use client'

import type React from 'react'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/contexts/AuthContext'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { MAXIMUM_PASSWORD_LENGTH, MINIMUM_PASSWORD_LENGTH } from '@/constants/user'

export default function SignUpPage() {
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [confirmPassword, setConfirmPassword] = useState('')
	const [error, setError] = useState('')
	const { signUp } = useAuth()
	const router = useRouter()

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault()
		setError('')

		if (password !== confirmPassword) {
			setError('Passwords do not match')
			return
		}

		try {
			const result = await signUp(email, password)

			if (result.success) {
				router.push('/dashboard')
			} else {
				setError(result.error || 'An error occurred while creating an account. Please try again.')
			}
		} catch (e) {
			console.error(e)
			setError('An error occurred while creating an account. Please try again.')
		}
	}

	return (
		<div className="flex min-h-screen items-center justify-center px-4 py-12">
			<Card className="w-full max-w-md">
				<form onSubmit={handleSubmit}>
					<CardHeader className="mb-4">
						<CardTitle className="text-2xl font-bold">Create an account</CardTitle>
					</CardHeader>
					<CardContent className="mb-6 space-y-4">
						<div className="space-y-2">
							<Label htmlFor="email">Email</Label>
							<Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
						</div>
						<div className="space-y-2">
							<Label htmlFor="password">Password</Label>
							<Input
								id="password"
								type="password"
								value={password}
								onChange={(e) => setPassword(e.target.value)}
								minLength={MINIMUM_PASSWORD_LENGTH}
								maxLength={MAXIMUM_PASSWORD_LENGTH}
								required
							/>
						</div>
						<div className="space-y-2">
							<Label htmlFor="confirm-password">Confirm Password</Label>
							<Input
								id="confirm-password"
								type="password"
								value={confirmPassword}
								onChange={(e) => setConfirmPassword(e.target.value)}
								minLength={MINIMUM_PASSWORD_LENGTH}
								maxLength={MAXIMUM_PASSWORD_LENGTH}
								required
							/>
						</div>
						{error && <p className="text-sm text-red-500">{error}</p>}
					</CardContent>
					<CardFooter className="flex flex-col space-y-4">
						<Button className="w-full" type="submit">
							Create account
						</Button>
						<div className="text-center text-sm">
							Already have an account?{' '}
							<Link className="underline underline-offset-4 hover:text-primary" href="/login">
								Login
							</Link>
						</div>
					</CardFooter>
				</form>
			</Card>
		</div>
	)
}
