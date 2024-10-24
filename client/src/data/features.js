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

export const items = [
	{
		title: 'Pro Care',
		description: 'Get therapist support for your mental health.',
		background:
			'https://images.unsplash.com/photo-1493836512294-502baa1986e2?q=80&w=2690&auto=format&fit=crop&ixlib=rb-4.0.3',
		hoverImg:
			'https://i.giphy.com/media/v1.Y2lkPTc5MGI3NjExcGRyZHZoNGo5aTRnbmJxdTM0dmtqOTUxMGhrbGYwYzRtOW4zeWw4ciZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/2zdVnqmhSfAvyQhzHj/giphy.webp',
		to: '/pro-care'
	},
	{
		title: 'Support Bot',
		description: 'Behavioral analysis through chat interactions. ',
		background:
			'https://media.istockphoto.com/id/1494104649/photo/ai-chatbot-artificial-intelligence-digital-concept.jpg?s=612x612&w=0&k=20&c=1Zq2sj3W0tWcpc-n1fVt4dQQOBGhtwcAk1H2eQ5MAbI=',
		hoverImg: SupportBot,
		to: '/emo-sense/support-bot'
	},
	{
		title: 'Video Sense',
		description: 'Visual mood tracking with video feedback and personalized insights.',
		background:
			'https://images.unsplash.com/photo-1551281306-0d52288970ad?q=80&w=2690&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
		hoverImg:
			'https://media.istockphoto.com/id/1459063664/photo/artificial-intelligence-or-machine-learning-concept.jpg?s=612x612&w=0&k=20&c=ZYirlwocianVF0uvpEnnKCyTr7j8kujW4P-mktxJn9Q=',
		to: '/emo-sense/video-sense'
	},
	{
		title: 'Mood Music',
		description: 'Personalized music recommendations based on your mood.',
		background:
			'https://images.unsplash.com/photo-1525362081669-2b476bb628c3?q=80&w=1287&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
		hoverImg:
			'https://media.giphy.com/media/cgW5iwX0e37qg/giphy.gif?cid=790b7611jdkb1k75ohudmg7uikezbyquedz33mgdlkrmc6dk&ep=v1_gifs_search&rid=giphy.gif&ct=g',
		to: '/therafy/mood-music'
	},
	{
		title: 'Mood Memes',
		description: 'Curated memes to match every mood and moment.',
		background:
			'https://images.unsplash.com/photo-1621739165914-7155e5d4816e?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
		hoverImg:
			'https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExOTFwYjh0bHh5dm51cHhrbHIxM3lnZHNpNHZibThqY3g3bTFteWhrNCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/bKBM7H63PIykM/giphy.webp',
		to: '/moodmemes'
	},
	{
		title: 'Mood Gifs',
		description: 'Express every feeling with the perfect animated gif.',
		background:
			'https://images.unsplash.com/photo-1505628346881-b72b27e84530?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTI3fHxmdW58ZW58MHx8MHx8fDA%3D',
		hoverImg:
			'https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExMTJwcTV0aGJlY2s1Y3JlYzRha3QydXRpZDBycWlweW04dXJ5ZXZidyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/tsX3YMWYzDPjAARfeg/giphy.webp',
		to: '/therafy/mood-gifs'
	},
	{
		title: 'CBT Excercises',
		description: 'Practical activities to build healthier thought patterns and behaviors.',
		background:
			'https://plus.unsplash.com/premium_photo-1684820878202-52781d8e0ea9?q=80&w=1171&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
		hoverImg:
			'https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExd2xyYzdrNXZ1dXg1bjNpMnIwdHM1eTRjZms2cGE5dDEwZGhwazJhbSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/O6uRMq8TLHrR9v7max/giphy.webp',
		to: '/therafy/cbt-exercises'
	},
	{
		title: 'Support Nest',
		description: 'Coping Environments',
		background:
			'https://images.unsplash.com/photo-1475483768296-6163e08872a1?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
		hoverImg:
			'https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExZzdqdzlhdmZvcXNyNWo4cnFqeXJlZHlpdHZ6ZWdkMHA0NjJvaDVqMyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/WOIGpnJ3ye445BUQl4/giphy.webp',
		to: '/support-nest'
	},
	{
		title: 'Virtual Therapy',
		description: 'Virtual therapy sessions with scenic views.',
		background:
			'https://images.unsplash.com/photo-1729731321955-6316b2fe17f0?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
		hoverImg:
			'https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExNnEyM3dkbno3eHR3ZGxncnI2MzE5dWs5MWU1dnZ4MHN4YmtrYjV2NSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/PBzs0lcPW1vLU5aV3T/giphy.gif',
		to: '/panorama'
	}
]
