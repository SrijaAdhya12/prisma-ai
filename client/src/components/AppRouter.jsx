import { Home, ComingSoon, NotFound, SupportNest } from '@/pages'
import { Profile, Dashboard, Settings, Goals } from '@/pages/dashboard'
import { MoodSense, VideoSense, SupportBot, EmoSense } from '@/pages/emosense'
import { Therafy, MoodMusic } from '@/pages/therafy'
// import { Chat, ProCare } from '@/pages/procare'
import { PrivateRoute } from '@/routes'
import { Navigate, Route, Routes, useLocation } from 'react-router-dom'

const AppRouter = () => {
	const location = useLocation()
	return (
		<Routes location={location}>
			<Route path="/" element={<Home />} />
			<Route path="/dashboard" element={<PrivateRoute component={<Dashboard />} />}>
				<Route path="" element={<Navigate to="profile" />} />
				<Route path="profile" element={<Profile />} />
				<Route path="settings" element={<ComingSoon />} />
				<Route path="goals" element={<Goals />} />
				<Route path="*" element={<NotFound />} />
			</Route>
			<Route path="/emo-sense" element={<PrivateRoute component={<EmoSense />} />}>
				<Route path="" element={<Navigate to="mood-sense" />} />
				<Route path="mood-sense" element={<MoodSense />} />
				<Route path="video-sense" element={<VideoSense />} />
				<Route path="support-bot" element={<SupportBot />} />
				<Route path="*" element={<NotFound />} />
			</Route>
			<Route path="/therafy" element={<PrivateRoute component={<Therafy />} />}>
				<Route path="" element={<Navigate to="mood-music" />} />
				<Route path="mood-music" element={<MoodMusic />} />
				<Route path="content-theraphy" element={<VideoSense />} />
				<Route path="physical-theraphy" element={<SupportBot />} />
				<Route path="*" element={<NotFound />} />
			</Route>
			{/* <Route path="/pro-care" element={<PrivateRoute component={<ProCare />} />}>
				<Route path="" element={<Navigate to="chat" />} />
				<Route path="chat" element={<Chat />} />
				<Route path="video" element={<ComingSoon />} />
				<Route path="*" element={<NotFound />} />
			</Route> */}
			<Route path="/support-nest" element={<SupportNest />} />
			<Route path="*" element={<NotFound />} />
		</Routes>
	)
}

export default AppRouter
