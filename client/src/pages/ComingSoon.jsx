import { Link, useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { ArrowLeft, Home, Rocket } from 'lucide-react'
import { WorkInProgress } from '@/assets'

const ComingSoon = () => {
	const navigate = useNavigate()
	return (
		<main className="container flex h-full flex-col items-center justify-center min-h-screen" id="coming-soon">
			<div className="w-full rounded-xl bg-opacity-50 p-6 text-center shadow-lg ring-gray-700 backdrop-blur-lg md:p-10 dark:ring-1">
				<h1 className="mb-4 text-2xl font-bold sm:text-4xl md:text-6xl">Coming Soon</h1>
				<p className="mb-8 text-sm md:text-xl">
					We're working hard to bring you some amazing new features. Stay tuned!
				</p>
				<div className="relative mb-8 flex justify-center">
					<div className="aspect-square w-full max-w-60 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 opacity-60 blur-2xl sm:max-w-sm" />
					<img
						src={WorkInProgress}
						alt="Work in Progress"
						className="absolute left-1/2 top-1/2 z-40 w-96 -translate-x-1/2 -translate-y-1/2 transform sm:max-w-96"
					/>
				</div>
				<form className="mb-8 flex flex-col items-center justify-center gap-4 md:flex-row">
					<Input type="email" placeholder="Enter your email for updates" className="max-w-xs bg-opacity-50" />
					<Button type="submit">
						Notify Me <Rocket className="ml-2 h-4 w-4" />
					</Button>
				</form>
				<Button variant="outline" onClick={() => navigate(-1)}>
					<ArrowLeft className="mr-2 h-4 w-4" /> Go Back
				</Button>
				<Link to="/">
					<Button variant="outline">
						<Home className="mr-2 h-4 w-4" /> Go Home
					</Button>
				</Link>
			</div>
		</main>
	)
}

export default ComingSoon
