import MoodSense from '@/assets/MoodSense.jpeg'
import VideoSense from '@/assets/VideoSense.jpeg'
import SupportBot from '@/assets/SupportBot.jpeg'
export const features = [
	{
		CardTitle: 'Mood Sense',
		CardDescription: MoodSense,
		CardContent: 'Daily mood tracking through a user-friendly calendar interface'
	},
	{
		CardTitle: 'Video Sense',
		CardDescription: VideoSense,
		CardContent: 'Visual mood tracking with video feedback and personalized insights.'
	},
	{
		CardTitle: 'Support Bot',
		CardDescription: SupportBot,
		CardContent:
			'Behavioral analysis through chat interactions, identifying patterns and traits. Providing supportive response through chat'
	}
]

export { moods, colors as moodColors, textColors as moodTextColors } from './moods'
export { sleepData, exerciseData } from './profile'
export { items as events } from './events'
