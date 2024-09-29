import React, { useState, useEffect } from 'react'
import { Brain } from 'lucide-react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '@/lib/utils'

import {
	NavigationMenu,
	NavigationMenuContent,
	NavigationMenuItem,
	NavigationMenuLink,
	NavigationMenuList,
	NavigationMenuTrigger
} from '@/components/ui/navigation-menu'
import { AvatarButton, Dropdown } from '.'

const ProductItem = React.forwardRef(({ className, title, children, href, src, ...props }, ref) => {
	return (
		<li>
			<NavigationMenuLink asChild>
				<Link
					to={href}
					ref={ref}
					className={cn(
						'hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground block select-none space-y-1 rounded-md leading-none no-underline outline-none transition-colors',
						className
					)}
					{...props}
				>
					<div className="flex items-center gap-2">
						<img src={src} className="h-28 w-[140px] rounded-md object-cover" alt={title} />
						<div className="">
							<h3 className="text-lg font-medium leading-none">{title}</h3>
							<p className="text-muted-foreground line-clamp-2 text-sm leading-snug">{children}</p>
						</div>
					</div>
				</Link>
			</NavigationMenuLink>
		</li>
	)
})

const Navbar = ({ initialBackground = 'bg-transparent', navItems }) => {
	const [background, setBackground] = useState(initialBackground)
	const [isOpen, setIsOpen] = useState(false)
	const location = useLocation()

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

	useEffect(() => {
		setIsOpen(false)
	}, [location])

	return (
		<>
			<nav
				className={cn(
					'sticky top-0 z-50 w-full backdrop-blur-md transition-colors duration-300',
					background,
					isOpen && initialBackground
				)}
			>
				<div className="container mx-auto flex items-center justify-between px-4 py-4">
					<div className="flex items-center justify-center gap-10">
						<Link to="/" className="flex items-center text-xl font-semibold">
							<>
								<Brain className="mr-2 h-6 w-6" />
								<span>Prisma AI</span>
							</>
						</Link>

						<div className="hidden lg:block">
							<NavigationMenu>
								<NavigationMenuList className="space-x-7">
									{navItems.map((item) => (
										<NavigationMenuItem key={item.label}>
											{item.items ? (
												<NavigationMenuTrigger className="bg-transparent hover:bg-transparent focus:bg-transparent data-[state=open]:bg-transparent">
													{item.label}
												</NavigationMenuTrigger>
											) : (
												<div
													key={item.label}
													className="text-foreground/80 hover:text-foreground flex items-center gap-2 rounded-full p-3 font-medium transition-colors"
												>
													{item.target && (
														<button onClick={() => smoothScrollTo(item.target)}>
															{item.label}
														</button>
													)}
													{item.to && (
														<NavLink to={item.to} className="flex items-center gap-2">
															{item.label}
														</NavLink>
													)}
													{item.icon && (
														<item.icon
															className={cn('size-4', item.iconOnlyMobile && 'hidden')}
														/>
													)}
												</div>
											)}
											{item.items && (
												<NavigationMenuContent>
													<ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[700px]">
														{item.items.map((subItem) =>
															typeof subItem === 'string' ? (
																<li key={subItem}>
																	<NavigationMenuLink asChild>
																		<NavLink
																			to={`/${subItem.toLowerCase().replace(' ', '-')}`}
																			className="hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors"
																		>
																			{subItem}
																		</NavLink>
																	</NavigationMenuLink>
																</li>
															) : (
																<ProductItem
																	key={subItem.title}
																	title={subItem.title}
																	src={subItem.src}
																	href={subItem.href}
																>
																	{subItem.description}
																</ProductItem>
															)
														)}
													</ul>
												</NavigationMenuContent>
											)}
										</NavigationMenuItem>
									))}
								</NavigationMenuList>
							</NavigationMenu>
						</div>
					</div>
					<div className="hidden items-center gap-4 lg:flex">
						<AvatarButton />
					</div>
					<Dropdown
						navItems={navItems}
						background={initialBackground}
						isOpen={isOpen}
						setIsOpen={setIsOpen}
						smoothScrollTo={smoothScrollTo}
					/>
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
