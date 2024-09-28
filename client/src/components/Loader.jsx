import { cn } from '@/lib'
import React from 'react'

const Loader = ({ className, variant }) => {
	return (
		<div className={cn('flex h-screen items-center justify-center', variant === 'small' && 'h-auto')}>
			<div
				className={cn('h-16 w-16 animate-spin rounded-full border-b-2 border-t-2 border-blue-500', className)}
			/>
		</div>
	)
}

export default Loader
