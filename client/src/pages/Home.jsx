import { Navbar, Footer } from '@/components'
import { Hero, Quote, Solutions, ProCare } from '@/sections'
import { IconEmpathize, IconLayoutBottombarFilled } from '@tabler/icons-react'
import { HeartHandshake, PanelsTopLeft } from 'lucide-react'
import { EmoSense, ProCare as ProCareImg, SupportNest, Therafy } from '@/assets'

const Home = () => {
	const navItems = [
		{
			label: 'Products',
			items: [
				{
					title: 'Emo Sense',
					src: EmoSense,
					href: '/emo-sense',
					description: 'A platform that uses AI to detect emotions and cure.'
				},
				{
					title: 'Therafy',
					src: Therafy,
					href: '/therafy',
					description: 'Therafy is a cutting-edge AI content sugesstion platform.'
				},
				{
					title: 'Pro Care',
					src: ProCareImg,
					href: '/pro-care',
					description: 'Get therapist support for your mental health.'
				},
				{
					title: 'Support Nest',
					src: SupportNest,
					href: '/support-nest',
					description: 'A Prisma AI Initiative for finding support for people.'
				}
			]
		},
		{ label: 'Solutions', target: '#solutions', icon: HeartHandshake, iconOnlyMobile: true },
		{ label: 'Procare', target: '#procare', icon: IconEmpathize, iconOnlyMobile: true },
		{ label: 'Features', to: '/features', icon: IconLayoutBottombarFilled, iconOnlyMobile: true },
		{ label: 'Dashboard', private: true, to: '/dashboard', icon: PanelsTopLeft, iconOnlyMobile: true }
	]

	return (
		<div id="home">
			<Navbar initialBackground="bg-blue-600 border-0" navItems={navItems} />
			<main className="mb-50 min-h-screen">
				<Hero />
				<Quote />
				{/* <Solutions /> */}
				<ProCare />
			</main>
			<Footer />
		</div>
	)
}

export default Home
