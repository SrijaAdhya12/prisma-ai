import { GoogleGenerativeAI } from '@google/generative-ai'

import dotenv from 'dotenv'

dotenv.config()

const userContexts = new Map()

export const generateResponse = async (req, res) => {
	try {
		const { prompt, userId } = req.body

		// Initialize or retrieve user context
		if (!userContexts.has(userId)) {
			userContexts.set(userId, [])
		}
		const userContext = userContexts.get(userId)

		const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY)
		const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' })

		// Prepare the chat history
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
							text: "You are a personal therapeutic assistant, providing support and guidance to students and working individuals. Your responses should be empathetic, between 20 to 100 words, and demonstrate active listening and constructive engagement. If the user says hi or hello greet them. Create a safe and understanding environment for the user. If the user discusses a specific topic or situation, provide supportive feedback, psychoeducation, empathetic acknowledgment, reassurance, and encourage self-reflection. Focus on goal setting and ask open-ended questions. When suggesting solutions, consider various situations and emotions the user might experience. Prioritize reflecting the user's emotions and enthusiasm. Always be kind and diplomatic. Begin each conversation with an appropriate greeting based on the conversation stage. If the user is not talking about their day, ask them about their day. Be a friend to the user."
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

		// Generate a response
		const result = await chat.sendMessage([{ text: prompt }])
		const response = result.response.text()

		// Update user context with the new interaction
		userContext.push({ role: 'user', text: prompt })
		userContext.push({ role: 'model', text: response })

		// Trim context if it gets too long (optional, adjust as needed)
		if (userContext.length > 10) {
			userContext.splice(0, 2)
		}

		res.status(200).json({ content: response })
	} catch (error) {
		console.error('Error:', error)
		res.status(500).json({ message: error.message })
	}
}
