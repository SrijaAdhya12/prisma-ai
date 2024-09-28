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

export const getMoodData = async (req, res) => {
	try {
		const { start, end, user_id } = req.query
		const moodData = await Mood.aggregate([
			{
				$match: {
					user_id: user_id,
					date: { $gte: new Date(start), $lte: new Date(end) }
				}
			},
			{
				$group: {
					_id: {
						date: { $dateToString: { format: '%Y-%m-%d', date: '$date' } },
						emotion: '$emotion'
					},
					maxValue: { $max: '$value' }
				}
			},
			{
				$sort: { maxValue: -1 }
			},
			{
				$group: {
					_id: '$_id.date',
					emotion: { $first: '$_id.emotion' },
					intensity: { $first: { $divide: ['$maxValue', 100] } }
				}
			},
			{
				$project: {
					_id: 0,
					date: '$_id',
					emotion: 1,
					intensity: 1
				}
			},
			{
				$sort: { date: 1 }
			}
		])

		const formattedMoodData = moodData.reduce((acc, item) => {
			acc[item.date] = { emotion: item.emotion, intensity: item.intensity }
			return acc
		}, {})
		res.status(200).json({data:formattedMoodData})
	} catch (error) {
		res.status(500).json({ message: 'Error fetching mood data', error: error.message })
	}
}
