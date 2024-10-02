import axios from 'axios'
const API = axios.create({ baseURL: import.meta.env.VITE_API_URL })

export const saveUser = async (user) => {
	const response = await API.post('/user', user)
	const data = await response.json()
	return data
}

export const getChatToken = async (userId) => {
	const response = await API.post('/chat/token', { userId })
	const { token } = response.data
	return token
}

export const getBotResponse = async (prompt, userId) => {
	const response = await API.post('/bot/response', { prompt, userId })
	const { content } = response.data
	return content
}

export const saveMoodData = async (moodData) => {
	const response = await API.patch('/mood', moodData)
	const { data } = response.data
	return data
}

export const getMoodData = async (start, end, user_id) => {
	const response = await API.get(`/mood`, { params: { start, end, user_id } })
	const { data } = response.data
	return data
}

export const getCurrentMood = async (user_id) => {
	const response = await API.get(`/mood/current`, { params: { user_id } })
	const { data } = response.data
	return data
}

export const getMoodExercises = async (user_id) => {
	const response = await API.post(`/bot/exercises`, { user_id })
	const { exercises } = response.data
	return exercises
}
