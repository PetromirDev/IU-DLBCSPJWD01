import React from 'react'

const Footer = () => {
	return (
		<footer className="flex justify-center py-6 w-full border-t px-4 md:px-6">
			<p className="text-sm text-muted-foreground text-center">
				Made by{' '}
				<a
					href="https://petromir.dev/"
					target="_blank"
					rel="noopener noreferrer"
					className="inline underline hover:text-primary">
					Petromir Petrov
				</a>{' '}
				| Student at{' '}
				<a
					href="https://www.iu.org/"
					target="_blank"
					rel="noopener noreferrer"
					className="inline underline hover:text-primary">
					IU
				</a>
			</p>
		</footer>
	)
}

export default Footer
