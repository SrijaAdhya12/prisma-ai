import { Menu, X, ChevronDown, ChevronUp } from 'lucide-react'
import { AnimatePresence, motion } from 'framer-motion'
import { Link, NavLink } from 'react-router'
import { useLocation } from 'react-router'
import { useAuth0 } from '@auth0/auth0-react'
import { useState, useEffect } from 'react'
import { AvatarButton, Loader } from '.'
import { cn } from '@/lib'

const Dropdown = ({ navItems, background, isOpen, setIsOpen, smoothScrollTo }) => {
	const { isAuthenticated, user, loading } = useAuth0()
	const [expandedItem, setExpandedItem] = useState(null)
	const location = useLocation()

	useEffect(() => {
		setIsOpen(false)
	}, [location, setIsOpen])

	if (loading) {
		return <Loader />
	}
	const toggleSubMenu = (index) => {
		setExpandedItem(expandedItem === index ? null : index)
	}

	return (
		<div className="lg:hidden">
			<button
				onClick={() => setIsOpen(!isOpen)}
				className="cursor-pointer"
				aria-label={isOpen ? 'Close menu' : 'Open menu'}
			>
				{isOpen ? <X className="size-7" /> : <Menu className="size-7" />}
			</button>
			<AnimatePresence>
				{isOpen && (
					<motion.ul
						initial={{ opacity: 0, y: -20 }}
						animate={{ opacity: 1, y: 0 }}
						exit={{ opacity: 0, y: -20 }}
						transition={{ duration: 0.2 }}
						className={cn(
							'absolute right-0 top-14 z-50 ml-14 w-screen flex-col items-center justify-center py-4 text-sm font-medium tracking-wide shadow-xl md:top-14',
							background
						)}
					>
						{navItems.map((item, index) =>
							!isAuthenticated && item.private ? null : (
								<li key={item.label} className="w-full">
									{item.target && (
										<div
											className="text-foreground/80 hover:text-foreground hover:bg-secondary flex w-full cursor-pointer items-center justify-between p-3 px-10 transition-colors"
											onClick={() => smoothScrollTo(item.target)}
										>
											<div className="flex items-center gap-2">
												{item.icon && <item.icon className="size-4" />}
												<span className="uppercase">{item.label}</span>
											</div>
										</div>
									)}
									{item.items && (
										<div
											className="text-foreground/80 hover:text-foreground hover:bg-secondary flex w-full cursor-pointer items-center justify-between p-3 px-10 transition-colors"
											onClick={() => toggleSubMenu(index)}
										>
											<div className="flex items-center gap-2">
												{item.icon && <item.icon className="size-4" />}
												<span className="uppercase">{item.label}</span>
											</div>
											{expandedItem === index ? (
												<ChevronUp className="size-4" />
											) : (
												<ChevronDown className="size-4" />
											)}
										</div>
									)}
									{item.items && expandedItem === index && (
										<motion.ul
											initial={{ opacity: 0, height: 0 }}
											animate={{ opacity: 1, height: 'auto' }}
											exit={{ opacity: 0, height: 0 }}
											transition={{ duration: 0.2 }}
											className="bg-secondary/50 px-10 py-2"
										>
											{item.items.map((subItem) => (
												<li key={subItem.title} className="my-2">
													<NavLink
														to={subItem.href}
														className="hover:text-foreground text-foreground/80 flex items-start gap-3 transition-colors"
													>
														<img
															src={subItem.src}
															alt={subItem.title}
															className="h-10 w-10 rounded object-cover"
														/>
														<div>
															<h3 className="font-semibold">{subItem.title}</h3>
															<p className="text-foreground/70 text-xs">
																{subItem.description}
															</p>
														</div>
													</NavLink>
												</li>
											))}
										</motion.ul>
									)}
									{item.to && (
										<Link
											className="text-foreground/80 hover:text-foreground hover:bg-secondary flex w-full cursor-pointer items-center justify-between p-3 px-10 transition-colors"
											to={item.to}
										>
											<div className="flex items-center gap-2">
												{item.icon && <item.icon className="size-4" />}
												<span className="uppercase">{item.label}</span>
											</div>
										</Link>
									)}
								</li>
							)
						)}
						<li className="mt-4 flex w-full items-start justify-start px-10">
							<div className="flex items-center justify-center gap-3 uppercase">
								<AvatarButton />
								<span>{user?.name}</span>
							</div>
						</li>
					</motion.ul>
				)}
			</AnimatePresence>
		</div>
	)
}

export default Dropdown
