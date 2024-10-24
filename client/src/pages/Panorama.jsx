import React, { useEffect, useRef, useState } from 'react'
import * as THREE from 'three'
import { VRButton } from 'three/examples/jsm/webxr/VRButton.js'
import { House } from 'lucide-react'
import { Link } from 'react-router-dom'

const Panorama = ({ panoramaTexture = '/textures/kandao3.jpg', depthTexture = '/textures/kandao3_depthmap.jpg' }) => {
	const containerRef = useRef(null)
	const infoRef = useRef(null)
	const rendererRef = useRef(null)
	const sceneRef = useRef(null)
	const cameraRef = useRef(null)
	const sphereRef = useRef(null)
	const clockRef = useRef(null)
	const vrButtonRef = useRef(null) // New ref for VR button
	const [error, setError] = useState(null)
	const [isLoading, setIsLoading] = useState(true)

	useEffect(() => {
		if (!containerRef.current) return

		let isComponentMounted = true

		const init = async () => {
			try {
				if ('xr' in navigator) {
					try {
						const supported = await navigator.xr.isSessionSupported('immersive-vr')
						if (!supported && isComponentMounted) {
							setError('VR not supported in this browser')
						}
					} catch (err) {
						console.warn('Error checking VR support:', err)
					}
				}

				clockRef.current = new THREE.Clock()
				sceneRef.current = new THREE.Scene()
				sceneRef.current.background = null

				const light = new THREE.AmbientLight(0xffffff, 3)
				sceneRef.current.add(light)

				cameraRef.current = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 1, 2000)
				sceneRef.current.add(cameraRef.current)

				const panoSphereGeo = new THREE.SphereGeometry(6, 256, 256)
				const panoSphereMat = new THREE.MeshStandardMaterial({
					side: THREE.BackSide,
					displacementScale: -4.0,
					transparent: true,
					opacity: 1
				})

				sphereRef.current = new THREE.Mesh(panoSphereGeo, panoSphereMat)

				const loadTexture = (url) => {
					return new Promise((resolve, reject) => {
						const loader = new THREE.TextureLoader()
						loader.load(
							url,
							(texture) => resolve(texture),
							(progressEvent) => {
								if (progressEvent.lengthComputable) {
									const progress = (progressEvent.loaded / progressEvent.total) * 100
									console.log(`Loading texture ${url}: ${progress.toFixed(1)}%`)
								}
							},
							(error) => reject(new Error(`Failed to load texture ${url}: ${error.message}`))
						)
					})
				}

				try {
					setIsLoading(true)

					const [texture, depth] = await Promise.all([
						loadTexture(panoramaTexture),
						loadTexture(depthTexture)
					])

					if (!isComponentMounted) return

					texture.colorSpace = THREE.SRGBColorSpace
					texture.minFilter = THREE.NearestFilter
					texture.generateMipmaps = false
					sphereRef.current.material.map = texture

					depth.minFilter = THREE.NearestFilter
					depth.generateMipmaps = false
					sphereRef.current.material.displacementMap = depth

					sceneRef.current.add(sphereRef.current)
					setIsLoading(false)
				} catch (err) {
					if (isComponentMounted) {
						console.error('Texture loading error:', err)
						setError(err.message)
						sceneRef.current.add(sphereRef.current)
						setIsLoading(false)
					}
					return
				}

				rendererRef.current = new THREE.WebGLRenderer({
					antialias: true,
					alpha: true,
					powerPreference: 'high-performance'
				})

				rendererRef.current.setClearColor(0x000000, 0)
				rendererRef.current.setPixelRatio(window.devicePixelRatio)
				rendererRef.current.setSize(window.innerWidth, window.innerHeight)
				rendererRef.current.xr.enabled = true
				rendererRef.current.xr.setReferenceSpaceType('local')

				if (containerRef.current && isComponentMounted) {
					containerRef.current.appendChild(rendererRef.current.domElement)

					try {
						// Create VR button and store reference
						vrButtonRef.current = VRButton.createButton(rendererRef.current)
						// Append to container instead of body
						containerRef.current.appendChild(vrButtonRef.current)
						// Position the VR button
						vrButtonRef.current.style.position = 'absolute'
						vrButtonRef.current.style.bottom = '20px'
						vrButtonRef.current.style.left = '50%'
						vrButtonRef.current.style.transform = 'translateX(-50%)'
						vrButtonRef.current.style.zIndex = '100'
					} catch (err) {
						console.warn('VR button creation failed:', err)
					}
				}

				if (rendererRef.current && isComponentMounted) {
					rendererRef.current.setAnimationLoop(animate)
				}
			} catch (err) {
				if (isComponentMounted) {
					console.error('Scene initialization error:', err)
					setError('Failed to initialize scene: ' + err.message)
				}
			}
		}

		const onWindowResize = () => {
			if (cameraRef.current && rendererRef.current) {
				cameraRef.current.aspect = window.innerWidth / window.innerHeight
				cameraRef.current.updateProjectionMatrix()
				rendererRef.current.setSize(window.innerWidth, window.innerHeight)
			}
		}

		const animate = () => {
			if (!rendererRef.current?.xr.isPresenting && sphereRef.current && clockRef.current) {
				const time = clockRef.current.getElapsedTime()
				sphereRef.current.rotation.y += 0.001
				sphereRef.current.position.x = Math.sin(time) * 0.2
				sphereRef.current.position.z = Math.cos(time) * 0.2
			}

			if (rendererRef.current && sceneRef.current && cameraRef.current) {
				rendererRef.current.render(sceneRef.current, cameraRef.current)
			}
		}

		window.addEventListener('resize', onWindowResize)
		init()

		return () => {
			isComponentMounted = false
			window.removeEventListener('resize', onWindowResize)

			if (rendererRef.current) {
				rendererRef.current.setAnimationLoop(null)
				rendererRef.current.dispose()
			}

			if (containerRef.current && rendererRef.current?.domElement) {
				containerRef.current.removeChild(rendererRef.current.domElement)
			}

			if (vrButtonRef.current && vrButtonRef.current.parentNode) {
				vrButtonRef.current.parentNode.removeChild(vrButtonRef.current)
			}

			const vrButtons = document.querySelectorAll('.VRButton')
			vrButtons.forEach((button) => button.remove())

			if (sphereRef.current) {
				if (sphereRef.current.geometry) {
					sphereRef.current.geometry.dispose()
				}
				if (sphereRef.current.material) {
					if (sphereRef.current.material.map) {
						sphereRef.current.material.map.dispose()
					}
					if (sphereRef.current.material.displacementMap) {
						sphereRef.current.material.displacementMap.dispose()
					}
					sphereRef.current.material.dispose()
				}
			}
		}
	}, [panoramaTexture, depthTexture])

	return (
		<div className="relative h-screen w-full">
			{isLoading && (
				<div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-white">
					Loading panorama...
				</div>
			)}
			<div ref={containerRef} className="h-full w-full" />
			<button className="absolute right-4 top-4 flex items-center gap-2 rounded bg-gray-800 px-4 py-2 text-white">
				<Link to="/features">
					<House />
				</Link>
			</button>
		</div>
	)
}

export default Panorama
