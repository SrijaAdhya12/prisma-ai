import { useRef, useEffect, useState } from 'react'
import * as faceapi from 'face-api.js'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { loadModels } from '@/lib'
import { useToast } from '@/hooks'
import { Camera, CameraOff } from 'lucide-react'
import { moodColors } from '@/data'
import { Progress } from '@/components/ui/progress'
import { saveMoodData } from '@/api'
import { useAuth0 } from '@auth0/auth0-react'
import { Loader } from '@/components'
import { Loader2 } from 'lucide-react'

const MoodUploader = ({ duration = 4000 }) => {
	const [progress, setProgress] = useState(0)

	useEffect(() => {
		const interval = setInterval(() => {
			setProgress((prevProgress) => {
				if (prevProgress >= 100) {
					clearInterval(interval)
					return 100
				}
				return prevProgress + 2
			})
		}, duration / 50) 

		return () => clearInterval(interval)
	}, [duration])

	return (
		<div className="flex items-center space-x-2">
			<Loader2 className="h-4 w-4 animate-spin" />
			<div className="grid gap-1">
				<p className="font-medium">Uploading mood data...</p>
				<Progress value={progress} className="h-3 w-52" />
			</div>
		</div>
	)
}

const VideoSense = () => {
	const { user, isLoading } = useAuth0()
	const { toast } = useToast()
	const videoRef = useRef(null)
	const canvasRef = useRef(null)
	const [isSaving, setIsSaving] = useState(false)
	const initialMoodData = { neutral: 0, happy: 0, sad: 0, angry: 0, fearful: 0, disgusted: 0, surprised: 0 }
	const initialData = { isCameraActive: false, isModelLoaded: false, moodData: initialMoodData }
	const [isCameraActive, setIsCameraActive] = useState(initialData.isCameraActive)
	const [isModelLoaded, setIsModelLoaded] = useState(initialData.isModelLoaded)
	const [moodData, setMoodData] = useState(initialMoodData)

	useEffect(() => {
		loadModels()
			.then(() => {
				setIsModelLoaded(true)
			})
			.catch((error) => {
				toast({
					title: 'Model Error',
					description: 'Failed to load face detection models',
					variant: 'destructive'
				})
				console.error('Error loading models:', error)
			})
	}, [toast])

	useEffect(() => {
		let detectionInterval
		const detectFaces = async () => {
			if (!videoRef.current || !canvasRef.current || !isModelLoaded || !isCameraActive) {
				return toast({
					title: 'Camera Error',
					description: 'Detection prerequisites not met',
					variant: 'destructive'
				})
			}

			try {
				const detections = await faceapi
					.detectAllFaces(videoRef.current, new faceapi.TinyFaceDetectorOptions())
					.withFaceExpressions()

				if (detections && detections.length > 0) {
					const canvas = canvasRef.current
					const displaySize = { width: videoRef.current.videoWidth, height: videoRef.current.videoHeight }
					faceapi.matchDimensions(canvas, displaySize)

					const resizedDetections = faceapi.resizeResults(detections, displaySize)
					canvas.getContext('2d')?.clearRect(0, 0, canvas.width, canvas.height)
					faceapi.draw.drawDetections(canvas, resizedDetections)
					faceapi.draw.drawFaceExpressions(canvas, resizedDetections)

					const expressions = resizedDetections[0].expressions
					setMoodData(expressions)
				}
			} catch (error) {
				if (error.message.startsWith('resizeResults')) {
					return
				}
				toast({
					title: 'Camera Access',
					description: 'We need your camera to detect your mood',
					variant: 'info'
				})
			}
		}

		if (isCameraActive && isModelLoaded) {
			detectionInterval = setInterval(detectFaces, 100)
		}

		return () => {
			if (detectionInterval) {
				clearInterval(detectionInterval)
			}
		}
	}, [isCameraActive, isModelLoaded, toast])

	const startVideo = () => {
		navigator.mediaDevices
			.getUserMedia({ video: { facingMode: 'user' } })
			.then((stream) => {
				if (videoRef.current) {
					videoRef.current.srcObject = stream
					videoRef.current.onloadedmetadata = () => {
						videoRef.current?.play()
						setIsCameraActive(true)
					}
				}
			})
			.catch((err) => {
				toast({
					title: 'Camera Access Denied',
					description: 'Failed to access camera, please allow camera access in your browser settings',
					variant: 'destructive'
				})
				console.error('Error accessing camera:', err)
			})
	}

	const stopVideo = async () => {
		setIsSaving(true)
		try {
			if (videoRef.current && videoRef.current.srcObject) {
				const tracks = videoRef.current.srcObject.getTracks() // Stop all tracks
				tracks.forEach((track) => track.stop()) // Clear the srcObject
				videoRef.current.srcObject = null
			}
			setMoodData(initialData.moodData)
			setIsCameraActive(false)
			toast({ description: <MoodUploader />, duration: 4000 })
			await saveMoodData({ user_id: user.sub, moodData })
		} catch (error) {
			toast({ title: 'Mood Data Error', description: error, variant: 'destructive' })
			console.error(error)
		} finally {
			setIsSaving(false)
		}
	}

	const toggleCamera = () => (isCameraActive ? stopVideo() : startVideo())

	return (
		<div className="container mx-auto p-4">
			<h1 className="mb-6 text-center text-3xl font-bold">Video Sense</h1>
			<div className="space-y-6">
				<Card className="overflow-hidden">
					<CardHeader className="flex flex-row items-center justify-between">
						<CardTitle>Face Detection</CardTitle>
						<Button
							onClick={toggleCamera}
							variant={isCameraActive ? 'secondary' : 'default'}
							disabled={!isModelLoaded}
							className="flex items-center gap-2"
						>
							{isCameraActive ? (
								<>
									<CameraOff className="h-4 w-4" />
									<span className="sr-only md:not-sr-only">Close Camera</span>
								</>
							) : (
								<>
									<Camera className="h-4 w-4" />
									<span className="sr-only md:not-sr-only">Open Camera</span>
								</>
							)}
							{isLoading && <Loader variant="small" />}
						</Button>
					</CardHeader>
					<CardContent className="p-3">
						<div className="relative left-1/2 aspect-video h-96 w-full -translate-x-1/2 sm:aspect-[4/3] sm:w-5/12 md:aspect-[16/9]">
							<video
								ref={videoRef}
								autoPlay
								muted
								playsInline
								className="absolute inset-0 h-full w-full object-cover"
							/>
							<canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />
						</div>
					</CardContent>
				</Card>
				<Card>
					<CardHeader>
						<CardTitle>Mood Analysis</CardTitle>
					</CardHeader>
					<CardContent>
						<div className="space-y-4">
							{Object.entries(moodData).map(([mood, value]) => (
								<div key={mood} className="flex items-center space-x-2">
									<span className="w-20 text-sm font-medium capitalize">{mood}</span>
									<Progress value={value * 100} color={moodColors[mood]} className="h-6 flex-grow" />
									<span className="w-12 text-right text-sm font-medium">
										{(value * 100).toFixed(0)}%
									</span>
								</div>
							))}
						</div>
					</CardContent>
				</Card>
			</div>
		</div>
	)
}

export default VideoSense
