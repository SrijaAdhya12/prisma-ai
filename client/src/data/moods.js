import { IconMoodSurprised, IconMoodWrrr } from '@tabler/icons-react'
import { Frown, Meh, Smile, Angry, Annoyed } from 'lucide-react'

export const colors = {
	neutral: 'bg-muted-foreground',
	happy: 'bg-success',
	sad: 'bg-info',
	angry: 'bg-red-700',
	fearful: 'bg-primary',
	disgusted: 'bg-warning',
	surprised: 'bg-pink-500'
}

export const textColors = {
	neutral: 'text-muted-foreground',
	happy: 'text-success',
	sad: 'text-info',
	angry: 'text-red-700',
	fearful: 'text-primary',
	disgusted: 'text-warning',
	surprised: 'text-pink-500'
}

export const moods = [
	{
		name: 'Neutral',
		color: colors.neutral,
		icon: Meh
	},
	{
		name: 'Happy',
		color: colors.happy,
		icon: Smile
	},
	{
		name: 'Sad',
		color: colors.sad,
		icon: Frown
	},
	{
		name: 'Angry',
		color: colors.angry,
		icon: Angry
	},
	{
		name: 'Fearful',
		color: colors.fearful,
		icon: Annoyed
	},
	{
		name: 'Disgusted',
		color: colors.disgusted,
		icon: IconMoodWrrr
	},
	{
		name: 'Surprised',
		color: colors.surprised,
		icon: IconMoodSurprised
	}
]
