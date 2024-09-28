import axios from 'axios'
const API = axios.create({ baseURL: import.meta.env.VITE_API_URL })

export const saveUser = async (user) => {
	const response = await API.post('/user', user)
	const data = await response.json()
	return data
}
