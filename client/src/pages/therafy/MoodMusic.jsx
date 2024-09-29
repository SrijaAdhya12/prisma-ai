import { useState, useEffect, useRef } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { SpotifyApi } from '@spotify/web-api-ts-sdk'
import { getCurrentMood } from '@/api'
import { useAuth0 } from '@auth0/auth0-react'
import { toast as sonnerToast } from 'sonner'
import { Link, useNavigate } from 'react-router-dom'
import { useToast } from '@/hooks'
import { Loader } from '@/components'

const spotifyApi = SpotifyApi.withClientCredentials(
	import.meta.env.VITE_SPOTIFY_CLIENT_ID,
	import.meta.env.VITE_SPOTIFY_CLIENT_SECRET
)

const moodToGenre = {
	happy: 'pop',
	sad: 'blues',
	energetic: 'dance',
	calm: 'ambient',
	angry: 'calm',
	anxious: 'electronic',
	depressed: 'classical',
	excited: 'hip-hop',
	frustrated: 'country',
	grateful: 'reggae',
	lonely: 'jazz',
	relaxed: 'latin',
	stressed: 'electronic'
}

const MoodMusic = () => {
	const { user } = useAuth0()
	const { toast } = useToast()
	const [mood, setMood] = useState('happy')
	const moodFetchedRef = useRef(false)
	const [playlist, setPlaylist] = useState([])
	const [loading, setLoading] = useState(false)
	const navigate = useNavigate()
	const fetchPlaylist = async () => {
		setLoading(true)
		try {
			const genre = moodToGenre[mood]
			const response = await spotifyApi.search(`genre:${genre}`, ['track'], 'US', 10)
			const tracks = response.tracks.items.map((track) => ({
				id: track.id,
				name: track.name,
				artist: track.artists[0].name,
				albumArt: track.album.images[0]?.url || '/placeholder.svg?height=200&width=200',
				url: track.external_urls.spotify
			}))
			setPlaylist(tracks)
		} catch (err) {
			toast({
				title: 'Error',
				description: err.message,
				variant: 'Destructive',
				action: <TriangleAlert className="mr-2" />
			})
			console.error(err.message)
		} finally {
			setLoading(false)
		}
	}

	useEffect(() => {
		const fetchMood = async () => {
			if (moodFetchedRef.current) return
			moodFetchedRef.current = true

			const fetchedMood = await getCurrentMood(user.sub)
			if (fetchedMood) {
				setMood(fetchedMood)
				sonnerToast(`Your current mood was ${fetchedMood}`, {
					description: `Suggsting you ${moodToGenre[fetchedMood]} music.`,
					duration: 5000,
					action: {
						label: 'Dismiss',
						onClick: () => sonnerToast.dismiss()
					}
				})
			} else {
				sonnerToast('Help us improve your experience.', {
					description: 'Use Video Sense to log your mood.',
					duration: 10000,
					action: {
						label: 'Video Sense',
						onClick: () => navigate('/emo-sense')
					}
				})
			}
		}
		fetchMood()
	}, [user])

	useEffect(() => {
		fetchPlaylist()
	}, [mood])

	return (
		<div className="min-h-screen bg-black p-4 text-white md:p-8">
			<div className="mx-auto max-w-7xl">
				<header className="mb-8 flex items-center justify-between">
					<nav className="flex space-x-4">
						<button className="font-bold">Music</button>
						<button className="text-gray-400">Podcasts</button>
						<button className="text-gray-400">Live</button>
					</nav>
				</header>

				<main>
					<section className="mb-12">
						<h2 className="mb-4 text-3xl font-bold">Mood-Based Playlist</h2>
						<p className="mb-6 text-gray-400">Music that matches your mood. Updated daily.</p>

						<div className="mb-8">
							<Select value={mood} onValueChange={(value) => setMood(value)}>
								<SelectTrigger className="w-full md:w-64">
									<SelectValue placeholder="Select your mood" />
								</SelectTrigger>
								<SelectContent>
									{Object.keys(moodToGenre).map((mood) => (
										<SelectItem key={mood} value={mood}>
											{mood}
										</SelectItem>
									))}
								</SelectContent>
							</Select>
						</div>
						{loading ? (
							<div className="text-center text-xl">
								<Loader />
							</div>
						) : (
							<div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
								{playlist.map((song) => (
									<Card key={song.id} className="border-none bg-gray-900 hover:scale-105 transition-transform">
										<Link to={song.url} target="_blank">
											<CardContent className="p-4">
												<div className="relative">
													<img
														src={song.albumArt}
														alt={song.name}
														className="mb-4 aspect-square w-full rounded-md object-cover"
													/>
												</div>
												<h3 className="truncate font-semibold">{song.name}</h3>
												<p className="truncate text-sm text-gray-400">{song.artist}</p>
											</CardContent>
										</Link>
									</Card>
								))}
							</div>
						)}
					</section>
				</main>
			</div>
		</div>
	)
}

export default MoodMusic
