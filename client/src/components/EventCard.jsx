import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Calendar, MapPin, Link } from 'lucide-react'

const EventCard = ({ event }) => {
	const getPriceIndicator = (price) => {
		if (price === 0) {
			return <Badge className="bg-green-500">Free</Badge>
		}
		if (price < 20) {
			return <Badge className="bg-blue-500">$</Badge>
		}
		if (price < 50) {
			return <Badge className="bg-yellow-500">$$</Badge>
		}
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

export default EventCard
