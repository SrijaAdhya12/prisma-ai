import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { isSameWeek as dateFnsIsSameWeek } from 'date-fns'
import { useState, useEffect } from 'react'
import {
	format,
	startOfWeek,
	endOfWeek,
	startOfMonth,
	endOfMonth,
	startOfYear,
	endOfYear,
	eachDayOfInterval,
	eachMonthOfInterval,
	isSameMonth,
	isSameDay,
	isSameYear,
	getWeek,
	getYear,
	parseISO
} from 'date-fns'
import { Calendar as CalendarIcon, Frown, Meh, Smile, Angry, Annoyed, ThumbsDown, Zap } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Button } from '@/components/ui/button'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Calendar } from '@/components/ui/calendar'
import { cn } from '@/lib/utils'
import { getMoodData } from '@/api'
import { useAuth0 } from '@auth0/auth0-react'

const moodIcons = {
	neutral: <Meh className="h-6 w-6" />,
	happy: <Smile className="h-6 w-6" />,
	sad: <Frown className="h-6 w-6" />,
	angry: <Angry className="h-6 w-6" />,
	fearful: <Annoyed className="h-6 w-6" />,
	disgusted: <ThumbsDown className="h-6 w-6" />,
	surprised: <Zap className="h-6 w-6" />
}

const moodColors = {
	neutral: 'bg-gray-500',
	happy: 'bg-green-500',
	sad: 'bg-blue-500',
	angry: 'bg-red-500',
	fearful: 'bg-purple-500',
	disgusted: 'bg-yellow-500',
	surprised: 'bg-pink-500'
}

const MoodSummary = ({ moodStats, timeframe, selectedDay }) => {
	return (
		<Card className="col-span-2 sm:col-span-1">
			<CardHeader>
				<CardTitle>
					{selectedDay && timeframe === 'week'
						? `Mood for ${format(selectedDay, 'MMMM d, yyyy')}`
						: `Mood Summary (${timeframe})`}
				</CardTitle>
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
					{Object.keys(moodStats).length === 0 && (
						<div className="text-muted-foreground text-center">No mood data available</div>
					)}
				</div>
			</CardContent>
		</Card>
	)
}

