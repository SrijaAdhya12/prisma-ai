import { Button } from '@/components/ui/button'
import { AvatarButton, Sidebar } from '@/components'
import { Menu } from 'lucide-react'
import { Outlet } from 'react-router-dom'
import { Input } from '@/components/ui/input'
import { useState } from 'react'

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
				<Input type="search" placeholder="Search..." className={`hidden w-64 md:block`} />
				<AvatarButton />
			</div>
		</header>
	)
}

const Dashboard = () => {
	const [sidebarOpen, setSidebarOpen] = useState(false)

	return (
		<div id="dashboard" className="flex h-screen">
			<Sidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />
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
