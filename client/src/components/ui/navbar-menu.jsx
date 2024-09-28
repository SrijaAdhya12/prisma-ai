import React from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'

const transition = {
	type: 'spring',
	mass: 0.5,
	damping: 11.5,
	stiffness: 100,
	restDelta: 0.001,
	restSpeed: 0.001
}

export const MenuItem = ({ setActive, active, item, children }) => {
	return (
		<div onMouseEnter={() => setActive(item)} className="relative">
			<motion.p
				transition={{ duration: 0.3 }}
				className="cursor-pointer text-black hover:opacity-[0.9] dark:text-white"
			>
				{item}
			</motion.p>
			{active !== null && (
				<motion.div
					initial={{ opacity: 0, scale: 0.85, y: 10 }}
					animate={{ opacity: 1, scale: 1, y: 0 }}
					transition={transition}
				>
					{active === item && (
						<div className="absolute left-1/2 top-[calc(100%_+_1.2rem)] -translate-x-1/2 transform pt-4">
							<motion.div
								transition={transition}
								// layoutId ensures smooth animation
								layoutId="active"
								className="overflow-hidden rounded-2xl border border-black/[0.2] bg-white shadow-xl backdrop-blur-sm dark:border-white/[0.2] dark:bg-black"
							>
								<motion.div
									// layout ensures smooth animation
									layout
									className="h-full w-max p-4"
								>
									{children}
								</motion.div>
							</motion.div>
						</div>
					)}
				</motion.div>
			)}
		</div>
	)
}

export const Menu = ({ setActive, children }) => {
	return (
		<nav
			// resets the state
			onMouseLeave={() => setActive(null)}
			className="shadow-input relative flex justify-center space-x-4 rounded-full border border-transparent bg-white px-8 py-6 dark:border-white/[0.2] dark:bg-black"
		>
			{children}
		</nav>
	)
}

export const ProductItem = ({ title, description, href, src }) => {
	return (
		<Link to={href} className="flex space-x-2">
			<img src={src} width={140} height={70} alt={title} className="flex-shrink-0 rounded-md shadow-2xl" />
			<div>
				<h4 className="mb-1 text-xl font-bold text-black dark:text-white">{title}</h4>
				<p className="max-w-[10rem] text-sm text-neutral-700 dark:text-neutral-300">{description}</p>
			</div>
		</Link>
	)
}

export const HoveredLink = ({ children, ...rest }) => {
	return (
		<Link {...rest} className="text-neutral-700 hover:text-black dark:text-neutral-200">
			{children}
		</Link>
	)
}
