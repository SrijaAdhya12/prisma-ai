import { useState, useEffect, useRef } from 'react'
import { useAuth0 } from '@auth0/auth0-react'
import { getMoodExercises, getCurrentMood } from '@/api'
import { Button } from '@/components/ui/button'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'
import { ScrollArea } from '@/components/ui/scroll-area'
import { CheckCircle2 } from 'lucide-react'
import { Loader } from '@/components'
import { images } from '@/data'
import { toast as sonnerToast } from 'sonner'
import { useNavigate } from 'react-router-dom'

const CBTExercise = () => {
	const { user, isAuthenticated, isLoading } = useAuth0()
	const [exercises, setExercises] = useState([])
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState(null)
	const excersiseFetchedRef = useRef(false)
	const navigate = useNavigate()
	useEffect(() => {
		if (isAuthenticated) {
			fetchExercises()
		}
	}, [isAuthenticated])

	const fetchExercises = async () => {
		if (excersiseFetchedRef.current) {
			return
		}
		excersiseFetchedRef.current = true
		setLoading(true)
		setError(null)
		try {
			const user_id = user.sub
			const response = await getMoodExercises(user_id)
			setExercises(response)
			const fetchedMood = await getCurrentMood(user.sub)
			sonnerToast(`Your current mood was ${fetchedMood}`, {
				description: `Suggsting you excersises for ${fetchedMood} mood .`,
				duration: 5000,
				action: {
					label: 'Dismiss',
					onClick: () => sonnerToast.dismiss()
				}
			})
		} catch (error) {
			console.error(error)
			sonnerToast('No mood for the day', {
				description: 'Go record your mood',
				duration: 10000,
				action: {
					label: 'Video Sense',
					onClick: () => navigate('/emo-sense')
				}
			})
		} finally {
			setLoading(false)
		}
	}

	if (isLoading) {
		return <Loader />
	}

	return (
		<div className="bg-background text-foreground min-h-screen px-4 sm:container sm:mx-auto sm:px-16">
			<div className="my-5 flex flex-col items-start sm:my-10">
				<h1 className="mb-4 text-3xl font-bold">CBT Exercises</h1>
				<p className="text-muted-foreground mb-6">Personalized CBT exercises based on your current mood</p>
			</div>

			<div className="border-0 sm:border">
				<h3 className="pb-10 sm:p-10 text-2xl font-semibold sm:text-center">Suggested CBT Exercises</h3>
				<div>
					<ScrollArea className="h-[600px] w-full p-0 border-0 px-5">
						{loading
							? [1, 2, 3].map((index) => (
									<Card className="mb-8 overflow-hidden">
										<CardContent className="p-6">
											<div className="mb-4 h-48 w-full animate-pulse rounded bg-gray-200" />
											<div className="mb-2 h-8 w-3/4 animate-pulse bg-gray-200" />
											<div className="mb-4 h-4 w-full animate-pulse bg-gray-200" />
											<div className="mb-2 h-6 w-1/4 animate-pulse bg-gray-200" />
											<div className="space-y-2">
												{[...Array(3)].map((_, index) => (
													<div key={index} className="flex items-start">
														<div className="mr-2 h-5 w-5 animate-pulse rounded-full bg-gray-200" />
														<div className="h-5 w-full animate-pulse bg-gray-200" />
													</div>
												))}
											</div>
										</CardContent>
									</Card>
								))
							: exercises.map((exercise, index) => (
									<Card key={index} className="mb-8 overflow-hidden">
										<CardContent className="p-6">
											<img
												src={images[index]}
												alt="excersise image"
												className="mb-4 h-48 w-full rounded object-cover"
											/>
											<h3 className="mb-2 text-2xl font-bold">{exercise.title}</h3>
											<p className="text-muted-foreground mb-4">{exercise.description}</p>
											<h4 className="mb-2 text-xl font-semibold">Steps:</h4>
											<ol className="list-inside list-decimal space-y-2">
												{exercise.steps.map((step, stepIndex) => (
													<li key={stepIndex} className="flex items-start">
														<CheckCircle2 className="mr-2 mt-1 h-5 w-5 flex-shrink-0 text-green-500" />
														<span>{step}</span>
													</li>
												))}
											</ol>
										</CardContent>
									</Card>
								))}
					</ScrollArea>
				</div>
			</div>
		</div>
	)
}

export default CBTExercise
