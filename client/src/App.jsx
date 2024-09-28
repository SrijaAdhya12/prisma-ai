import { BrowserRouter } from 'react-router-dom'
import { Auth0Provider } from '@auth0/auth0-react'
import { ThemeProvider } from '@/providers'
import { AppRouter } from '@/components'
import { Toaster } from '@/components/ui/toaster'
import { TooltipProvider } from '@radix-ui/react-tooltip'

const PrismaAI = () => {
	return (
		<TooltipProvider>
			<AppRouter />
			<Toaster />
		</TooltipProvider>
	)
}

const App = () => {
	return (
		<Auth0Provider
			domain={import.meta.env.VITE_AUTH0_DOMAIN}
			clientId={import.meta.env.VITE_AUTH0_CLIENT_ID}
			authorizationParams={{ redirect_uri: window.location.origin }}
		>
			<BrowserRouter>
				<ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
					<PrismaAI />
				</ThemeProvider>
			</BrowserRouter>
		</Auth0Provider>
	)
}

export default App
