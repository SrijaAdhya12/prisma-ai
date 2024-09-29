import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Send, Heart, User, Bot } from 'lucide-react'
import { Avatar } from '@/components/ui/avatar'
import { cn } from '@/lib'
import { useAuth0 } from '@auth0/auth0-react'
import { getBotResponse } from '@/api'

const initialPrompts = [
	'I recently went through a breakup',
	"I'm having trouble with my manager",
	'My friend left me',
	"I'm struggling with my studies",
	'I feel overwhelmed by my work',
	'I wish my course was easier'
]

const MessageSkeleton = () => (
	<div className="flex justify-start">
		<div className="flex max-w-[80%] items-start space-x-2">
			<Avatar className="mr-2 flex size-8 items-center justify-center rounded-full bg-pink-600/50 text-white" />
			<div className="bg-secondary relative rounded-lg rounded-tl-none p-3">
				<div className="bg-secondary absolute -left-2 top-0 h-4 w-4 rounded-bl-full" />
				<div className="flex flex-col space-y-2">
					<div className="h-4 w-20 animate-pulse rounded bg-gray-300" />
					<div className="h-4 w-32 animate-pulse rounded bg-gray-300" />
					<div className="h-4 w-24 animate-pulse rounded bg-gray-300" />
				</div>
			</div>
		</div>
	</div>
)

const SupportBot = () => {
	const [messages, setMessages] = useState([])
	const [input, setInput] = useState('')
	const [showPrompts, setShowPrompts] = useState(true)
	const [isLoading, setIsLoading] = useState(false)
	const messagesEndRef = useRef(null)
	const { user, isAuthenticated, isLoading: authLoading } = useAuth0()

	useEffect(() => {
		if (isAuthenticated && user?.sub) {
			fetchBotResponse('', true)
		}
	}, [isAuthenticated, user])

	useEffect(() => {
		scrollToBottom()
	}, [messages, isLoading])

	const scrollToBottom = () => {
		messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
	}

	const fetchBotResponse = async (prompt, isInitial = false) => {
		if (!isAuthenticated || !user?.sub) return

		setIsLoading(true)
		try {
			await new Promise((resolve) => setTimeout(resolve, 1500))
			const botResponse = await getBotResponse(prompt, user.sub)
			const newMessage = { text: botResponse, isBot: true }
			setMessages((prev) => (isInitial ? [newMessage] : [...prev, newMessage]))
		} catch (error) {
			console.error('Error fetching bot response:', error)
			setMessages((prev) => [
				...prev,
				{ text: "I'm sorry, I'm having trouble responding right now. Please try again later.", isBot: true }
			])
		} finally {
			setIsLoading(false)
		}
	}

	const handleSend = async (text) => {
		if (text.trim()) {
			setMessages((prev) => [...prev, { text, isBot: false }])
			setInput('')
			setShowPrompts(false)
			await fetchBotResponse(text)
		}
	}

	const handlePromptClick = (prompt) => {
		handleSend(prompt)
	}

	if (authLoading) return <div>Loading...</div>
	if (!isAuthenticated) return <div>Please log in to use the support bot.</div>

	return (
		<div className="flex min-h-[calc(100vh-70px)] flex-col p-0">
			<header className="z-10 p-4 text-left">
				<div className="container p-0 text-2xl font-bold">
					<div className="flex items-center gap-5">
						<Avatar className="flex items-center justify-center bg-slate-600 text-white">
							<Bot />
						</Avatar>
						Support Bot
					</div>
				</div>
			</header>
			<main className="dark:bg-dot-white/[0.2] bg-dot-black/[0.2] container z-10 mx-auto flex h-96 w-full flex-grow flex-col p-4">
				<div className="no-scrollbar mb-4 flex-grow space-y-4 overflow-y-auto">
					{messages.map((message, index) => (
						<motion.div
							key={index}
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.5 }}
							className={`flex ${message.isBot ? 'justify-start' : 'justify-end'}`}
						>
							<div className="flex max-w-[80%] items-start space-x-2">
								{message.isBot && (
									<Avatar className="mr-2 flex size-8 items-center justify-center rounded-full bg-pink-600 text-white">
										<Heart size={20} />
									</Avatar>
								)}
								<div
									className={cn(
										'relative rounded-lg p-3',
										message.isBot ? 'bg-secondary' : 'bg-muted mr-2',
										message.isBot ? 'rounded-tl-none' : 'rounded-tr-none'
									)}
								>
									<div
										className={cn(
											'absolute top-0 h-4 w-4',
											message.isBot ? '-left-2' : '-right-2',
											message.isBot ? 'bg-secondary' : 'bg-muted',
											message.isBot ? 'rounded-bl-full' : 'rounded-br-full'
										)}
									/>
									{message.text}
								</div>
								{!message.isBot && (
									<Avatar className="bg-secondary flex size-8 items-center justify-center rounded-full bg-blue-600 text-white">
										<User size={20} />
									</Avatar>
								)}
							</div>
						</motion.div>
					))}
					{isLoading && <MessageSkeleton />}
					<div ref={messagesEndRef} />
				</div>
				{showPrompts && (
					<div className="mb-4 w-10/12">
						<h2 className="mb-2 text-xl font-semibold">How are you feeling? You can start with:</h2>
						<div className="flex flex-wrap gap-2">
							<AnimatePresence>
								{initialPrompts.map((prompt) => (
									<motion.button
										key={prompt}
										initial={{ opacity: 0, scale: 0.8 }}
										animate={{ opacity: 1, scale: 1 }}
										exit={{ opacity: 0, scale: 0.8 }}
										transition={{ duration: 0.3 }}
										className="rounded-full bg-gray-700 px-3 py-2 text-sm text-white transition-colors hover:bg-gray-600"
										onClick={() => handlePromptClick(prompt)}
									>
										{prompt}
									</motion.button>
								))}
							</AnimatePresence>
						</div>
					</div>
				)}
				<div className="flex items-center space-x-2">
					<input
						type="text"
						value={input}
						onChange={(e) => setInput(e.target.value)}
						onKeyPress={(e) => e.key === 'Enter' && handleSend(input)}
						placeholder="Type your thoughts here..."
						className="flex-grow rounded-l-md bg-gray-700 p-3 text-white focus:outline-none"
					/>
					<button
						onClick={() => handleSend(input)}
						className="rounded-r-md bg-pink-600 p-3 text-white transition-colors hover:bg-pink-700"
					>
						<Send size={20} />
					</button>
				</div>
			</main>
		</div>
	)
}

export default SupportBot
