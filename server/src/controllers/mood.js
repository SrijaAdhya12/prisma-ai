import { Mood } from '../models/index.js'
import dotenv from 'dotenv'

dotenv.config()

export const saveMood = async (req, res) => {
	try {
		const { user_id, moodData } = req.body
		const currentDate = new Date()
		const dateWithoutTime = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate())

		Object.entries(moodData).forEach(async ([emotion, value]) => {
			const mood = { emotion, value: value * 100 }
			const newMood = await Mood.findOneAndUpdate({ user_id, date: dateWithoutTime, emotion }, mood, {
				new: true, // returns the updated document instead of the original.
				upsert: true, // creates a new document if one isn't found.
				runValidators: true, // ensures that Mongoose validation runs
				setDefaultsOnInsert: true // applies default values
			})
			await newMood.save()
		})
		res.status(200).json({ message: 'Mood data saved successfully' })
	} catch (error) {
		console.error(error)
	}
}
