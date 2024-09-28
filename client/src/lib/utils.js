import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
import * as faceapi from 'face-api.js'

export const cn = (...inputs) => twMerge(clsx(inputs))

export const getWords = (text, specialLastWord, className) => {
	return text.split(' ').map((word, idx) => {
		return {
			text: word,
			className:
				specialLastWord && idx === text.split(' ').length - 1
					? 'text-blue-500 dark:text-blue-500'
					: '' + className
		}
	})
}

export const loadModels = async () => {
	try {
		await faceapi.nets.tinyFaceDetector.loadFromUri('/models')
		await faceapi.nets.faceExpressionNet.loadFromUri('/models')		
	} catch (error) {
		console.error('Error loading models:', error)
	}
}