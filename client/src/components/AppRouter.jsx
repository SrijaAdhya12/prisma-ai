import { Therafy } from '@/pages/therafy'
import { Route, Routes, useLocation } from 'react-router-dom'

const AppRouter = () => {
	const location = useLocation()
	return (
		<Routes location={location}>
			<Route path="/" element={<div />} />
			<Route path="/therafy" element={<Therafy />} />
		</Routes>
	)
}

export default AppRouter
