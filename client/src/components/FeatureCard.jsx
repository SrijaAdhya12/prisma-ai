import { cn } from '@/lib'
import { Link } from 'react-router-dom'

const FeatureCard = ({ feature, className }) => {
	const { title, background, hoverImg, description, to } = feature
	return (
		<div className="w-full max-w-xs">
			<Link
				className={cn(
					'card dark:border-border group relative mx-auto flex h-96 w-full cursor-pointer flex-col justify-end overflow-hidden rounded-md border border-transparent p-4 shadow-xl transition-all duration-500 hover:after:absolute hover:after:inset-0 hover:after:opacity-50',
					className
				)}
				to={to}
			>
				<img
					src={hoverImg}
					alt={`${title} hover`}
					className="absolute left-0 top-0 h-full object-cover opacity-0 transition-opacity duration-500 group-hover:opacity-100"
				/>
				<img
					src={background}
					alt={title}
					className="absolute left-0 top-0 h-full w-full object-cover brightness-90 transition-opacity duration-500 group-hover:opacity-0"
				/>
				<div className="text relative z-50 text-white group-hover:opacity-0">
					<h1 className="relative text-xl font-bold md:text-3xl">{title}</h1>
					<p className="relative my-4 text-base font-normal text-white/70">{description}</p>
				</div>
			</Link>
		</div>
	)
}

export default FeatureCard
