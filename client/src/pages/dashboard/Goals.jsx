import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Calendar } from '@/components/ui/calendar'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Checkbox } from '@/components/ui/checkbox'
import { cn } from '@/lib'
import { format } from 'date-fns'
import { Calendar as CalendarIcon, Plus, Trash2, CheckCircle2, TriangleAlert } from 'lucide-react'
import { useToast } from '@/hooks'

const Goals = () => {
	const { toast } = useToast()
	const initialData = {
		activeTab: 'daily',
		goals: { daily: [], monthly: [], yearly: [] },
		newGoal: { id: '', title: '', category: '', dueDate: undefined, completed: false }
	}
	const [activeTab, setActiveTab] = useState(initialData.activeTab)
	const [goals, setGoals] = useState(initialData.goals)
	const [newGoal, setNewGoal] = useState(initialData.newGoal)

	const handleAddGoal = () => {
		if (newGoal.title && newGoal.category) {
			setGoals((prevGoals) => ({
				...prevGoals,
				[activeTab]: [...prevGoals[activeTab], { ...newGoal, id: Date.now().toString() }]
			}))
			setNewGoal(initialData.newGoal)
		} else {
			toast({
				title: 'Warning',
				description: 'Please fill in all fields',
				variant: 'warning',
				action: <TriangleAlert className="mr-2" />
			})
		}
	}

	const handleDeleteGoal = (id) => {
		setGoals((prevGoals) => ({
			...prevGoals,
			[activeTab]: prevGoals[activeTab].filter((goal) => goal.id !== id)
		}))
	}

	const handleToggleGoalCompletion = (id) => {
		setGoals((prevGoals) => ({
			...prevGoals,
			[activeTab]: prevGoals[activeTab].map((goal) =>
				goal.id === id ? { ...goal, completed: !goal.completed } : goal
			)
		}))
	}

	return (
		<div className="container min-h-screen">
			<h1 className="mb-8 mt-9 text-4xl font-bold sm:mt-0">Goals</h1>
			<Card className="mx-auto w-full">
				<CardHeader>
					<CardTitle>Personal Goal Setting and Tracking</CardTitle>
					<CardDescription>Set, manage, and track your mental health goals</CardDescription>
				</CardHeader>
				<CardContent>
					<Tabs value={activeTab} onValueChange={(value) => setActiveTab(value)}>
						<TabsList className="grid w-full grid-cols-3">
							<TabsTrigger value="daily">Daily</TabsTrigger>
							<TabsTrigger value="monthly">Monthly</TabsTrigger>
							<TabsTrigger value="yearly">Yearly</TabsTrigger>
						</TabsList>
						{['daily', 'monthly', 'yearly'].map((timeFrame) => (
							<TabsContent key={timeFrame} value={timeFrame}>
								<div className="space-y-4">
									<div className="flex flex-col space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0">
										<Input
											placeholder="Enter your goal"
											value={newGoal.title}
											onChange={(e) => setNewGoal({ ...newGoal, title: e.target.value })}
											className="flex-grow"
										/>
										<Select
											value={newGoal.category}
											onValueChange={(value) => setNewGoal({ ...newGoal, category: value })}
										>
											<SelectTrigger className="w-full sm:w-[180px]">
												<SelectValue placeholder="Category" />
											</SelectTrigger>
											<SelectContent>
												<SelectItem value="sleep">Sleep</SelectItem>
												<SelectItem value="exercise">Exercise</SelectItem>
												<SelectItem value="meditation">Meditation</SelectItem>
												<SelectItem value="nutrition">Nutrition</SelectItem>
												<SelectItem value="social">Social</SelectItem>
											</SelectContent>
										</Select>
										<Popover>
											<PopoverTrigger asChild>
												<Button
													variant={'outline'}
													className={cn(
														'w-full justify-start text-left font-normal sm:w-[280px]',
														!newGoal.dueDate && 'text-muted-foreground'
													)}
												>
													<CalendarIcon className="mr-2 h-4 w-4" />
													{newGoal.dueDate ? (
														format(newGoal.dueDate, 'PPP')
													) : (
														<span>Pick a date</span>
													)}
												</Button>
											</PopoverTrigger>
											<PopoverContent className="w-auto p-0">
												<Calendar
													mode="single"
													selected={newGoal.dueDate}
													onSelect={(date) => setNewGoal({ ...newGoal, dueDate: date })}
													initialFocus
												/>
											</PopoverContent>
										</Popover>
										<Button onClick={handleAddGoal} className="w-full sm:w-auto">
											<Plus className="mr-2 h-4 w-4" /> Add Goal
										</Button>
									</div>
									{goals[timeFrame].map((goal) => (
										<div
											key={goal.id}
											className="bg-accent flex items-center justify-between rounded-lg p-4 shadow"
										>
											<div className="flex items-center space-x-4">
												<Checkbox
													checked={goal.completed}
													onCheckedChange={() => handleToggleGoalCompletion(goal.id)}
													id={`goal-${goal.id}`}
												/>
												<div>
													<h3
														className={cn(
															'font-semibold',
															goal.completed && 'text-muted-foreground line-through'
														)}
													>
														{goal.title}
													</h3>
													<p className="text-muted-foreground text-sm">
														Category: {goal.category}
														{goal.dueDate && ` | Due: ${format(goal.dueDate, 'PPP')}`}
													</p>
												</div>
											</div>
											<div className="flex items-center space-x-2">
												{goal.completed && <CheckCircle2 className="text-success h-5 w-5" />}
												<Button
													variant="destructive"
													size="icon"
													onClick={() => handleDeleteGoal(goal.id)}
												>
													<Trash2 className="h-4 w-4" />
												</Button>
											</div>
										</div>
									))}
								</div>
							</TabsContent>
						))}
					</Tabs>
				</CardContent>
			</Card>
		</div>
	)
}

export default Goals
