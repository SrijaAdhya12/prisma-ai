import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

const DialogForm = ({ onSubmit, onClose }) => {
	const [sleep, setSleep] = useState('')
	const [meditation, setMeditation] = useState('')
	const [exercise, setExercise] = useState('')

	const handleSubmit = (e) => {
		e.preventDefault()
		const stressLevel = calculateStressLevel(Number(sleep), Number(meditation), Number(exercise))
		onSubmit({ sleep: Number(sleep), meditation: Number(meditation), exercise: Number(exercise), stressLevel })
		onClose()
	}

	const calculateStressLevel = (sleep, meditation, exercise) => {
		const score = (sleep / 8) * 0.4 + (meditation / 30) * 0.3 + (exercise / 60) * 0.3
		if (score > 0.8) {
			return 'Low'
		}
		if (score > 0.5) {
			return 'Medium'
		}
		return 'High'
	}

	return (
		<form onSubmit={handleSubmit} className="space-y-4">
			<div>
				<Label htmlFor="sleep">Average Sleep (hours)</Label>
				<Input
					id="sleep"
					value={sleep}
					onChange={(e) => setSleep(e.target.value)}
					type="number"
					step="0.1"
					min="0"
					max="24"
					required
				/>
			</div>
			<div>
				<Label htmlFor="meditation">Meditation (minutes/day)</Label>
				<Input
					id="meditation"
					value={meditation}
					onChange={(e) => setMeditation(e.target.value)}
					type="number"
					min="0"
					max="1440"
					required
				/>
			</div>
			<div>
				<Label htmlFor="exercise">Exercise (minutes/day)</Label>
				<Input
					id="exercise"
					value={exercise}
					onChange={(e) => setExercise(e.target.value)}
					type="number"
					min="0"
					max="1440"
					required
				/>
			</div>
			<Button type="submit">Update Profile</Button>
		</form>
	)
}
export default DialogForm
