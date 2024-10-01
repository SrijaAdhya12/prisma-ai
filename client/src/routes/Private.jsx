import { Navigate } from 'react-router-dom'
import { useAuth0 } from '@auth0/auth0-react'
import { Loader } from '@/components'
import { useToast } from '@/hooks'
import { useEffect, useState } from 'react'
import { Ban } from 'lucide-react'

const PrivateRoute = ({ component }) => {
	const { isAuthenticated, isLoading } = useAuth0()
	const { toast } = useToast()
	const [shouldRedirect, setShouldRedirect] = useState(false)

	useEffect(() => {
		if (!isAuthenticated && !isLoading) {
			toast({
				title: 'Unauthenticated',
				description: 'You need to login to access this page',
				variant: 'destructive',
				action: <Ban className="mr-2" />
			})
			setShouldRedirect(true)
		}
	}, [isLoading, isAuthenticated, toast])

	if (isLoading) {
		return <Loader />
	}

	if (shouldRedirect) {
		return <Navigate to="/" />
	}

	return component
}

export default PrivateRoute
