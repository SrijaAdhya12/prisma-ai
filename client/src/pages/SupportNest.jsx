import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Slider } from '@/components/ui/slider'
import { motion, AnimatePresence } from 'framer-motion'
import { events } from '@/data'
import { Navbar } from '@/components'
import { Search } from '@/components/ui/search'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Calendar, MapPin, Link } from 'lucide-react'

const EventCard = ({ event }) => {
	const getPriceIndicator = (price) => {
		return <Badge className="bg-red-500">$$$</Badge>
	}

	return (
		<Card className="border-border bg-accent">
			<CardHeader>
				<CardTitle>{event.title}</CardTitle>
				<CardDescription>{event.description}</CardDescription>
			</CardHeader>
			<CardContent>
				<div className="mb-2 flex items-center gap-2">
					<Calendar className="h-4 w-4" />
					<span>
						{event.date} at {event.time}
					</span>
				</div>
				<div className="mb-2 flex items-center gap-2">
					<MapPin className="h-4 w-4" />
					<span>{event.venue}</span>
				</div>
				<div className="flex items-center gap-2">
					<Badge variant="outline">{event.type}</Badge>
					{getPriceIndicator(event.price)}
				</div>
			</CardContent>
			<CardFooter>
				<Button asChild className="w-full">
					<a href={event.link} target="_blank" rel="noopener noreferrer">
						<Link className="mr-2 h-4 w-4" />
						View Event
					</a>
				</Button>
			</CardFooter>
		</Card>
	)
}

const SupportNest = () => {
	const [searchTerm, setSearchTerm] = useState('')
	const [maxPrice, setMaxPrice] = useState(100)
	const [filteredEvents, setFilteredEvents] = useState(events)

	return (
		<div id="support-nest" className="dark:bg-grid-white/[0.2] bg-grid-black/[0.2] min-h-screen">
			<Navbar />
			{/* Radial gradient for the container to give a faded look */}
			<div className="pointer-events-none fixed inset-0 flex h-full min-h-screen flex-col items-center justify-center bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)] dark:bg-black" />
			<main className="overflow-none relative z-10">
				<div className="container z-20 mx-auto py-14">
					<h1 className="mb-8 bg-gradient-to-b from-neutral-200 to-neutral-500 bg-clip-text pt-7 text-center text-4xl font-bold text-transparent">
						Support Nest: A Prisma AI Initiative
					</h1>
					<div className="mb-8 flex flex-col items-center justify-between gap-4 md:flex-row">
						<Search
							type="text"
							placeholder="Search events..."
							value={searchTerm}
							onChange={(e) => setSearchTerm(e.target.value)}
							className="w-full md:w-1/3"
						/>
						<div className="inline-flex items-center gap-4">
							<span>Max Price: ${maxPrice}</span>
							<Slider
								value={[maxPrice]}
								onValueChange={(value) => setMaxPrice(value[0])}
								max={100}
								step={1}
								className="w-64"
							/>
						</div>
						<Button onClick={sortByPrice}>Sort by Price</Button>
					</div>
					<div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
						<AnimatePresence>
							{filteredEvents.map((event) => (
								<motion.div
									key={event.id}
									initial={{ opacity: 0, y: 20 }}
									animate={{ opacity: 1, y: 0 }}
									exit={{ opacity: 0, y: -20 }}
									transition={{ duration: 0.3 }}
								>
									<EventCard event={event} />
								</motion.div>
							))}
						</AnimatePresence>
					</div>
				</div>
			</main>
		</div>
	)
}

export default SupportNest
