import { GoogleGenerativeAI } from '@google/generative-ai'
import dotenv from 'dotenv'
import { Mood } from '../models/index.js'

dotenv.config()

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY)

export const getMoodExercises = async (req, res) => {
	try {
		const { userId } = req.body

		// Get today's date in the desired format
		const currentDate = new Date()
		const dateString = currentDate.toISOString().split('T')[0] + 'T00:00:00.000+00:00'
		const formattedDate = new Date(dateString)

		const moods = await Mood.find({ user_id: userId, date: formattedDate })

		if (!moods.length) {
			return res.status(404).json({ message: 'No mood data found for the user' })
		}

		const latestMood = moods.reduce(
			(highest, current) => (current.value > highest.value ? current : highest),
			moods[0]
		)

		console.log('Latest Mood Retrieved:', latestMood)

		const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' })

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
