import { Button } from "@/components/ui/button"
import { ClipboardPlusIcon } from "lucide-react"
import { Link } from "react-router-dom"

const Procare = () => {
	return (
		<section
			id="procare"
			className="mx-4 rounded-2xl bg-opacity-30 py-12 shadow-xl ring-1 ring-gray-900/10 sm:container sm:mx-auto md:py-24 lg:py-32"
		>
			<div className="container mx-auto px-4 md:px-6">
				<div className="grid items-center gap-6 lg:grid-cols-2 lg:gap-12">
					<div className="absolute left-0 right-0 z-10 space-y-4 px-10 sm:static">
						<h2 className="mb-9 text-center text-3xl font-bold tracking-tighter sm:text-left sm:text-4xl md:text-5xl">
							ProCare: Therapist Access
						</h2>
						<p className="text-center text-lg sm:text-left md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
							Chat services offer instant support with licensed therapists, while secure video calls
							provide more personalized, interactive sessions. Both options are confidential, ensuring
							privacy and security for every user.
						</p>
						<div className="flex py-6 justify-center sm:justify-start">
							<Button>
								<Link to="/pro-care">Connect Instantly</Link>
								<ClipboardPlusIcon className="ml-2 h-4 w-4" />
						</Button>
						</div>
					</div>
					<div className="relative flex justify-center">
						<div className="aspect-square w-full max-w-60 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 opacity-60 blur-2xl sm:max-w-[400px]" />
					</div>
				</div>
			</div>
		</section>
	)
}

export default Procare
