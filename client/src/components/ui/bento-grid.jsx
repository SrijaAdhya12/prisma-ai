import { cn } from '@/lib'

export const BentoGrid = ({ className, children }) => {
	return (
		<div className={cn('mx-auto grid max-w-7xl grid-cols-1 gap-4 md:auto-rows-[18rem] md:grid-cols-3', className)}>
			{children}
		</div>
	)
}

export const BentoGridItem = ({ className, title, description, header, icon }) => {
	return (
		<div
			className={cn(
				'group/bento shadow-input row-span-1 flex flex-col justify-between space-y-4 rounded-xl border border-transparent p-4 transition duration-200 hover:shadow-xl dark:border-border',
				className
			)}
		>
			{header}
			<div className="transition duration-200 group-hover/bento:translate-x-2">
				{icon}
				<div className="mb-2 mt-2 font-sans font-bold text-neutral-600 dark:text-neutral-200">{title}</div>
				<div className="font-sans text-xs font-normal text-neutral-600 dark:text-neutral-300">
					{description}
				</div>
			</div>
		</div>
	)
}
