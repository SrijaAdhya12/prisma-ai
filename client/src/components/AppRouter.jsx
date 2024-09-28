import { Therafy } from '@/pages/therafy'
import { ComingSoon } from '@/pages'
import { Route, Routes, useLocation } from 'react-router-dom'

const AppRouter = () => {
	const location = useLocation()
	return (
		<Routes location={location}>
			<Route path="/" element={<ComingSoon />} />
			<Route path="/therafy" element={<Therafy />} />

		</Routes>
	)
}

export default AppRouter
