import { useState } from 'react'
import { Progress } from '@/components/ui/progress'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { Activity, Brain, Heart, Moon, Plus } from 'lucide-react'
import { BentoGrid, BentoGridItem } from '@/components/ui/bento-grid'
import { SkeletonTwo, SkeletonThree } from '@/components/ui/skeletons'
import { Button } from '@/components/ui/button'
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger
} from '@/components/ui/dialog'
import { DialogForm } from '@/components'

const GoalProgress = ({ title, progress }) => {
	return (
		<div className="space-y-2">
			<div className="flex justify-between">
				<span className="text-sm font-medium">{title}</span>
				<span className="text-muted-foreground text-sm">{progress}%</span>
			</div>
			<Progress value={progress} />
		</div>
	)
}

const Profile = () => {
	const [isDialogOpen, setIsDialogOpen] = useState(false)
	const initialData = {
		profileData: { sleep: 0, meditation: 0, exercise: 0, stressLevel: 'Medium' },
		sleepData: [
			{ day: 'Mon', hours: 0 },
			{ day: 'Tue', hours: 0 },
			{ day: 'Wed', hours: 0 },
			{ day: 'Thu', hours: 0 },
			{ day: 'Fri', hours: 0 },
			{ day: 'Sat', hours: 0 },
			{ day: 'Sun', hours: 0 }
		],
		exerciseData: [
			{ day: 'Mon', minutes: 0 },
			{ day: 'Tue', minutes: 0 },
			{ day: 'Wed', minutes: 0 },
			{ day: 'Thu', minutes: 0 },
			{ day: 'Fri', minutes: 0 },
			{ day: 'Sat', minutes: 0 },
			{ day: 'Sun', minutes: 0 }
		]
	}

	const [profileData, setProfileData] = useState(initialData.profileData)
	const [sleepData, setSleepData] = useState(initialData.sleepData)
	const [exerciseData, setExerciseData] = useState(initialData.exerciseData)

	function handleFormSubmit(data) {
		setProfileData(data)
		setSleepData((prevData) => {
			const newData = [...prevData]
			newData[newData.length - 1].hours = data.sleep
			return newData
		})
		setExerciseData((prevData) => {
			const newData = [...prevData]
			newData[newData.length - 1].minutes = data.exercise
			return newData
		})
	}

	return (
		<div className="min-h-screen p-4">
			<div className="mb-8 flex items-center justify-between">
				<h1 className="text-4xl font-bold">Profile</h1>
				<Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
					<DialogTrigger asChild>
						<Button variant="outline" size="icon" className="rounded-full">
							<Plus className="h-4 w-4" />
						</Button>
					</DialogTrigger>
					<DialogContent>
						<DialogHeader>
							<DialogTitle>Update Profile Data</DialogTitle>
							<DialogDescription>
								Enter your daily wellness data to update your profile.
							</DialogDescription>
						</DialogHeader>
						<DialogForm onSubmit={handleFormSubmit} onClose={() => setIsDialogOpen(false)} />
					</DialogContent>
				</Dialog>
			</div>
			<BentoGrid className="max-w-full grid-cols-1 gap-6 *:border sm:p-0 md:grid-cols-2 lg:grid-cols-4">
				<BentoGridItem
					className="md:col-span-2 lg:col-span-1"
					title="Avg. Sleep"
					description={
						<span className="text-2xl font-bold">
							{profileData.sleep.toFixed(1)} hrs
							<div className="text-muted-foreground text-xs font-normal">Last 7 days</div>
						</span>
					}
					header={<SkeletonThree />}
					icon={
						<div className="left-0 z-50 flex justify-end">
							<Moon className="size-6" />
						</div>
					}
				/>
				<BentoGridItem
					className="md:col-span-2 lg:col-span-1"
					title="Meditation"
					description={
						<span className="text-2xl font-bold">
							{profileData.meditation} min/7 days
							<div className="text-muted-foreground text-xs font-normal">Weekly goal</div>
						</span>
					}
					header={<SkeletonTwo />}
					icon={
						<div className="left-0 z-50 flex justify-end">
							<Brain className="size-6" />
						</div>
					}
				/>
				<BentoGridItem
					className="md:col-span-2 lg:col-span-1"
					title="Exercise"
					description={
						<span className="text-2xl font-bold">
							{profileData.exercise} min
							<div className="text-muted-foreground text-xs font-normal">Today</div>
						</span>
					}
					header={<SkeletonThree />}
					icon={
						<div className="left-0 z-50 flex justify-end">
							<Activity className="size-6" />
						</div>
					}
				/>
				<BentoGridItem
					className="md:col-span-2 lg:col-span-1"
					title="Stress Level"
					description={
						<span className="text-2xl font-bold">
							{profileData.stressLevel}
							<div className="text-muted-foreground text-xs font-normal">Based on your inputs</div>
						</span>
					}
					header={<SkeletonThree />}
					icon={
						<div className="left-0 z-50 flex justify-end">
							<Heart className="size-6" />
						</div>
					}
				/>
				<BentoGridItem
					className="md:col-span-2"
					header={
						<span className="text-2xl font-bold">
							Sleep Pattern
							<div className="text-muted-foreground text-xs font-normal">Hours of sleep per night</div>
						</span>
					}
					description={
						<ResponsiveContainer width="100%" height={200}>
							<LineChart data={sleepData}>
								<CartesianGrid strokeDasharray="3 3" />
								<XAxis dataKey="day" />
								<YAxis />
								<Tooltip />
								<Line type="monotone" dataKey="hours" stroke="#8884d8" />
							</LineChart>
						</ResponsiveContainer>
					}
				/>
				<BentoGridItem
					className="md:col-span-2"
					header={
						<span className="text-2xl font-bold">
							Exercise Routine
							<div className="text-muted-foreground text-xs font-normal">Minutes of exercise per day</div>
						</span>
					}
					description={
						<ResponsiveContainer width="100%" height={200}>
							<LineChart data={exerciseData}>
								<CartesianGrid strokeDasharray="3 3" />
								<XAxis dataKey="day" />
								<YAxis />
								<Tooltip />
								<Line type="monotone" dataKey="minutes" stroke="#82ca9d" />
							</LineChart>
						</ResponsiveContainer>
					}
				/>
			</BentoGrid>
			<BentoGrid className="mt-5 h-96 max-w-full gap-6 *:border sm:p-0 md:auto-rows-[20rem] md:grid-cols-1">
				<BentoGridItem
					className="col-span-3"
					header={
						<span className="text-2xl font-bold">
							Wellness Goals
							<div className="text-muted-foreground text-xs font-normal">
								Track your progress towards better mental health
							</div>
						</span>
					}
					description={
						<Tabs defaultValue="daily" className="h-52">
							<TabsList>
								<TabsTrigger value="daily">Daily</TabsTrigger>
								<TabsTrigger value="weekly">Weekly</TabsTrigger>
								<TabsTrigger value="monthly">Monthly</TabsTrigger>
							</TabsList>
							<TabsContent value="daily">
								<div className="space-y-4">
									<GoalProgress
										title="Meditate for 15 minutes"
										progress={Math.min(100, (profileData.meditation / 15) * 100)}
									/>
									<GoalProgress
										title="8 hours of sleep"
										progress={Math.min(100, (profileData.sleep / 8) * 100)}
									/>
									<GoalProgress
										title="30 minutes of exercise"
										progress={Math.min(100, (profileData.exercise / 30) * 100)}
									/>
								</div>
							</TabsContent>
							<TabsContent value="weekly">
								<div className="space-y-4">
									<GoalProgress
										title="Meditate 5 times"
										progress={Math.min(100, (profileData.meditation / 5) * 100)}
									/>
									<GoalProgress
										title="Exercise 3 hours"
										progress={Math.min(100, ((profileData.exercise * 7) / 180) * 100)}
									/>
								</div>
							</TabsContent>
							<TabsContent value="monthly">
								<div className="space-y-4">
									<GoalProgress
										title="Achieve low stress level"
										progress={profileData.stressLevel === 'Low' ? 100 : 50}
									/>
								</div>
							</TabsContent>
						</Tabs>
					}
				/>
			</BentoGrid>
		</div>
	)
}

export default Profile
