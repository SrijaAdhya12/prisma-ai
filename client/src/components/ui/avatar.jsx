import * as AvatarPrimitive from '@radix-ui/react-avatar'
import { forwardRef } from 'react'
import { cn } from '@/lib'

const Avatar = forwardRef(({ className, ...props }, ref) => (
	<AvatarPrimitive.Root
		ref={ref}
		className={cn('relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full', className)}
		{...props}
	/>
))
Avatar.displayName = AvatarPrimitive.Root.displayName

const AvatarImage = forwardRef(({ className, ...props }, ref) => (
	<AvatarPrimitive.Image ref={ref} className={cn('aspect-square h-full w-full', className)} {...props} />
))
AvatarImage.displayName = AvatarPrimitive.Image.displayName

const AvatarFallback = forwardRef(({ className, ...props }, ref) => (
	<AvatarPrimitive.Fallback
		ref={ref}
		className={cn('bg-muted flex h-full w-full items-center justify-center rounded-full', className)}
		{...props}
	/>
))
AvatarFallback.displayName = AvatarPrimitive.Fallback.displayName

export { Avatar, AvatarImage, AvatarFallback }
