import { Home, ComingSoon, SupportNest, NotFound } from '@/pages'
import { Dashboard } from '@/pages/dashboard'
import { EmoSense, MoodSense, SupportBot, VideoSense } from '@/pages/emosense'
import { PrivateRoute } from '@/routes'
import { Navigate, Route, Routes, useLocation } from 'react-router-dom'

const AppRouter = () => {
	const location = useLocation()
	return (
		<Routes location={location}>
			<Route path="/" element={<Home />} />
			<Route path="/dashboard" element={<PrivateRoute component={<Dashboard />} />}>
				<Route path="" element={<Navigate to="profile" />} />
				<Route path="profile" element={<ComingSoon />} />
				<Route path="settings" element={<ComingSoon />} />
				<Route path="goals" element={<ComingSoon />} />
				<Route path="*" element={<NotFound />} />
			</Route>
			<Route path="/emo-sense" element={<PrivateRoute component={<EmoSense />} />}>
				<Route path="" element={<Navigate to="mood-sense" />} />
				<Route path="mood-sense" element={<MoodSense />} />
				<Route path="video-sense" element={<VideoSense />} />
				<Route path="support-bot" element={<SupportBot />} />
				<Route path="*" element={<NotFound />} />
			</Route>
			<Route path="/therafy" element={<PrivateRoute component={<ComingSoon />} />}>
				<Route path="" element={<Navigate to="mood-music" />} />
				<Route path="mood-music" element={<ComingSoon />} />
				<Route path="content-theraphy" element={<ComingSoon />} />
				<Route path="physical-theraphy" element={<ComingSoon />} />
				<Route path="*" element={<NotFound />} />
			</Route>
			<Route path="/pro-care" element={<PrivateRoute component={<ComingSoon />} />}>
				<Route path="" element={<Navigate to="chat" />} />
				<Route path="chat" element={<ComingSoon />} />
				<Route path="video" element={<ComingSoon />} />
				<Route path="*" element={<NotFound />} />
			</Route>
			<Route path="/support-nest" element={<SupportNest />} />
			<Route path="*" element={<NotFound />} />
		</Routes>
	)
}

export default AppRouter
