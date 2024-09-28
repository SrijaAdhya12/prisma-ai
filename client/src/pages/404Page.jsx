import { AlertCircle } from 'lucide-react'
import { Error404 } from '../assets'
import { Link } from 'react-router-dom'

const Error404Page = () => {
	return (
		<main className="flex h-full items-center justify-center" id="404-page">
			<div className="flex min-h-screen flex-col items-center justify-center gap-2">
				<AlertCircle className="text-destructive h-16 w-16" />
				<h1 className="mt-4 text-2xl font-bold sm:text-4xl">Page Not Found</h1>
				<p className="mt-2 text-center text-sm sm:text-lg">
					Oops!The page you are looking for does not exist.
				</p>
				<img src={Error404} alt="404 Error" className="mt-8 w-2/3 max-w-md" />
				<Link to="/" className="bg-primary/85 hover:bg-primary mt-4 rounded px-4 py-2 transition-colors">
					Go Back Home
				</Link>
			</div>
		</main>
	)
}

export default Error404Page
