import { Card, CardContent,  CardHeader, CardTitle } from '@/components/ui/card'
import { features } from '@/data'

const Solutions = () => {
	return (
		<section id="solutions" className="container mx-auto my-20">
			<h1 className="my-16 justify-center flex text-3xl font-bold tracking-tighter sm:text-left sm:text-4xl md:text-5xl">
				What we Provide?
			</h1>
			<div className="grid grid-cols-1 gap-10 sm:grid-cols-3">
				{features.map((feature, index) => (
					<Card key={index} className="cursor-pointer transition-transform duration-300 hover:scale-105">
						<CardHeader className="text-center">
							<CardTitle>{feature.CardTitle}</CardTitle>
						</CardHeader>
						<img
							className="h-64 w-full object-contain"
							src={feature.CardDescription}
							alt={feature.CardTitle}
						/>
						<CardContent className="my-5 text-center text-lg">{feature.CardContent}</CardContent>
					</Card>
				))}
			</div>
		</section>
	)
}

export default Solutions
