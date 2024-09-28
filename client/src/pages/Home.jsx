import { Navbar, Footer } from '@/components'
import { Hero } from '@/sections'
import { ChevronDown } from 'lucide-react'

const Home = () => {
	const navItems = [
		{ label: 'Products', target: '#solutions', icon: ChevronDown },
		{ label: 'Solutions', target: '#solutions' },
		// { label: 'Procare', target: '#procare' },
		{ label: 'Help Center', target: '#helpcenter' },
		{ label: 'Procare', private: true, to: '/pro-care' },
		{ label: 'Dashboard', private: true, to: '/dashboard' },
		{ label: 'Emo Sense', private: true, to: '/emo-sense' }
	]
	return (
		<div id="home">
			<Navbar initialBackground="bg-blue-600 border-0" navItems={navItems} />
			<main className="mb-50 min-h-screen">
				<Hero />
				<Footer />
			</main>
		</div>
	)
}

export default Home
