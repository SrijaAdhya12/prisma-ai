import { Brain, CalendarCheck, Goal, Heart, Home, MessageSquare, Settings, User, Video, X, Bot } from 'lucide-react'
import { Link, useLocation } from 'react-router-dom'
import { cn } from '@/lib'
import { Button } from './ui/button'

const Sidebar = ({ isOpen, setIsOpen }) => {
	const { pathname } = useLocation()
	const sidebarLinks = [
		{ name: 'Profile', icon: User, path: 'profile' },
		{ name: 'Settings', icon: Settings, path: 'settings' },
		{ name: 'Goals', icon: Goal, path: 'goals' }
	]
	return (
		<aside className="bg-accent">
			<div
				className={cn(
					'bg-accent fixed inset-y-0 left-0 z-50 flex w-64 flex-col p-6 transition-transform duration-300 ease-in-out lg:static lg:z-auto lg:translate-x-0',
					isOpen ? 'translate-x-0' : '-translate-x-full'
				)}
				aria-label="sidebar"
			>
				<div className="mb-8 flex items-center justify-between">
					<Link className="flex items-center space-x-2" to="/">
						<Brain className="h-8 w-8 text-purple-500" />
						<span className="text-lg font-bold text-purple-500">Prisma AI</span>
					</Link>
					<Button variant="ghost" size="icon" className="lg:hidden" onClick={() => setIsOpen(false)}>
						<X className="h-6 w-6" />
						<span className="sr-only">Close sidebar</span>
					</Button>
				</div>
				<nav className="space-y-2">
					{sidebarLinks.map((link) => (
						<Link
							key={link.name}
							to={`/dashboard/${link.path}`}
							className={cn(
								'hover:bg-info flex items-center space-x-3 rounded-lg p-2 text-lg transition-colors duration-200',
								pathname === `/dashboard/${link.path}` && 'bg-info bg-opacity-50 shadow-md'
							)}
						>
							<link.icon className="h-5 w-5" />
							<span>{link.name}</span>
						</Link>
					))}
					<Link
						to={`/`}
						className={cn(
							'hover:bg-info flex items-center space-x-3 rounded-lg p-2 text-lg transition-colors duration-200'
						)}
					>
						<Home className="h-5 w-5" />
						<span>Home</span>
					</Link>
				</nav>
			</div>
			<div
				className={cn('fixed inset-0 z-40 hidden bg-black bg-opacity-50', isOpen && 'block')}
				onClick={() => setIsOpen(false)}
				aria-hidden="true"
			/>
		</aside>
	)
}
export default Sidebar
