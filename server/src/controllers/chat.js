import { StreamChat } from 'stream-chat'
import dotenv from 'dotenv'

dotenv.config()

export const getStreamToken = async (req, res) => {
	try {
		const { userId } = req.body

		const serverClient = StreamChat.getInstance(process.env.STREAM_API_KEY, process.env.STREAM_API_SECRET)

		const token = serverClient.createToken(userId)
		res.status(200).json({ token })
	} catch (error) {
		console.error('Error generating Stream token:', error)
		res.status(500).json({ error: 'Failed to generate token' })
	}
}