const MoodSense = () => {
	const [date, setDate] = useState(new Date())
	const [selectedTimeframe, setSelectedTimeframe] = useState('month')
	const { user } = useAuth0()
	const [moodData, setMoodData] = useState({})
	const [mounted, setMounted] = useState(false)
	const [selectedDay, setSelectedDay] = useState(null)

	useEffect(() => {
		setMounted(true)
		fetchMoodData()
	}, [date, selectedTimeframe])

	const fetchMoodData = async () => {
		let start, end
		if (selectedTimeframe === 'week') {
			start = startOfWeek(date)
			end = endOfWeek(date)
		} else if (selectedTimeframe === 'month') {
			start = startOfMonth(date)
			end = endOfMonth(date)
		} else {
			start = startOfYear(date)
			end = endOfYear(date)
		}

		try {
			const moodData = await getMoodData(start, end, user.sub)
			setMoodData(moodData)
		} catch (error) {
			console.error('Failed to fetch mood data:', error)
		}
	}

	const getMoodForDate = (date) => {
		const dateString = format(date, 'yyyy-MM-dd')
		return moodData[dateString] || null
	}

	const renderYearView = () => {
		const months = eachMonthOfInterval({ start: startOfYear(date), end: endOfYear(date) })

		return (
			<div className="grid grid-cols-4 gap-4">
				{months.map((month) => (
					<button
						key={month.toString()}
						onClick={() => {
							setDate(month)
							setSelectedTimeframe('month')
						}}
						className={cn(
							'rounded-lg border border-gray-200 p-2 transition-colors hover:border-gray-300',
							isSameMonth(month, date) && selectedTimeframe !== 'year'
								? 'bg-primary text-primary-foreground'
								: 'bg-background'
						)}
					>
						<div className="mb-2 text-sm font-medium">{format(month, 'MMM yyyy')}</div>
						<div className="grid grid-cols-7 gap-1">
							{eachDayOfInterval({ start: startOfMonth(month), end: endOfMonth(month) }).map((day) => {
								const mood = getMoodForDate(day)
								return (
									<div
										key={day.toString()}
										className={cn(
											'h-2 w-2 rounded-full',
											mood ? moodColors[mood.emotion] : 'bg-gray-200'
										)}
									/>
								)
							})}
						</div>
					</button>
				))}
			</div>
		)
	}

	const renderMonthView = () => {
		const days = eachDayOfInterval({ start: startOfMonth(date), end: endOfMonth(date) })
		const startDate = startOfMonth(date)

		return (
			<div className="grid grid-cols-7 gap-2">
				{['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
					<div key={day} className="text-center text-sm font-medium">
						{day}
					</div>
				))}
				{Array.from({ length: startDate.getDay() }).map((_, index) => (
					<div key={`empty-${index}`} />
				))}
				{days.map((day) => {
					const mood = getMoodForDate(day)
					return (
						<Tooltip key={day.toString()}>
							<TooltipTrigger asChild>
								<button
									onClick={() => {
										setDate(day)
										setSelectedTimeframe('week')
									}}
									className={cn(
										'flex aspect-square items-center justify-center rounded-full text-sm',
										mood ? moodColors[mood.emotion] : 'bg-secondary',
										isSameMonth(day, date) ? 'text-foreground' : 'text-muted-foreground',
										isSameDay(day, new Date()) ? 'bg-primary text-primary-foreground' : ''
									)}
								>
									{format(day, 'd')}
								</button>
							</TooltipTrigger>
							<TooltipContent className="flex flex-col items-center">
								<p>
									{mood ? `${mood.emotion} - ${(mood.intensity * 100).toFixed(2)}%` : 'No mood data'}{' '}
								</p>
								{isSameDay(day, new Date()) && 'Today'}
							</TooltipContent>
						</Tooltip>
					)
				})}
			</div>
		)
	}

	const renderWeekView = () => {
		const startOfWeekDate = startOfWeek(date)
		const endOfWeekDate = endOfWeek(date)
		const days = eachDayOfInterval({ start: startOfWeekDate, end: endOfWeekDate })

		return (
			<div className="grid grid-cols-7 gap-2">
				{['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
					<div key={day} className="text-center text-sm font-medium">
						{day}
					</div>
				))}
				{days.map((day) => {
					const mood = getMoodForDate(day)
					return (
						<Tooltip key={day.toString()}>
							<TooltipTrigger asChild>
								<button
									key={day.toString()}
									onClick={() => setSelectedDay(day)}
									className={cn(
										'flex aspect-square items-center justify-center rounded-full text-sm',
										mood ? moodColors[mood.emotion] : 'bg-secondary',
										'text-foreground',
										isSameDay(day, selectedDay) ? 'bg-muted-foreground text-background' : '',
										isSameDay(day, new Date()) ? 'ring-primary bg-primary' : ''
									)}
								>
									{format(day, 'd')}
								</button>
							</TooltipTrigger>
							<TooltipContent className="flex flex-col items-center">
								<p>
									{mood ? `${mood.emotion} - ${(mood.intensity * 100).toFixed(2)}%` : 'No mood data'}{' '}
								</p>
								{isSameDay(day, new Date()) && 'Today'}
							</TooltipContent>
						</Tooltip>
					)
				})}
			</div>
		)
	}

	const renderCalendarContent = () => {
		switch (selectedTimeframe) {
			case 'year':
				return renderYearView()
			case 'month':
				return renderMonthView()
			case 'week':
				return renderWeekView()
			default:
				return null
		}
	}
	const isSameWeek = (date1, date2) => dateFnsIsSameWeek(date1, date2, { weekStartsOn: 0 }) // 0 for Sunday, 1 for Monday

	const calculateMoodStats = () => {
		if (selectedDay && selectedTimeframe === 'week') {
			const mood = getMoodForDate(selectedDay)
			if (mood) {
				return { [mood.emotion]: 1 }
			}
			return {}
		}
		const moodCounts = { neutral: 0, happy: 0, sad: 0, angry: 0, fearful: 0, disgusted: 0, surprised: 0 }
		Object.entries(moodData).forEach(([dateString, mood]) => {
			if (mood && mood.emotion) {
				if (selectedTimeframe === 'week' && isSameWeek(parseISO(dateString), date)) {
					moodCounts[mood.emotion]++
				} else if (selectedTimeframe === 'month' && isSameMonth(parseISO(dateString), date)) {
					moodCounts[mood.emotion]++
				} else if (selectedTimeframe === 'year' && isSameYear(parseISO(dateString), date)) {
					moodCounts[mood.emotion]++
				}
			}
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
								{selectedTimeframe === 'week'
									? `Week ${getWeek(date)} - ${getYear(date)}`
									: selectedTimeframe === 'month'
										? format(date, 'MMMM yyyy')
										: format(date, 'yyyy')}
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

					<Select
						value={selectedTimeframe}
						onValueChange={(value) => {
							setSelectedTimeframe(value)
							setSelectedDay(null)
						}}
					>
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
					<MoodSummary moodStats={moodStats} timeframe={selectedTimeframe} selectedDay={selectedDay} />
				</div>
			</div>
		</div>
	)
}

export default MoodSense
