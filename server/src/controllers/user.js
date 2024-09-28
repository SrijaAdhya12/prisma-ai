import { User } from '../models/index.js'

import dotenv from 'dotenv'

dotenv.config()

export const saveUser = async (req, res) => {
	try {
		const { user_id, name, email, picture, created_at, updated_at } = req.body
		const user = { user_id, name, email, picture, created_at, updated_at }

		const newUser = await User.findOneAndUpdate({ user_id }, user, {
			new: true, // returns the updated document instead of the original.
			upsert: true, // creates a new document if one isn't found.
			runValidators: true, // ensures that Mongoose validation runs on update operations.
			setDefaultsOnInsert: true // applies default values specified in your schema when creating a new document.
		})
		res.status(200).json({ message: 'User saved successfully' })
	} catch (error) {
		console.error(error)
		res.status(500).json({ message: error.message })
	}
}
