import { useState, useEffect } from 'react'
import { Menu, X, Brain } from 'lucide-react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { cn } from '@/lib'
import { AvatarButton, Loader } from '.'
import { useAuth0 } from '@auth0/auth0-react'
import { motion, AnimatePresence } from 'framer-motion'

const Navbar = ({ initialBackground, navItems = [] }) => {
	const { isAuthenticated } = useAuth0()
	const [background, setBackground] = useState(initialBackground)
	const [isOpen, setIsOpen] = useState(false)

	

	return (
		<>
			<nav
				className={cn(
					'sticky top-0 z-50 border-neutral-800 py-3 backdrop-blur-md transition-colors duration-300',
					background
				)}
			>
				<div className="container relative mx-auto flex items-center justify-between px-4 text-sm">
					<div className="flex items-center gap-64 sm:gap-10">
						<div className="flex flex-shrink-0 items-center">
							<Link to="/" className="inline-flex items-center text-xl font-semibold tracking-tight">
								<Brain className="mr-2" />
								Prisma AI
							</Link>
						</div>
	
					</div>
	
				</div>
			</nav>
			<AnimatePresence>
				{isOpen && (
					<motion.div
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						transition={{ duration: 0.2 }}
						className="fixed inset-0 z-40 bg-black bg-opacity-50"
						onClick={() => setIsOpen(false)}
					/>
				)}
			</AnimatePresence>
		</>
	)
}

export default Navbar
