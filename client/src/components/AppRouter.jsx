import { Route, Routes, useLocation } from 'react-router-dom'

const AppRouter = () => {
	const location = useLocation()
	return (
		<Routes location={location}>
			<Route path="/" element={<div />} />
		</Routes>
	)
}

export default AppRouter
