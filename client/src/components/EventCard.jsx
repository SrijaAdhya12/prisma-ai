import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Calendar, MapPin, Link as LinkIcon } from 'lucide-react'
import { Link } from 'react-router-dom'



const EventCard = ({ event }) => {
	const getPriceIndicator = (price) => {
		if (price === 0) {
			return <Badge className="bg-success">Free</Badge>
		}
		if (price < 20) {
			return <Badge className="bg-info">$</Badge>
		}
		if (price < 50) {
			return <Badge className="bg-warning">$$</Badge>
		}
		return <Badge className="bg-destructive">$$$</Badge>
	}

	return (
		<Card className="border-border bg-accent">
			<div>
				<img
					src={event.image}
					alt={event.title}
					className="max-h-60 w-full object-cover"
				/>
			</div>
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
					<Link to={event.link} target="_blank" rel="noopener noreferrer">
						<LinkIcon className="mr-2 h-4 w-4" />
						View Event
					</Link>
				</Button>
			</CardFooter>
		</Card>
	)
}

export default EventCard
