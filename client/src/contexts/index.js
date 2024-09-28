import { createContext } from "react"

export const ThemeContext = createContext({
	theme: 'system',
	setTheme: () => null
})

