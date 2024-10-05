import { useState, useEffect } from 'react'
import { useAuth0 } from '@auth0/auth0-react'
import { getMoodExercises } from '@/api'
import { Button } from '@/components/ui/button'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'
import { ScrollArea } from '@/components/ui/scroll-area'
import { CheckCircle2 } from 'lucide-react'
import { Loader } from '@/components'
const CBTExercise = () => {
	const { user, isAuthenticated, isLoading } = useAuth0()
	const [exercises, setExercises] = useState([])
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState(null)

	useEffect(() => {
		if (isAuthenticated) {
			fetchExercises()
		}
	}, [isAuthenticated])

	const fetchExercises = async () => {
		setLoading(true)
		setError(null)
		try {
			const user_id = user.sub
			const response = await getMoodExercises(user_id)
			setExercises(response)
		} catch (err) {
			setError("Mood not found for the day")
		} finally {
			setLoading(false)
		}
	}

	if (isLoading) {
		return <Loader />
	}

	return (
		<div className="bg-background text-foreground container mx-auto min-h-screen p-4">
			<Card className="mb-8">
				<CardHeader>
					<CardTitle className="text-center text-3xl font-bold">CBT Exercise Suggester</CardTitle>
					<CardDescription className="text-center text-lg">
						Personalized CBT exercises based on your current mood
					</CardDescription>
				</CardHeader>
			</Card>

			{loading && (
				<Card>
					<CardContent className="p-6 text-center">
						<Loader />
					</CardContent>
				</Card>
			)}

			{error && (
				<Card>
					<CardContent className="p-6 text-center">
						<p className="text-red-500">Error: {error}</p>
						<Button onClick={fetchExercises} className="mt-4">
							Retry
						</Button>
					</CardContent>
				</Card>
			)}

			{!loading && !error && exercises.length > 0 && (
				<Card>
					<CardHeader>
						<CardTitle className="text-center text-2xl font-semibold">Suggested CBT Exercises</CardTitle>
					</CardHeader>
					<CardContent>
						<ScrollArea className="h-[600px] w-full  p-4">
							{exercises.map((exercise, index) => (
								<Card key={index} className="mb-8 overflow-hidden">
									<CardContent className="p-6">
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
					</CardContent>
				</Card>
			)}

			<div className="mt-8 text-center">
				<Button onClick={fetchExercises} className="bg-primary text-primary-foreground hover:bg-primary/90">
					Refresh Exercises
				</Button>
			</div>
		</div>
	)
}

export default CBTExercise
