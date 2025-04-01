import { Navbar } from '@/components'
import { MessageSquare, Video } from 'lucide-react'
import { Outlet } from 'react-router'

const ProCare = () => {
	const navItems = [
		{ label: 'Chat', private: true, to: 'chat', icon: MessageSquare },
		{ label: 'Video Call', private: true, to: 'video', icon: Video }
	]
	return (
		<div id="procare" className="min-h-screen">
			<Navbar navItems={navItems} initialBackground="bg-accent" />
			<div className="flex flex-1 flex-col overflow-hidden">
				<Outlet />
			</div>
		</div>
	)
}

export default ProCare
