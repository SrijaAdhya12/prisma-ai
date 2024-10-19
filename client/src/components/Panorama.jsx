import React, { useEffect, useRef } from 'react'
import * as THREE from 'three'
import { VRButton } from 'three/addons/webxr/VRButton.js'

const Panorama = () => {
	const containerRef = useRef(null)
	const infoRef = useRef(null)

	useEffect(() => {
		let camera, scene, renderer, sphere, clock

		const init = () => {
			clock = new THREE.Clock()
			scene = new THREE.Scene()
			scene.background = new THREE.Color(0x101010)

			const light = new THREE.AmbientLight(0xffffff, 3)
			scene.add(light)

			camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 1, 2000)
			scene.add(camera)

			const panoSphereGeo = new THREE.SphereGeometry(6, 256, 256)
			const panoSphereMat = new THREE.MeshStandardMaterial({
				side: THREE.BackSide,
				displacementScale: -4.0
			})

			sphere = new THREE.Mesh(panoSphereGeo, panoSphereMat)

			const manager = new THREE.LoadingManager()
			const loader = new THREE.TextureLoader(manager)

			loader.load('./textures/kandao3.jpg', (texture) => {
				texture.colorSpace = THREE.SRGBColorSpace
				texture.minFilter = THREE.NearestFilter
				texture.generateMipmaps = false
				sphere.material.map = texture
			})

			loader.load('./textures/kandao3_depthmap.jpg', (depth) => {
				depth.minFilter = THREE.NearestFilter
				depth.generateMipmaps = false
				sphere.material.displacementMap = depth
			})

			manager.onLoad = () => {
				scene.add(sphere)
			}

			renderer = new THREE.WebGLRenderer()
			renderer.setPixelRatio(window.devicePixelRatio)
			renderer.setSize(window.innerWidth, window.innerHeight)
			renderer.setAnimationLoop(animate)
			renderer.xr.enabled = true
			renderer.xr.setReferenceSpaceType('local')

			containerRef.current.appendChild(renderer.domElement)
			document.body.appendChild(VRButton.createButton(renderer))

			window.addEventListener('resize', onWindowResize)
		}

		const onWindowResize = () => {
			camera.aspect = window.innerWidth / window.innerHeight
			camera.updateProjectionMatrix()
			renderer.setSize(window.innerWidth, window.innerHeight)
		}

		const animate = () => {
			if (renderer.xr.isPresenting === false) {
				const time = clock.getElapsedTime()
				sphere.rotation.y += 0.001
				sphere.position.x = Math.sin(time) * 0.2
				sphere.position.z = Math.cos(time) * 0.2
			}
			renderer.render(scene, camera)
		}

		init()

		return () => {
			window.removeEventListener('resize', onWindowResize)
			containerRef.current.removeChild(renderer.domElement)
			renderer.dispose()
		}
	}, [])

	return (
		<div className="h-screen w-full">
			<div ref={containerRef} className="h-full w-full" />
			<div ref={infoRef} className="absolute bottom-0 left-0 right-0 p-4 text-center text-white">
				<a
					href="https://threejs.org"
					target="_blank"
					rel="noopener noreferrer"
					className="text-blue-400 hover:underline"
				>
					three.js
				</a>{' '}
				vr - panorama with depth
				<br />
				Created by{' '}
				<a
					href="https://orfleisher.com"
					target="_blank"
					rel="noopener noreferrer"
					className="text-blue-400 hover:underline"
				>
					@juniorxsound
				</a>
				. Panorama from{' '}
				<a
					href="https://krpano.com/examples/?depthmap"
					target="_blank"
					rel="noopener noreferrer"
					className="text-blue-400 hover:underline"
				>
					krpano
				</a>
				.
			</div>
		</div>
	)
}

export default Panorama
