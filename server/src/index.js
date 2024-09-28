import cors from 'cors'
import dotenv from 'dotenv'
import express from 'express'
import mongoose from 'mongoose'

dotenv.config()

const PORT = process.env.PORT || 5000

const app = express()
app.get('/', (_, res) => res.send('Welcome to Prisma AI'))
	

mongoose
	.connect(process.env.MONGO_URI)
	.then(() => console.log('MongoDB connected 🚀🚀'))
	.then(() => app.listen(PORT, () => console.log(`Server is running at http://localhost:${PORT} 🌐`)))
	.catch((err) => console.log(err))
