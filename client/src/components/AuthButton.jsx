import { useAuth0 } from '@auth0/auth0-react'
import { Button } from './ui/button'

const AuthButton = () => {
	const { loginWithRedirect, isAuthenticated, logout } = useAuth0()

	return (
		<div>
			{isAuthenticated ? (
				<Button
					variant="outline"
					className="bg-foreground text-background"
					onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}
				>
					Logout
				</Button>
			) : (
				<Button
					variant="outline"
					className="bg-foreground text-background w-60 sm:w-full"
					onClick={loginWithRedirect}
				>
					Login
				</Button>
			)}
		</div>
	)
}

export default AuthButton
