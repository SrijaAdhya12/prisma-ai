import { IconBrandGithub, IconBrandInstagram, IconBrandFacebook, IconBrandLinkedin } from '@tabler/icons-react'
import { Link } from 'react-router-dom'

const Footer = () => {
	return (
		<footer id="helpcenter">
			<div className="container mx-auto">
				<div className="grid grid-cols-1 gap-8 border-t border-gray-200 py-12 md:grid-cols-3 dark:border-gray-700">
					<div>
						<h3 className="mb-4 text-lg font-semibold text-gray-900 dark:text-gray-100">Prisma AI</h3>
						<p className="text-sm text-gray-600 dark:text-gray-400">Your Mental Health Companion</p>
					</div>
					<div className="flex flex-col gap-2">
						<h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Quick Links</h3>
						<ul className="flex flex-col gap-2">
							<li>
								<Link
									to="#"
									className="text-sm text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100"
								>
									Home
								</Link>
							</li>
							<li>
								<Link
									to="#"
									className="text-sm text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100"
								>
									About Us
								</Link>
							</li>
							<li>
								<Link
									to="#"
									className="text-sm text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100"
								>
									Solutions
								</Link>
							</li>
							<li>
								<Link
									to="#"
									className="text-sm text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100"
								>
									Procare
								</Link>
							</li>
						</ul>
					</div>
					<div className="flex flex-col gap-2">
						<h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Contact Us</h3>
						<p className="text-sm text-gray-600 dark:text-gray-400">Email: support@prismaai.com</p>
						<p className="text-sm text-gray-600 dark:text-gray-400">Phone: +1 (123) 456-7890</p>
					</div>
				</div>
				<div className="flex flex-col items-center justify-center py-24">
					<div className="flex gap-4 py-2 text-lg">
						<Link
							to="https://github.com/SrijaAdhya12/prisma-ai-temp"
							target="_blank"
							rel="noopener noreferrer"
						>
							<IconBrandGithub className="text-foreground/75 hover:text-foreground transition-colors sm:size-8" />
						</Link>
						<Link to="https://www.instagram.com/srija.ad_" target="_blank" rel="noopener noreferrer">
							<IconBrandInstagram className="text-foreground/75 hover:text-foreground transition-colors sm:size-8" />
						</Link>
						<Link to="https://facebook.com/prisma-ai" target="_blank" rel="noopener noreferrer">
							<IconBrandFacebook className="text-foreground/75 hover:text-foreground transition-colors sm:size-8" />
						</Link>
						<Link to="https://www.linkedin.com/in/pritam-kunduu" target="_blank" rel="noopener noreferrer">
							<IconBrandLinkedin className="text-foreground/75 hover:text-foreground transition-colors sm:size-8" />
						</Link>
					</div>
					<div className="text-sm text-gray-500">
						&copy; {new Date().getFullYear()} Prisma AI. All rights reserved.
					</div>
				</div>
			</div>
		</footer>
	)
}

export default Footer
