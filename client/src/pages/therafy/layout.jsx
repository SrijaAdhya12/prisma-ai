import { Navbar } from '@/components'
import { BotMessageSquare, Video, Music } from 'lucide-react'
import { Outlet } from 'react-router-dom'

const Therafy = () => {
	const navItems = [
		{ label: 'Mood Music', private: true, to: 'mood-music', icon: Music },
		{ label: 'Video Sense', private: true, to: 'video-sense', icon: Video },
		{ label: 'Support Bot', private: true, to: 'support-bot', icon: BotMessageSquare }
	]
	return (
		<div id="emosense" className="min-h-screen">
			<Navbar navItems={navItems} initialBackground="bg-accent" />
			<div className="flex flex-1 flex-col overflow-hidden">
				<Outlet />
			</div>
		</div>
	)
}

export default Therafy
