import {
	Calendar as CalendarIcon,
	Frown,
	Meh,
	Smile,
	Angry,
	Annoyed,
	ThumbsDown,
	Zap,
	RefreshCcw,
	Loader2
} from 'lucide-react'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { isSameWeek as dateFnsIsSameWeek } from 'date-fns'
import { Calendar } from '@/components/ui/calendar'
import { Button } from '@/components/ui/button'
import { useAuth0 } from '@auth0/auth0-react'
import { useState, useEffect } from 'react'
import { getMoodData } from '@/api'
import { moodColors, moodTextColors } from '@/data'
import { cn } from '@/lib'
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
import { Link } from 'react-router-dom'

const moodIcons = {
	neutral: <Meh className={cn('size-6', moodTextColors.neutral)} />,
	happy: <Smile className={cn('size-6', moodTextColors.happy)} />,
	sad: <Frown className={cn('size-6', moodTextColors.sad)} />,
	angry: <Angry className={cn('size-6', moodTextColors.angry)} />,
	fearful: <Annoyed className={cn('size-6', moodTextColors.fearful)} />,
	disgusted: <ThumbsDown className={cn('size-6', moodTextColors.disgusted)} />,
	surprised: <Zap className={cn('size-6', moodTextColors.surprised)} />
}

const MoodSummary = ({ moodStats, timeframe, selectedDay }) => {
	return (
		<Card className="col-span-2 lg:col-span-1">
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
			<CardFooter>
				<Button asChild>
					<Link to="/emo-sense">{Object.keys(moodStats).length < 1 ? 'No mood data available' : 'Update your mood'}</Link>
				</Button>
			</CardFooter>
		</Card>
	)
}

const Profile = () => {
	const { user } = useAuth0()
	const [date, setDate] = useState(new Date())
	const [selectedTimeframe, setSelectedTimeframe] = useState('month')
	const [moodData, setMoodData] = useState({})
	const [mounted, setMounted] = useState(false)
	const [selectedDay, setSelectedDay] = useState(null)
	const [loading, setLoading] = useState(false)
	useEffect(() => {
		setMounted(true)
		fetchMoodData()
	}, [date, selectedTimeframe])

	const fetchMoodData = async () => {
		setLoading(true)
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
		} finally {
			setLoading(false)
		}
	}

	const getMoodForDate = (date) => {
		const dateString = format(date, 'yyyy-MM-dd')
		return moodData[dateString] || null
	}

	const renderYearView = () => {
		const months = eachMonthOfInterval({ start: startOfYear(date), end: endOfYear(date) })
		return (
			<div className="xs:grid-cols-3 grid grid-cols-1 gap-4 sm:grid-cols-4">
				{months.map((month) => (
					<button
						key={month.toString()}
						onClick={() => {
							setDate(month)
							setSelectedTimeframe('month')
						}}
						className={cn(
							'rounded-lg border-gray-200 transition-colors hover:border-gray-300 sm:h-auto sm:border sm:p-2',
							isSameMonth(month, date) && selectedTimeframe !== 'year'
								? 'bg-primary text-primary-foreground'
								: 'bg-background'
						)}
					>
						<div className="mb-2 text-sm font-medium">{format(month, 'MMM yyyy')}</div>
						<div className="grid grid-cols-7 gap-1">
							{Array.from({ length: startOfMonth(month).getDay() }).map((_, index) => (
								<div key={`empty-${index}`} />
							))}
							{eachDayOfInterval({ start: startOfMonth(month), end: endOfMonth(month) }).map((day) => {
								const mood = getMoodForDate(day)
								return (
									<div
										key={day.toString()}
										className={cn(
											'flex aspect-square size-9 items-center justify-center rounded-full text-xs sm:size-2',
											mood ? moodColors[mood.emotion] : 'bg-accent'
										)}
									>
										<div className="block sm:hidden">{format(day, 'd')}</div>
									</div>
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
										isSameDay(day, new Date()) &&
											'outline-primary outline outline-2 outline-offset-2'
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
										isSameDay(day, selectedDay) &&
											'outline-foreground outline outline-2 outline-offset-2',
										isSameDay(day, new Date()) &&
											'outline-primary outline outline-2 outline-offset-2'
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
		return
	}

	return (
		<div className="min-h-screen p-4">
			<div className="mb-8 flex items-center justify-between">
				<h1 className="text-4xl font-bold">Profile</h1>
			</div>
			<div className="mx-auto max-w-4xl space-y-8">
				<div className="flex flex-col items-center justify-between gap-2 sm:flex-row sm:gap-0">
					<Popover>
						<PopoverTrigger asChild>
							<Button variant="outline" className="w-full justify-start text-left font-normal sm:w-60">
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

					<div className="sm:w-auto flex w-full gap-2">
						<Tooltip>
							<TooltipTrigger asChild>
								<Button variant="outline" size="icon" onClick={fetchMoodData}>
									{loading ? (
										<Loader2 className="size-5 animate-spin" />
									) : (
										<RefreshCcw className="size-5" />
									)}
								</Button>
							</TooltipTrigger>
							<TooltipContent>{loading ? 'Refreshing...' : 'Refresh Mood Data'}</TooltipContent>
						</Tooltip>
						<Select
							value={selectedTimeframe}
							onValueChange={(value) => {
								setSelectedTimeframe(value)
								setSelectedDay(null)
							}}
						>
							<SelectTrigger className="sm:w-48 w-full">
								<SelectValue placeholder="Select timeframe" />
							</SelectTrigger>
							<SelectContent>
								<SelectItem value="week">Week</SelectItem>
								<SelectItem value="month">Month</SelectItem>
								<SelectItem value="year">Year</SelectItem>
							</SelectContent>
						</Select>
					</div>
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

export default Profile
