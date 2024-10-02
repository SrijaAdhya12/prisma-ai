import { GoogleGenerativeAI } from '@google/generative-ai'
import { Mood } from '../models/index.js'

import dotenv from 'dotenv'

dotenv.config()

const userContexts = new Map()
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY)
const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' })

export const getResponse = async (req, res) => {
	try {
		const { prompt, userId } = req.body

		if (!userContexts.has(userId)) {
			userContexts.set(userId, [])
		}
		const userContext = userContexts.get(userId)

		const chat = model.startChat({
			history: [
				...userContext.map((msg) => ({
					role: msg.role,
					parts: [{ text: msg.text }]
				})),
				{
					role: 'user',
					parts: [
						{
							text: "You are a personal therapeutic assistant, providing support and guidance to students and working individuals. Your responses should be empathetic, between 20 to 100 words, and demonstrate active listening and constructive engagement. If the user says hi or hello greet them. Create a safe and understanding environment for the user. If the user discusses a specific topic or situation, provide supportive feedback, psychoeducation, empathetic acknowledgment, reassurance, and encourage self-reflection. Focus on goal setting and ask open-ended questions. When suggesting solutions, consider various situations and emotions the user might experience. Prioritize reflecting the user's emotions and enthusiasm. Always be kind and diplomatic. Begin each conversation with an appropriate greeting based on the conversation stage. If the user is not talking about their day, ask them about their day. Be a friend to the user. Remember the context of the conversation and the user's interests."
						}
					]
				}
			],
			generationConfig: { maxOutputTokens: 2000 }
		})

		if (!prompt) {
			const introResponse =
				"Hello! I'm here to provide you with support and guidance. How can I assist you today?"
			return res.status(200).json({ content: introResponse })
		}

		const result = await chat.sendMessage([{ text: prompt }])
		const response = result.response.text()

		userContext.push({ role: 'user', text: prompt })
		userContext.push({ role: 'model', text: response })

		if (userContext.length > 10) {
			userContext.splice(0, 2)
		}

		res.status(200).json({ content: response })
	} catch (error) {
		console.error('Error:', error)
		res.status(500).json({ message: error.message })
	}
}

export const getExercisesByMood = async (req, res) => {
	try {
		const { user_id } = req.body

		const currentDate = new Date()
		const dateString = currentDate.toISOString().split('T')[0] + 'T00:00:00.000+00:00'
		const formattedDate = new Date(dateString)

		const moods = await Mood.find({ user_id, date: formattedDate })

		if (!moods.length) {
			return res.status(404).json({ message: 'No mood data found for the user' })
		}

		const latestMood = moods.reduce(
			(highest, current) => (current.value > highest.value ? current : highest),
			moods[0]
		)


		const prompt = `Generate 5 CBT exercises for someone feeling ${latestMood.emotion}. 
		For each exercise, provide:
		1. A title
		2. A brief description
		3. A list of 5 steps to complete the exercise
		Format the response as a JSON array of objects.`

		const result = await model.generateContent(prompt)
		const responseText = result.response.text()

		const cleanResponse = responseText
			.replace(/```json/g, '')
			.replace(/```/g, '')
			.trim()

		let exercises
		try {
			exercises = JSON.parse(cleanResponse)
		} catch (parseError) {
			console.error('Error parsing JSON:', parseError)
			return res.status(500).json({ message: 'Failed to parse AI response' })
		}

		res.status(200).json({ exercises })
	} catch (error) {
		console.error('Error fetching mood exercises:', error)
		res.status(500).json({ message: error.message })
	}
}