import { Button } from '@/components/ui/button'
import { Link } from 'react-router'
import { TypewriterEffect2 } from '@/components/ui/typewriter-effect'

const Hero = () => {
	const tagLines = [
		'Your Mental Health Companion',
		'Advanced AI Powered',
		'Tailored to Your Needs',
		'Empowering Your Emotional Well-being'
	]
	return (
		<section className="w-full bg-gradient-to-b from-blue-600 to-purple-900 pt-32 sm:pt-48">
			<div className="container mx-auto px-4 sm:mt-7 md:px-6">
				<div className="flex flex-col items-center space-y-4 text-center">
					<div className="overflow-hidden sm:space-y-2">
						<TypewriterEffect2
							texts={tagLines}
							baseText="Prisma AI:"
							className="text-4xl text-white md:text-5xl lg:text-6xl"
						/>
						<p className="mx-auto max-w-[700px] py-6 text-lg text-white sm:px-0 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
							Personalized support tailored to your unique emotional needs, powered by advanced AI.
						</p>
					</div>
					<div className="flex gap-5 sm:pb-32">
						<Button asChild className="bg-white text-black">
							<Link to="/features">Get Started</Link>
						</Button>
						<Button variant="outline" className="border-0 bg-black text-white" asChild>
							<Link to="/dashboard">Learn More</Link>
						</Button>
					</div>
				</div>
			</div>
		</section>
	)
}

export default Hero
