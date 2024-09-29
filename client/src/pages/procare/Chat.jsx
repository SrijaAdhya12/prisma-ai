import { useEffect, useState } from 'react'
import { useAuth0 } from '@auth0/auth0-react'
import { StreamChat } from 'stream-chat'
import {
	Chat as StreamChatComponent,
	Channel,
	ChannelList,
	Window,
	ChannelHeader,
	MessageList,
	MessageInput,
	Thread,
	LoadingIndicator
} from 'stream-chat-react'
import 'stream-chat-react/dist/css/v2/index.css'
import { getChatToken } from '@/api'
import { Menu, X } from 'lucide-react'
import { useTheme } from '@/hooks'

const apiKey = import.meta.env.VITE_STREAM_API_KEY

const channelsConfig = [
	{
		id: 'therapy-session',
		name: 'Therapy Session',
		image: 'https://s3-us-west-2.amazonaws.com/therapyden1/user-images/_avatarCrop/DSC_6892.jpg'
	},
	{
		id: 'support-group',
		name: 'Support Group',
		image: 'https://example.com/support-group.jpg'
	}
]

const Chat = () => {
	const { theme } = useTheme()
	const { user, isAuthenticated, getAccessTokenSilently } = useAuth0()
	const [client, setClient] = useState(null)
	const [channels, setChannels] = useState([])
	const [loading, setLoading] = useState(true)
	const [isMobile, setIsMobile] = useState(window.innerWidth < 768)
	const [showChannelList, setShowChannelList] = useState(!isMobile)

	useEffect(() => {
		const handleResize = () => {
			const mobile = window.innerWidth < 768
			setIsMobile(mobile)
			setShowChannelList(!mobile)
		}

		window.addEventListener('resize', handleResize)
		return () => window.removeEventListener('resize', handleResize)
	}, [])

	useEffect(() => {
		const initialise = async () => {
			setLoading(true)
			try {
				const chatClient = StreamChat.getInstance(apiKey)

				const userId = user.sub.replace(/[^a-z0-9_-]+/gi, '_')
				const token = await getChatToken(userId)
				await chatClient.connectUser(
					{
						id: userId,
						name: user.name,
						image: user.picture
					},
					token
				)

				// Create channels
				const createdChannels = await Promise.all(
					channelsConfig.map(async (config) => {
						const channel = chatClient.channel('messaging', config.id, {
							name: config.name,
							image: config.image,
							members: [userId]
						})
						await channel.create()
						await channel.watch()
						return channel
					})
				)

				setChannels(createdChannels)
				setClient(chatClient)
			} catch (error) {
				console.error('Failed to connect user:', error)
			} finally {
				setLoading(false)
			}
		}
		initialise()
		return () => {
			if (client) {
				client.disconnectUser()
			}
		}
	}, [isAuthenticated, user, getAccessTokenSilently])

	if (loading || !client) {
		return <LoadingIndicator />
	}

	const toggleChannelList = () => setShowChannelList(!showChannelList)

	return (
		<div className="relative flex min-h-[calc(100vh-70px)] overflow-hidden">
			<StreamChatComponent client={client} theme={`str-chat__theme-${theme}`}>
				{/* Dark overlay */}
				<div
					className={`fixed inset-0 z-10 bg-black bg-opacity-50 transition-opacity duration-300 md:hidden ${
						showChannelList ? 'opacity-100' : 'pointer-events-none opacity-0'
					}`}
					onClick={toggleChannelList}
				></div>

				{/* Channel list sidebar */}
				<div
					className={`absolute inset-y-0 left-0 z-20 w-64 transform transition-transform duration-300 ease-in-out md:relative md:translate-x-0 ${
						showChannelList ? 'translate-x-0' : '-translate-x-full'
					}`}
				>
					<div className="bg-secondary h-full overflow-y-auto">
						<div className="flex items-center justify-between p-4 md:hidden">
							<h2 className="text-lg font-semibold">Channels</h2>
							<button onClick={toggleChannelList} className="focus:outline-none">
								<X size={24} />
							</button>
						</div>
						<ChannelList />
					</div>
				</div>

				{/* Main chat area */}
				<div className="relative flex flex-1 flex-col overflow-hidden">
					<Channel>
						<Window>
							<div className="bg-secondary flex items-center p-2">
								<button
									onClick={toggleChannelList}
									className="focus:ring-primary mr-2 rounded p-1 focus:outline-none focus:ring-2 md:hidden"
									aria-label="Toggle channel list"
								>
									<Menu size={24} />
								</button>
								<ChannelHeader />
							</div>
							<div className="flex-1 overflow-y-auto">
								<MessageList />
							</div>
							<MessageInput className="bg-secondary" />
						</Window>
						<Thread />
					</Channel>
				</div>
			</StreamChatComponent>
		</div>
	)
}

export default Chat
