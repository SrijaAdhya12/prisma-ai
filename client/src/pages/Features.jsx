import { motion, AnimatePresence } from 'framer-motion'
import { Navbar, FeatureCard } from '@/components'
import { features } from '@/data'

const Features = () => {
	return (
		<div id="features" className="dark:bg-grid-white/[0.2] bg-grid-black/[0.2] min-h-screen">
			<Navbar />
			{/* Radial gradient for the container to give a faded look */}
			<div className="pointer-events-none fixed inset-0 flex h-full min-h-screen flex-col items-center justify-center bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)] dark:bg-black" />
			<main className="overflow-none relative z-10">
				<div className="container z-20 mx-auto py-14">
					<h1 className="bg-gradient-to-b from-neutral-200 to-neutral-500 bg-clip-text pt-7 text-center text-4xl font-bold text-transparent sm:text-4xl md:text-5xl">
						Welcome to Your Mental Health Journey
					</h1>
					<h3 className="mb-12 bg-gradient-to-b from-neutral-200 to-neutral-500 bg-clip-text pt-7 text-center text-lg font-bold text-transparent">
						Explore our features designed to support your well-being
					</h3>
					<div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
						<AnimatePresence>
							{features.map((feature) => (
								<motion.div
									key={feature.title}
									initial={{ opacity: 0, y: 20 }}
									animate={{ opacity: 1, y: 0 }}
									exit={{ opacity: 0, y: -20 }}
									transition={{ duration: 0.3 }}
								>
									<FeatureCard feature={feature} />
								</motion.div>
							))}
						</AnimatePresence>
					</div>
				</div>
			</main>
		</div>
	)
}

export default Features
