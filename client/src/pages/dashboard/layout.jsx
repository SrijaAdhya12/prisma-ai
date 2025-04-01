import { Button } from '@/components/ui/button'
import { AvatarButton, Sidebar } from '@/components'
import { Goal, Home, Menu, Settings, User } from 'lucide-react'
import { Outlet } from 'react-router'
import { Input } from '@/components/ui/input'
import { useState } from 'react'
import { IconChartHistogram } from '@tabler/icons-react'
import { Search } from '@/components/ui/search'

const Topbar = ({ setIsOpen }) => {
	return (
		<header className="bg-accent sticky top-0 z-40 flex items-center justify-between p-4 lg:z-50">
			<div className="flex items-center">
				<Button variant="ghost" size="icon" className="mr-4 lg:hidden" onClick={() => setIsOpen(true)}>
					<Menu className="h-6 w-6" />
					<span className="sr-only">Open sidebar</span>
				</Button>
				<h1 className="text-xl font-semibold">Dashboard</h1>
			</div>
			<div className="flex items-center space-x-4">
				<Search
					placeholder="Search..."
					className="hidden w-full transition-all duration-500 ease-in-out focus:w-64 md:block"
					iconClassName="hidden md:block"
					type="search"
				/>
				<AvatarButton />
			</div>
		</header>
	)
}

const Dashboard = () => {
	const [sidebarOpen, setSidebarOpen] = useState(false)
	const sidebarItems = [
		{ name: 'Profile', icon: User, path: '/dashboard/profile' },
		{ name: 'Goals', icon: Goal, path: '/dashboard/goals' },
		{ name: 'Analytics', icon: IconChartHistogram, path: '/dashboard/analytics' },
		{ name: 'Settings', icon: Settings, path: '/dashboard/settings' },
		{ name: 'Home', icon: Home, path: '/' }
	]
	return (
		<div id="dashboard" className="flex h-screen">
			<Sidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} sidebarLinks={sidebarItems} />
			<div className="flex flex-1 flex-col overflow-hidden">
				<Topbar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />
				<main className="flex-1 overflow-y-auto sm:p-6">
					<Outlet />
				</main>
			</div>
		</div>
	)
}

export default Dashboard
