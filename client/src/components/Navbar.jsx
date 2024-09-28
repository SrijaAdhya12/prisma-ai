import { useState, useEffect } from 'react'
import { Menu, X, Brain } from 'lucide-react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { cn } from '@/lib'
import { AvatarButton,  } from '.'
import { useAuth0 } from '@auth0/auth0-react'
import { motion, AnimatePresence } from 'framer-motion'

const Navbar = ({ initialBackground, navItems = [] }) => {
	const { isAuthenticated } = useAuth0()
	const [background, setBackground] = useState(initialBackground)
	const [isOpen, setIsOpen] = useState(false)

	const smoothScrollTo = (target) => {
		document.querySelector(target)?.scrollIntoView({ behavior: 'smooth' })
		setIsOpen(false)
	}

	useEffect(() => {
		const toggleBackground = () =>
			setBackground(window.scrollY > 130 ? 'bg-transparent border-b' : initialBackground)
		window.addEventListener('scroll', toggleBackground)
		return () => window.removeEventListener('scroll', toggleBackground)
	}, [initialBackground])

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
						<ul className="hidden items-center space-x-7 font-medium tracking-wide lg:flex">
							{navItems.map((item) =>
								!isAuthenticated && item.private ? null : (
									<li
										key={item.label}
										className="text-foreground/80 hover:text-foreground flex items-center gap-2 rounded-full p-3 transition-colors"
									>
										{item.target && (
											<button onClick={() => smoothScrollTo(item.target)}>{item.label}</button>
										)}
										{item.to && (
											<NavLink to={item.to} className="flex items-center gap-2">
												{item.label}
											</NavLink>
										)}
										{item.icon && <item.icon className="size-4" />}
									</li>
								)
							)}
						</ul>
					</div>
					<div className="hidden items-center space-x-2 lg:flex">
						<AvatarButton />
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
