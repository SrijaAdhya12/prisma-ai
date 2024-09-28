import { Navbar, Footer } from '@/components'
import { Hero, Quote, Solutions, Procare } from '@/sections'
import { ChevronDown } from 'lucide-react'

const Home = () => {
	const navItems = [
		{
			label: 'Products',
			target: '#solutions',
			icon: ChevronDown,
			items: [
				{
					title: 'Emo Sense',
					src: 'https://assets.aceternity.com/demos/algochurn.webp',
					href: '/emo-sense',
					description: 'A platform that uses AI to detect emotions and cure.'
				},
				{
					title: 'Therafy',
					src: 'https://assets.aceternity.com/demos/algochurn.webp',

					href: '/therafy',
					description:
						'Therafy is a cutting-edge AI content sugesstion platform.'
				},
				{
					title: 'Pro Care',
					src: 'https://assets.aceternity.com/demos/algochurn.webp',

					href: '/pro-care',
					description: 'Get therapist support for your mental health.'
				},
				{
					title: 'Support Nest',
					src: 'https://assets.aceternity.com/demos/algochurn.webp',
					href: '/support-nest',
					description: 'A Prisma AI Initiative for finding support for people.'
				}
			]
		},
		{ label: 'Solutions', target: '#solutions' },
		{ label: 'Procare', target: '#procare' },
		{ label: 'Help Center', target: '#helpcenter' },
		{ label: 'Dashboard', private: true, to: '/dashboard' }
	]

	return (
		<div id="home">
			<Navbar initialBackground="bg-blue-600 border-0" navItems={navItems} />
			<main className="mb-50 min-h-screen">
				<Hero />
				<Quote />
				<Solutions />
				<Procare />
			</main>
			<Footer />
		</div>
	)
}

export default Home
