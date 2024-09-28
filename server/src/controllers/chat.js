import { StreamChat } from 'stream-chat'
import dotenv from 'dotenv'

dotenv.config()

export const getStreamToken = async (req, res) => {
	try {
		const { userId } = req.body

		// Create a Stream Chat server client
		const serverClient = StreamChat.getInstance(process.env.STREAM_API_KEY, process.env.STREAM_API_SECRET)

		// Generate a Stream Chat token for the user
		const token = serverClient.createToken(userId)
		// Respond with token and user ID
		res.status(200).json({ token })
	} catch (error) {
		console.error('Error generating Stream token:', error)
		res.status(500).json({ error: 'Failed to generate token' })
	}
}

