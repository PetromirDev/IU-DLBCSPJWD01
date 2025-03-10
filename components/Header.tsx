import Link from 'next/link'
import { BookOpen } from 'lucide-react'
import { FC } from 'react'
import HeaderNav from './HeaderNav'

type Props = {
	variant?: 'landing' | 'in-app'
}

const Header: FC<Props> = ({ variant }) => {
	return (
		<header className="border-b">
			<div className="flex items-center h-14 container">
				<Link className="flex items-center justify-center" href="/">
					<BookOpen className="h-6 w-6 text-primary" />
					<span className="ml-2 text-xl font-bold">BookTrack</span>
				</Link>
				<nav className="ml-auto flex gap-4 sm:gap-6">
					<HeaderNav variant={variant} />
				</nav>
			</div>
		</header>
	)
}

export default Header
