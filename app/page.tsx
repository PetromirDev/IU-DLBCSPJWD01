import Footer from '@/components/Footer'
import Header from '@/components/Header'
import LandingButtons from '@/components/LandingButtons'

export default function Home() {
	return (
		<div className="flex flex-col justify-between min-h-screen">
			<Header variant="landing" />
			<main className="lg:flex-1">
				<section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-white">
					<div className="container">
						<div className="flex flex-col items-center space-y-4 text-center">
							<div className="space-y-2">
								<h1 className="text-3xl font-bold tracking-tighter mb-4 sm:text-4xl md:text-4xl lg:text-6xl">
									Track Your Reading Journey
								</h1>
								<p className="mx-auto max-w-[700px] text-muted-foreground mb-4 md:text-lg">
									Organize your books, track your progress, and never lose sight of what you want to read next.
								</p>
							</div>
							<LandingButtons />
						</div>
					</div>
				</section>
			</main>
			<Footer />
		</div>
	)
}
