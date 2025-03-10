import type { Metadata } from 'next'
import { Roboto } from 'next/font/google'
import './globals.css'
import { AuthProvider } from '@/contexts/AuthContext'
import { Toaster } from '@/components/ui/sonner'

const roboto = Roboto({
	variable: '--font-roboto',
	subsets: ['latin']
})

export const metadata: Metadata = {
	title: 'BookTrack | built for IU',
	description: 'A modern book wishlist and tracking application developed by Petromir Petrov for IU course DLBCSPJWD01'
}

export default function RootLayout({
	children
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<html lang="en">
			<body className={`${roboto.variable} antialiased`}>
				<AuthProvider>{children}</AuthProvider>
				<Toaster />
			</body>
		</html>
	)
}
