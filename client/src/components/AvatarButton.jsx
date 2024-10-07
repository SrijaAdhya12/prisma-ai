import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuPortal,
	DropdownMenuSeparator,
	DropdownMenuSub,
	DropdownMenuSubContent,
	DropdownMenuSubTrigger,
	DropdownMenuTrigger
} from './ui/dropdown-menu'
import { Check, LogOutIcon, Monitor, Moon, Sun, UserIcon } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import { useAuth0 } from '@auth0/auth0-react'
import { ModeToggle } from './ui/mode-toggle'
import { Link } from 'react-router-dom'
import { AuthButton, Loader } from '.'
import { useTheme } from '@/hooks'
import { cn } from '@/lib'

const Button = ({ className }) => {
	const { user, logout, isLoading, isAuthenticated } = useAuth0()
	const { theme, setTheme } = useTheme()

	if (isLoading) {
		return <Loader className="h-10 w-10" variant="small" />
	}
	if (!isAuthenticated) {
		return (
			<>
				<AuthButton />
				<ModeToggle />
			</>
		)
	}
	const fallbackIcon = 'https://placehold.co/80x80'
	const { name: userName, given_name, family_name } = user
	const displayName = `${given_name} ${family_name}`
	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<button className={cn('flex-none rounded-full', className)}>
					<Avatar>
						<AvatarImage src={user.picture || fallbackIcon.src} alt={userName} />
						<AvatarFallback>{displayName[0].toUpperCase()}</AvatarFallback>
					</Avatar>
				</button>
			</DropdownMenuTrigger>
			<DropdownMenuContent>
				<DropdownMenuLabel>Logged in as @{userName}</DropdownMenuLabel>
				<DropdownMenuSeparator />
				<Link to="/dashboard/profile">
					<DropdownMenuItem className="cursor-pointer">
						<UserIcon className="mr-2 size-4" /> <span>Profile</span>
					</DropdownMenuItem>
				</Link>
				<DropdownMenuSeparator />
				<DropdownMenuSub>
					<DropdownMenuSubTrigger className="cursor-pointer">
						<Monitor className="mr-2 size-4" />
						<span>Theme</span>
					</DropdownMenuSubTrigger>
					<DropdownMenuPortal>
						<DropdownMenuSubContent>
							<DropdownMenuItem onClick={() => setTheme('light')} className="cursor-pointer">
								<Sun className="mr-2 size-4" />
								<span>Light</span>
								{theme === 'light' && <Check className="ml-auto size-4" />}
							</DropdownMenuItem>
							<DropdownMenuSeparator />
							<DropdownMenuItem onClick={() => setTheme('dark')} className="cursor-pointer">
								<Moon className="mr-2 size-4" />
								<span>Dark</span>
								{theme === 'dark' && <Check className="ml-auto size-4" />}
							</DropdownMenuItem>
							<DropdownMenuSeparator />
							<DropdownMenuItem onClick={() => setTheme('system')} className="cursor-pointer">
								<Monitor className="mr-2 size-4" />
								<span>System</span>
								{theme === 'system' && <Check className="ml-auto size-4" />}
							</DropdownMenuItem>
						</DropdownMenuSubContent>
					</DropdownMenuPortal>
				</DropdownMenuSub>
				<DropdownMenuSeparator />
				<DropdownMenuItem
					className="hover:bg-destructive cursor-pointer"
					onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}
				>
					<LogOutIcon className="size-ring-1 mr-2" /> <span>Logout</span>
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	)
}

export default Button
