import { useEffect, useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { features } from '@/data'
import { motion, AnimatePresence } from 'framer-motion'

const Solutions = () => {
	const [activeIndex, setActiveIndex] = useState(0)
	const [direction, setDirection] = useState(0)

	useEffect(() => {
		const timer = setInterval(() => {
			setDirection(1)
			setActiveIndex((prevIndex) => (prevIndex + 1) % features.length)
		}, 5000) // Change slide every 5 seconds

		return () => clearInterval(timer)
	}, [])

	const nextFeature = () => {
		setDirection(1)
		setActiveIndex((prevIndex) => (prevIndex + 1) % features.length)
	}

	const prevFeature = () => {
		setDirection(-1)
		setActiveIndex((prevIndex) => (prevIndex - 1 + features.length) % features.length)
	}

	const variants = {
		enter: (direction) => ({
			x: direction > 0 ? 1000 : -1000,
			opacity: 0
		}),
		center: {
			zIndex: 1,
			x: 0,
			opacity: 1
		},
		exit: (direction) => ({
			zIndex: 0,
			x: direction < 0 ? 1000 : -1000,
			opacity: 0
		})
	}

	return (
		<section id="solutions" className="container mx-auto my-20">
			<h1 className="my-16 flex justify-center text-3xl font-bold tracking-tighter sm:text-left sm:text-4xl md:text-5xl">
				What We Provide
			</h1>
			<div className="relative h-[500px]">
				<Button
					variant="outline"
					size="icon"
					className="absolute left-0 top-1/2 z-10 -translate-y-1/2 transform"
					onClick={prevFeature}
				>
					<ChevronLeft className="h-4 w-4" />
					<span className="sr-only">Previous feature</span>
				</Button>
				<Button
					variant="outline"
					size="icon"
					className="absolute right-0 top-1/2 z-10 -translate-y-1/2 transform"
					onClick={nextFeature}
				>
					<ChevronRight className="h-4 w-4" />
					<span className="sr-only">Next feature</span>
				</Button>
				<AnimatePresence initial={false} custom={direction}>
					<motion.div
						key={activeIndex}
						custom={direction}
						variants={variants}
						initial="enter"
						animate="center"
						exit="exit"
						transition={{
							x: { type: 'spring', stiffness: 300, damping: 30 },
							opacity: { duration: 0.2 }
						}}
						className="absolute h-full w-full"
					>
						<Card className="flex h-full w-full flex-col justify-between">
							<CardHeader className="text-center">
								<CardTitle className="text-2xl">{features[activeIndex].CardTitle}</CardTitle>
							</CardHeader>
							<img
								className="h-64 w-full object-contain"
								src={features[activeIndex].CardDescription}
								alt={features[activeIndex].CardTitle}
							/>
							<CardContent className="my-5 text-center text-lg">
								{features[activeIndex].CardContent}
							</CardContent>
						</Card>
					</motion.div>
				</AnimatePresence>
			</div>
			<div className="mt-8 flex justify-center">
				{features.map((_, index) => (
					<Button
						key={index}
						variant={index === activeIndex ? 'default' : 'outline'}
						size="sm"
						className="mx-1"
						onClick={() => {
							setDirection(index > activeIndex ? 1 : -1)
							setActiveIndex(index)
						}}
					>
						{index + 1}
					</Button>
				))}
			</div>
		</section>
	)
}

export default Solutions
