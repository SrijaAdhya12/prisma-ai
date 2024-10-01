import { useAuth0 } from '@auth0/auth0-react'
import { Button } from './ui/button'
import { useToast } from '@/hooks'

const AuthButton = () => {
	const toast = useToast()
	const { loginWithRedirect, isAuthenticated, logout } = useAuth0()
	const login = () => {
		try {
			loginWithRedirect()
			toast({
				title: 'Logged in',
				description: 'You have been logged in',
				variant: 'success'
			})
		} catch (error) {
			console.error(error)
			toast({
				title: 'Error',
				description: error.message,
				variant: 'error'
			})
		}
	}
	return (
		<div>
			{isAuthenticated ? (
				<Button variant="outline" className="bg-foreground text-background" onClick={logout}>
					Logout
				</Button>
			) : (
				<Button variant="outline" className="bg-foreground text-background w-60 sm:w-full" onClick={login}>
					Login
				</Button>
			)}
		</div>
	)
}

export default AuthButton
