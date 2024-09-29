import { Navbar } from '@/components'
import { IconGif, IconMoodXd, IconStretching2 } from '@tabler/icons-react'
import { BotMessageSquare, Video, Music } from 'lucide-react'
import { Outlet } from 'react-router-dom'

const Therafy = () => {
	const navItems = [
		{ label: 'Mood Music', private: true, to: 'mood-music', icon: Music },
		{ label: 'Mood Memes', private: true, to: 'mood-memes', icon: IconMoodXd },
		{ label: 'Mood GIFs', private: true, to: 'mood-gifs', icon: IconGif },
		{ label: 'CBT Exercises', private: true, to: 'cbt-exercises', icon: IconStretching2 }
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
