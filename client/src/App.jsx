import { BrowserRouter } from 'react-router-dom'
import { Auth0Provider } from '@auth0/auth0-react'
import { ThemeProvider } from '@/providers'
import { AppRouter } from '@/components'
import { Toaster } from '@/components/ui/toaster'

const PrismaAI = () => {
	return (
		<ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
			<AppRouter />
			<Toaster />
		</ThemeProvider>
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
				<PrismaAI />
			</BrowserRouter>
		</Auth0Provider>
	)
}

export default App
