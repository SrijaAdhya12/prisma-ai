import React, { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Play, Pause } from 'lucide-react'
import { SpotifyApi } from '@spotify/web-api-ts-sdk'

const spotifyApi = SpotifyApi.withClientCredentials(
	import.meta.env.VITE_SPOTIFY_CLIENT_ID,
	import.meta.env.VITE_SPOTIFY_CLIENT_SECRET
)

const moodToGenre = {
	happy: 'pop',
	sad: 'blues',
	energetic: 'dance',
	calm: 'ambient',
	angry: 'rock',
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
	const [mood, setMood] = useState('happy')
	const [playlist, setPlaylist] = useState([])
	const [loading, setLoading] = useState(false)
	const [isPlaying, setIsPlaying] = useState(false)
	const [currentSong, setCurrentSong] = useState(0)
	const [error, setError] = useState(null)

	const fetchPlaylist = async () => {
		setLoading(true)
		setError(null)
		try {
			const genre = moodToGenre[mood]
			const response = await spotifyApi.search(`genre:${genre}`, ['track'], 'US', 10)
			const tracks = response.tracks.items.map((track) => ({
				id: track.id,
				name: track.name,
				artist: track.artists[0].name,
				albumArt: track.album.images[0]?.url || '/placeholder.svg?height=200&width=200'
			}))
			setPlaylist(tracks)
			setIsPlaying(true)
			setCurrentSong(0)
		} catch (err) {
			console.error('Error fetching playlist:', err)
			setError('Failed to fetch playlist. Please try again.')
		} finally {
			setLoading(false)
		}
	}

	useEffect(() => {
		fetchPlaylist()
	}, [mood])

	const togglePlayPause = () => {
		setIsPlaying(!isPlaying)
	}

	const nextSong = () => {
		setCurrentSong((prev) => (prev + 1) % playlist.length)
	}

	useEffect(() => {
		if (isPlaying) {
			const timer = setTimeout(nextSong, 30000) // Change song every 30 seconds
			return () => clearTimeout(timer)
		}
	}, [isPlaying, currentSong])

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
									<SelectItem value="happy">Happy</SelectItem>
									<SelectItem value="sad">Sad</SelectItem>
									<SelectItem value="energetic">Energetic</SelectItem>
									<SelectItem value="calm">Calm</SelectItem>
									<SelectItem value="angry">Angry</SelectItem>
								</SelectContent>
							</Select>
						</div>

						{error && <div className="mb-4 text-red-500">{error}</div>}

						{loading ? (
							<div className="text-center text-xl">Loading playlist...</div>
						) : (
							<div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
								{playlist.map((song, index) => (
									<Card key={song.id} className="border-none bg-gray-900">
										<CardContent className="p-4">
											<div className="relative">
												<img
													src={song.albumArt}
													alt={song.name}
													className="mb-4 aspect-square w-full rounded-md object-cover"
												/>
												{index === currentSong && (
													<div className="absolute inset-0 flex items-center justify-center rounded-md bg-black bg-opacity-50">
														{isPlaying ? (
															<Pause className="h-12 w-12 text-white" />
														) : (
															<Play className="h-12 w-12 text-white" />
														)}
													</div>
												)}
											</div>
											<h3 className="truncate font-semibold">{song.name}</h3>
											<p className="truncate text-sm text-gray-400">{song.artist}</p>
										</CardContent>
									</Card>
								))}
							</div>
						)}

						{playlist.length > 0 && (
							<div className="mt-8 flex justify-center">
								<Button onClick={togglePlayPause} size="lg" className="px-8 py-6 text-lg">
									{isPlaying ? <Pause className="mr-2 h-6 w-6" /> : <Play className="mr-2 h-6 w-6" />}
									{isPlaying ? 'Pause' : 'Play'}
								</Button>
							</div>
						)}
					</section>
				</main>
			</div>
		</div>
	)
}

export default MoodMusic
