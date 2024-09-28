import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
	user_id: {
		type: String,
		unique: true,
		required: true,
		primaryKey: true
	},
	name: { type: String, required: true },
	email: { type: String, unique: true, sparse: true },
	picture: { type: String, required: true },
	created_at: { type: Date, default: new Date() },
	updated_at: { type: Date, default: new Date() }
})

export default mongoose.model('User', userSchema)
