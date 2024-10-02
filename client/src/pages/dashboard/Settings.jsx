import React, { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Switch } from '@/components/ui/switch'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Moon, Sun, User } from 'lucide-react'
import { useTheme } from '@/hooks'
import { useAuth0 } from '@auth0/auth0-react'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'

const Settings = () => {
	const [notifications, setNotifications] = useState(true)
	const [language, setLanguage] = useState('en')
	const { theme, setTheme } = useTheme()
	const { user } = useAuth0()
	const [timezone, setTimezone] = useState('ist')
	return (
		<div className="min-h-screen p-4">
			<div className="mb-8 flex items-center justify-between">
				<h1 className="text-4xl font-bold">Settings</h1>
			</div>
			<div className="mx-auto max-w-4xl">
				<Tabs defaultValue="profile">
					<TabsList className="mb-8">
						<TabsTrigger value="profile">Profile</TabsTrigger>
						<TabsTrigger value="account">Account</TabsTrigger>
						<TabsTrigger value="appearance">Appearance</TabsTrigger>
						<TabsTrigger value="notifications">Notifications</TabsTrigger>
					</TabsList>
					<TabsContent value="profile">
						<Card>
							<CardHeader>
								<CardTitle>Profile Information</CardTitle>
								<CardDescription>Update your profile details here.</CardDescription>
							</CardHeader>
							<CardContent className="space-y-4">
								<div className="flex items-center space-x-4">
									<Avatar className="h-20 w-20">
										<AvatarImage src={user.picture} alt={user.name} />
										<AvatarFallback>
											<User className="size-10" />
										</AvatarFallback>
									</Avatar>
									<Tooltip>
										<TooltipTrigger asChild>
											<Button className="opacity-50">Change Avatar</Button>
										</TooltipTrigger>
										<TooltipContent>
											<p>You can only change your avatar on Auth0</p>
										</TooltipContent>
									</Tooltip>
								</div>
								<div className="grid grid-cols-1 gap-4 md:grid-cols-2">
									<div className="space-y-2">
										<Label htmlFor="name">Name</Label>
										<Input id="name" placeholder="Your name" value={user.name} disabled />
									</div>
									<div className="space-y-2">
										<Label htmlFor="email">Email</Label>
										<Input
											id="email"
											type="email"
											placeholder="Your email"
											disabled
											value={user.email}
										/>
									</div>
								</div>
								<div className="space-y-2">
									<Label htmlFor="bio">Bio</Label>
									<Input id="bio" placeholder="Tell us about yourself" disabled />
								</div>
								<Tooltip>
									<TooltipTrigger asChild>
										<Button className="opacity-50">Save Changes</Button>
									</TooltipTrigger>
									<TooltipContent>
										<p>You can only change your details on Auth0</p>
									</TooltipContent>
								</Tooltip>
							</CardContent>
						</Card>
					</TabsContent>
					<TabsContent value="account">
						<Card>
							<CardHeader>
								<CardTitle>Account Settings</CardTitle>
								<CardDescription>Manage your account preferences.</CardDescription>
							</CardHeader>
							<CardContent className="space-y-4">
								<div className="space-y-2">
									<Label htmlFor="language">Language</Label>
									<Select value={language} onValueChange={setLanguage}>
										<SelectTrigger>
											<SelectValue placeholder="Select Language" />
										</SelectTrigger>
										<SelectContent>
											<SelectItem value="en">English</SelectItem>
											<SelectItem value="hi">Hindi</SelectItem>
											<SelectItem value="bn">Bangla</SelectItem>
										</SelectContent>
									</Select>
								</div>
								<div className="space-y-2">
									<Label htmlFor="timezone">Timezone</Label>
									<Select value={timezone} onValueChange={setTimezone}>
										<SelectTrigger>
											<SelectValue placeholder="Select Timezone" />
										</SelectTrigger>
										<SelectContent>
											<SelectItem value="ist">IST</SelectItem>
											<SelectItem value="utc">UTC</SelectItem>
											<SelectItem value="est">Eastern Time</SelectItem>
											<SelectItem value="pst">Pacific Time</SelectItem>
										</SelectContent>
									</Select>
								</div>
								<Button>Save Preferences</Button>
							</CardContent>
						</Card>
					</TabsContent>
					<TabsContent value="appearance">
						<Card>
							<CardHeader>
								<CardTitle>Appearance</CardTitle>
								<CardDescription>Customize the look and feel of the application.</CardDescription>
							</CardHeader>
							<CardContent className="space-y-4">
								<div className="flex items-center justify-between">
									<Label htmlFor="theme">Theme</Label>
									<div className="flex items-center space-x-2">
										<Sun className="h-5 w-5" />
										<Switch
											id="theme"
											checked={theme === 'dark'}
											onCheckedChange={(checked) => setTheme(checked ? 'dark' : 'light')}
										/>
										<Moon className="h-5 w-5" />
									</div>
								</div>
								<div className="space-y-2">
									<Label htmlFor="font-size">Font Size</Label>
									<Select>
										<SelectTrigger>
											<SelectValue placeholder="Select Font Size" />
										</SelectTrigger>
										<SelectContent>
											<SelectItem value="small">Small</SelectItem>
											<SelectItem value="medium">Medium</SelectItem>
											<SelectItem value="large">Large</SelectItem>
										</SelectContent>
									</Select>
								</div>
								<Button>Apply Changes</Button>
							</CardContent>
						</Card>
					</TabsContent>
					<TabsContent value="notifications">
						<Card>
							<CardHeader>
								<CardTitle>Notification Settings</CardTitle>
								<CardDescription>Manage how you receive notifications.</CardDescription>
							</CardHeader>
							<CardContent className="space-y-4">
								<div className="flex items-center justify-between">
									<Label htmlFor="notifications">Enable Notifications</Label>
									<Switch
										id="notifications"
										checked={notifications}
										onCheckedChange={setNotifications}
									/>
								</div>
								<div className="space-y-2">
									<Label>Notification Types</Label>
									<div className="space-y-2">
										<div className="flex items-center space-x-2">
											<Switch id="email-notifications" />
											<Label htmlFor="email-notifications">Email Notifications</Label>
										</div>
										<div className="flex items-center space-x-2">
											<Switch id="push-notifications" />
											<Label htmlFor="push-notifications">Push Notifications</Label>
										</div>
										<div className="flex items-center space-x-2">
											<Switch id="sms-notifications" />
											<Label htmlFor="sms-notifications">SMS Notifications</Label>
										</div>
									</div>
								</div>
								<Button>Save Notification Preferences</Button>
							</CardContent>
						</Card>
					</TabsContent>
				</Tabs>
			</div>
		</div>
	)
}

export default Settings
