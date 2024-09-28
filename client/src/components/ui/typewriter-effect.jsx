import { cn } from '@/lib'
import { useMotionValue, useTransform, animate, motion, stagger, useAnimate, useInView } from 'framer-motion'
import { useEffect } from 'react'

const RedoAnimText = ({ delay, texts }) => {
	const textIndex = useMotionValue(0)
	const baseText = useTransform(textIndex, (latest) => texts[latest] || '')
	const count = useMotionValue(0)
	const rounded = useTransform(count, (latest) => Math.round(latest))
	const displayText = useTransform(rounded, (latest) => baseText.get().slice(0, latest))
	const updatedThisRound = useMotionValue(true)

	useEffect(() => {
		animate(count, 60, {
			type: 'tween',
			delay: delay,
			duration: 3,
			ease: 'easeIn',
			repeat: Infinity,
			repeatType: 'reverse',
			repeatDelay: 1,
			onUpdate(latest) {
				if (updatedThisRound.get() && latest > 0) {
					updatedThisRound.set(false)
				} else if (!updatedThisRound.get() && latest === 0) {
					if (textIndex.get() === texts.length - 1) {
						textIndex.set(0)
					} else {
						textIndex.set(textIndex.get() + 1)
					}
					updatedThisRound.set(true)
				}
			}
		})
	}, [])

	return <motion.span className="break-words">{displayText}</motion.span>
}

export const TypewriterEffect2 = ({ texts, baseText, className, cursorClassName }) => {
	const cursorVariants = {
		blinking: {
			opacity: [0, 0, 1, 1],
			transition: {
				duration: 1,
				repeat: Infinity,
				repeatDelay: 0,
				ease: 'linear',
				times: [0, 0.5, 0.5, 1]
			}
		}
	}

	return (
		<span className={cn('text-center text-base font-bold sm:text-xl md:text-3xl lg:text-5xl', className)}>
			{baseText} <RedoAnimText delay={2} texts={texts} />
			<motion.div
				variants={cursorVariants}
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				transition={{ duration: 0.8, repeat: Infinity, repeatType: 'reverse' }}
				className={cn(
					'ml-1 inline-block h-7 w-[4px] translate-y-0.5 rounded-sm bg-blue-500 sm:h-9 md:h-11 lg:h-14',
					cursorClassName
				)}
			/>
		</span>
	)
}

export const TypewriterEffect = ({ words, className, cursorClassName }) => {
	// split text inside of words into array of characters
	const wordsArray = words.map((word) => ({ ...word, text: word.text.split('') }))

	const [scope, animate] = useAnimate()
	const isInView = useInView(scope)
	useEffect(() => {
		if (isInView) {
			animate(
				'span',
				{
					display: 'inline-block',
					opacity: 1,
					width: 'fit-content'
				},
				{
					duration: 0.3,
					delay: stagger(0.1),
					ease: 'easeInOut'
				}
			)
		}
	}, [isInView])

	const renderWords = () => {
		return (
			<motion.div ref={scope} className="inline">
				{wordsArray.map((word, idx) => {
					return (
						<div key={`word-${idx}`} className="inline-block whitespace-pre">
							{word.text.map((char, index) => (
								<motion.span
									initial={{}}
									key={`char-${index}`}
									className={cn(
										`hidden whitespace-pre text-black opacity-0 dark:text-white`,
										word.className
									)}
								>
									{char}
								</motion.span>
							))}
							{idx === wordsArray.length - 1 ? '' : ' '}
						</div>
					)
				})}
			</motion.div>
		)
	}
	return (
		<div className={cn('text-center text-base font-bold sm:text-xl md:text-3xl lg:text-5xl', className)}>
			{renderWords()}
			<motion.span
				initial={{
					opacity: 0
				}}
				animate={{
					opacity: 1
				}}
				transition={{
					duration: 0.8,
					repeat: Infinity,
					repeatType: 'reverse'
				}}
				className={cn('inline-block h-4 w-[4px] rounded-sm bg-blue-500 md:h-6 lg:h-10', cursorClassName)}
			/>
		</div>
	)
}

export const TypewriterEffectSmooth = ({ words, className, cursorClassName }) => {
	// split text inside of words into array of characters
	const wordsArray = words.map((word) => ({ ...word, text: word.text.split() }))
	const renderWords = () => {
		return (
			<div>
				{wordsArray.map((word, idx) => {
					return (
						<div key={`word-${idx}`} className="inline-block whitespace-pre">
							{word.text.map((char, index) => (
								<span
									key={`char-${index}`}
									className={cn(`text-black dark:text-white`, word.className)}
								>
									{char}
								</span>
							))}
							{idx === wordsArray.length - 1 ? '' : ' '}
						</div>
					)
				})}
			</div>
		)
	}

	return (
		<div className={cn('my-6 flex space-x-1', className)}>
			<motion.div
				className="overflow-hidden pb-2"
				initial={{
					width: '0%'
				}}
				whileInView={{
					width: 'fit-content'
				}}
				transition={{
					duration: 2,
					ease: 'linear',
					delay: 1
				}}
			>
				<div className="lg:text:3xl whitespace-nowrap text-xs font-bold sm:text-base md:text-xl xl:text-5xl">
					{renderWords()}{' '}
				</div>{' '}
			</motion.div>
			<motion.span
				initial={{
					opacity: 0
				}}
				animate={{
					opacity: 1
				}}
				transition={{
					duration: 0.8,

					repeat: Infinity,
					repeatType: 'reverse'
				}}
				className={cn('block h-4 w-[4px] rounded-sm bg-blue-500 sm:h-6 xl:h-12', cursorClassName)}
			></motion.span>
		</div>
	)
}
