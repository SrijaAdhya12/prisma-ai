import { useState, useEffect } from 'react'
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, isSameDay } from 'date-fns'
import { Calendar as CalendarIcon, Frown, Meh, Smile } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Button } from '@/components/ui/button'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Calendar } from '@/components/ui/calendar'
import { cn } from '@/lib'
import { moods } from '@/data'

// Mock data for mood entries
const moodData = {
	'2023-09-01': 'happy',
	'2023-09-05': 'sad',
	'2023-09-10': 'neutral'
}

const moodColors = {
	happy: 'bg-green-500 dark:bg-green-700',
	sad: 'bg-red-500 dark:bg-red-700',
	neutral: 'bg-yellow-500 dark:bg-yellow-700'
}

const moodIcons = {
	happy: <Smile className="h-6 w-6" />,
	sad: <Frown className="h-6 w-6" />,
	neutral: <Meh className="h-6 w-6" />
}

const MoodSense = () => {
	const [date, setDate] = useState(new Date())
	const [selectedTimeframe, setSelectedTimeframe] = useState('month')
	const [mounted, setMounted] = useState(false)

	useEffect(() => {
		setMounted(true)
	}, [])

	const getMoodForDate = (date) => {
		const dateString = format(date, 'yyyy-MM-dd')
		return moodData[dateString]
	}

	const renderCalendarContent = () => {
		const start = startOfMonth(date)
		const end = endOfMonth(date)
		const days = eachDayOfInterval({ start, end })

		return (
			<div className="grid grid-cols-7 gap-1">
				{['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
					<div key={day} className="py-1 text-center text-sm font-medium">
						{day}
					</div>
				))}
				{days.map((day) => {
					const mood = getMoodForDate(day)
					return (
						<div
							key={day.toString()}
							className={cn(
								'flex aspect-square items-center justify-center rounded-full text-sm',
								isSameMonth(day, date) ? 'text-foreground' : 'text-muted-foreground',
								mood ? moodColors[mood] : 'bg-secondary dark:bg-secondary-dark',
								isSameDay(day, new Date()) ? 'ring-primary dark:ring-primary-dark ring-2' : ''
							)}
						>
							{format(day, 'd')}
						</div>
					)
				})}
			</div>
		)
	}

	const calculateMoodStats = () => {
		const moodCounts = { happy: 0, sad: 0, neutral: 0 }
		Object.values(moodData).forEach((mood) => {
			moodCounts[mood]++
		})
		return moodCounts
	}

	const moodStats = calculateMoodStats()

	if (!mounted) {
		return null
	}

	return (
		<div className="min-h-screen p-8">
			<div className="mx-auto max-w-4xl space-y-8">
				<div className="flex items-center justify-between">
					<h1 className="text-3xl font-bold">Mood Sense</h1>
				</div>

				<div className="flex items-center justify-between">
					<Popover>
						<PopoverTrigger asChild>
							<Button variant="outline" className="w-[240px] justify-start text-left font-normal">
								<CalendarIcon className="mr-2 h-4 w-4" />
								{format(date, 'MMMM yyyy')}
							</Button>
						</PopoverTrigger>
						<PopoverContent className="w-auto p-0" align="start">
							<Calendar
								mode="single"
								selected={date}
								onSelect={(newDate) => newDate && setDate(newDate)}
								initialFocus
								className="rounded-md border"
							/>
						</PopoverContent>
					</Popover>

					<Select value={selectedTimeframe} onValueChange={setSelectedTimeframe}>
						<SelectTrigger className="w-48">
							<SelectValue placeholder="Select timeframe" />
						</SelectTrigger>
						<SelectContent>
							<SelectItem value="week">Week</SelectItem>
							<SelectItem value="month">Month</SelectItem>
							<SelectItem value="year">Year</SelectItem>
						</SelectContent>
					</Select>
				</div>

				<div className="grid gap-8 md:grid-cols-3">
					<Card className="col-span-2">
						<CardHeader>
							<CardTitle>Mood Calendar</CardTitle>
						</CardHeader>
						<CardContent>{renderCalendarContent()}</CardContent>
					</Card>
					<MoodSummary moodStats={moodStats} />
				</div>
			</div>
		</div>
	)
}

const MoodSummary = ({ moodStats }) => {
	return (
		<Card className="col-span-2 sm:col-span-1">
			<CardHeader>
				<CardTitle>Mood Summary</CardTitle>
			</CardHeader>
			<CardContent>
				<div className="space-y-4">
					{Object.entries(moodStats).map(([mood, count]) => (
						<div key={mood} className="flex items-center justify-between">
							<div className="flex items-center">
								{moodIcons[mood]}
								<span className="ml-2 capitalize">{mood}</span>
							</div>
							<span className="font-bold">{count}</span>
						</div>
					))}
				</div>
			</CardContent>
		</Card>
	)
}

export default MoodSense
