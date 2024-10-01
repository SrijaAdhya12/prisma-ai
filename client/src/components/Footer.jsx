import {
	IconBrandGithub,
	IconBrandInstagram,
	IconBrandFacebook,
	IconBrandLinkedin,
	IconMail
} from '@tabler/icons-react'

import { Link } from 'react-router-dom'

const Footer = () => {
	return (
		<footer id="helpcenter">
			<div className="mt-10 border-t">
				<div className="container mx-auto grid grid-cols-1 gap-8 py-12 md:grid-cols-3">
					<div>
						<Link className="flex items-center gap-2" to="/">
							<img
								src="favicon.jpg"
								alt="Prisma AI"
								className="size-10 rounded-sm contrast-150 invert dark:invert-0"
							/>
							<h3 className="text-2xl font-semibold">Prisma AI</h3>
						</Link>
						<p className="text-muted-foreground text-sm">Your Mental Health Companion</p>
					</div>
					<div className="flex flex-col gap-2">
						<h3 className="text-lg font-semibold">Quick Links</h3>
						<ul className="text-muted-foreground/70 hover:*:text-muted-foreground flex flex-col gap-2 transition-colors">
							<li>
								<Link to="/" className="text-sm">
									Home
								</Link>
							</li>
							<li>
								<Link to="/" className="text-sm">
									About Us
								</Link>
							</li>
							<li>
								<Link to="#" className="text-sm">
									Solutions
								</Link>
							</li>
							<li>
								<Link to="/pro-care" className="text-sm">
									Procare
								</Link>
							</li>
						</ul>
					</div>
					<div className="flex flex-col gap-2">
						<h3 className="text-lg font-semibold">Contact Us</h3>
						<div className="text-muted-foreground/70 hover:*:text-muted-foreground flex flex-col gap-2 text-sm transition-colors">
							<Link to="to:support@prismaai.com">support@prismaai.com</Link>
							<Link to="tel: +1 (123) 456-7890">+1 (123) 456-7890</Link>
						</div>
					</div>
				</div>
				<div className="flex flex-col items-center justify-center py-24">
					<div className="flex gap-4 py-2 text-lg">
						<Link to="https://github.com/SrijaAdhya12/prisma-ai" target="_blank" rel="noopener noreferrer">
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
						<Link to="mailto:support@prismaai.com">
							<IconMail className="text-foreground/75 hover:text-foreground transition-colors sm:size-8" />
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
