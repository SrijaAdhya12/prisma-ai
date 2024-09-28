import { Progress } from '@/components/ui/progress'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { Activity, Brain, Heart, Moon } from 'lucide-react'
import { BentoGrid, BentoGridItem } from '@/components/ui/bento-grid'
import { SkeletonTwo, SkeletonThree } from '@/components/ui/skeletons'
import { sleepData, exerciseData } from '@/data'

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
	return (
		<div className="min-h-screen p-4">
			<h1 className="mb-8 text-4xl font-bold">Profile</h1>
			<BentoGrid className="*:border max-w-full grid-cols-1 gap-6 sm:p-0 md:grid-cols-2 lg:grid-cols-4">
				<BentoGridItem
					className="md:col-span-2 lg:col-span-1"
					title="Avg. Sleep"
					description={
						<span className="text-2xl font-bold">
							{sleepData.reduce((sum, item) => sum + item.hours, 0).toFixed(1) / 7}h
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
							5/7 days
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
							4h 30m
							<div className="text-muted-foreground text-xs font-normal">This Week</div>
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
							Medium
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
							<div className="text-muted-foreground text-xs font-normal">
								Minuites of exercise per day
							</div>
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
				<BentoGridItem
					className="md:col-span-4"
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
									<GoalProgress title="Meditate for 15 minutes" progress={100} />
									<GoalProgress title="8 hours of sleep" progress={75} />
									<GoalProgress title="8 hours of sleep" progress={75} />
								</div>
							</TabsContent>
							<TabsContent value="weekly">
								<div className="space-y-4">
									<GoalProgress title="Attend therapy session" progress={100} />
									<GoalProgress title="Connect with a friend" progress={50} />
								</div>
							</TabsContent>
							<TabsContent value="monthly">
								<div className="space-y-4">
									<GoalProgress title="Read a self-help book" progress={60} />
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
