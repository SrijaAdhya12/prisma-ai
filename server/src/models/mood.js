import mongoose from 'mongoose'

const moods = ['neutral', 'happy', 'sad', 'angry', 'fearful', 'disgusted', 'surprised']

const moodSchema = new mongoose.Schema({
	user_id: { type: String, required: true },
	date: { type: Date, default: new Date(), required: true },
	emotion: { type: String, enum: moods, required: true },
	value: { type: Number, min: 0, max: 100, required: true }
})

export default mongoose.model('Mood', moodSchema)
