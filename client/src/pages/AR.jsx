import React, { useState, useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Sky, Text } from '@react-three/drei'
import * as THREE from 'three'
import { createNoise2D } from 'simplex-noise'

// Mood configurations
const moodConfigs = {
	happy: {
		terrainColor: '#7cfc00',
		waterColor: '#4facf7',
		skyTurbidity: 10,
		skyRayleigh: 3,
		sunPosition: [100, 50, 100],
		description: 'Joyful and content, with a bright outlook.'
	},
	sad: {
		terrainColor: '#4682b4',
		waterColor: '#315a7d',
		skyTurbidity: 20,
		skyRayleigh: 10,
		sunPosition: [0, 10, -100],
		description: 'Melancholic, with a touch of introspection.'
	},
	excited: {
		terrainColor: '#ff4500',
		waterColor: '#ff7f50',
		skyTurbidity: 5,
		skyRayleigh: 2,
		sunPosition: [100, 90, 0],
		description: 'Energetic and full of anticipation!'
	},
	calm: {
		terrainColor: '#98fb98',
		waterColor: '#87cefa',
		skyTurbidity: 2,
		skyRayleigh: 1,
		sunPosition: [0, 30, 100],
		description: 'Peaceful and serene, like a gentle breeze.'
	}
}

const Terrain = ({ mood }) => {
	const mesh = useRef()
	const noise2D = createNoise2D()

	const generateHeight = (width, height, scale = 1) => {
		const size = width * height
		const data = new Float32Array(size)
		const perlin = new THREE.Vector2(Math.random(), Math.random())

		for (let i = 0; i < size; i++) {
			const x = i % width
			const y = Math.floor(i / width)
			const nx = x / width - 0.5
			const ny = y / height - 0.5
			let e =
				1.0 * noise2D(nx * scale + perlin.x, ny * scale + perlin.y) +
				0.5 * noise2D(nx * scale * 2 + perlin.x, ny * scale * 2 + perlin.y) +
				0.25 * noise2D(nx * scale * 4 + perlin.x, ny * scale * 4 + perlin.y)
			e /= 1.75
			data[i] = e * 20 
		}

		return data
	}

	const geometry = useMemo(() => {
		const geo = new THREE.PlaneGeometry(400, 400, 200, 200) 
		const positions = geo.attributes.position.array
		const heightData = generateHeight(201, 201, 3)

		for (let i = 0; i < positions.length; i += 3) {
			positions[i + 2] = heightData[i / 3]
		}

		geo.computeVertexNormals()
		return geo
	}, [])

	return (
		<mesh
			ref={mesh}
			rotation={[-Math.PI / 2, 0, 0]}
			position={[0, -10, 0]} 
			receiveShadow
			castShadow
		>
			<primitive object={geometry} />
			<meshStandardMaterial
				color={moodConfigs[mood].terrainColor}
				roughness={0.8}
				metalness={0.2}
				side={THREE.DoubleSide}
			/>
		</mesh>
	)
}

const Water = ({ mood }) => {
	return (
		<mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -9, 0]}>
			{' '}
			<planeGeometry args={[400, 400]} /> 
			<meshStandardMaterial color={moodConfigs[mood].waterColor} transparent opacity={0.6} />
		</mesh>
	)
}

const Sun = ({ position }) => {
	const mesh = useRef()

	useFrame(({ clock }) => {
		mesh.current.position.y = Math.sin(clock.getElapsedTime() * 0.1) * 10 + position[1] 
	})

	return (
		<mesh ref={mesh} position={position}>
			<sphereGeometry args={[5, 32, 32]} /> 
			<meshBasicMaterial color="#FDB813" />
			<pointLight color="#FDB813" intensity={1.5} distance={1000} castShadow />
		</mesh>
	)
}

const MoodSelector = ({ setMood }) => {
	return (
		<div className="absolute left-4 top-4 z-10">
			<label htmlFor="mood-select" className="mb-2 block text-sm font-medium text-gray-900 dark:text-white">
				Choose your mood
			</label>
			<select
				id="mood-select"
				onChange={(e) => setMood(e.target.value)}
				className="block w-full rounded-lg border border-gray-300 bg-white bg-opacity-75 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
			>
				<option value="happy">Happy</option>
				<option value="sad">Sad</option>
				<option value="excited">Excited</option>
				<option value="calm">Calm</option>
			</select>
		</div>
	)
}

const MoodDescription = ({ mood }) => {
	return (
		<Text
			position={[0, 50, -100]} 
			fontSize={5} 
			color="#ffffff"
			anchorX="center"
			anchorY="middle"
			outlineWidth={0.2} 
			outlineColor="#000000"
		>
			{moodConfigs[mood].description}
		</Text>
	)
}

const FullscreenMoodLandscape = () => {
	const [mood, setMood] = useState('happy')

	return (
		<div className="fixed inset-0 h-full w-full">
			{' '}
			<MoodSelector setMood={setMood} />
			<Canvas shadows camera={{ position: [0, 50, 150], fov: 60 }}>
				{' '}
				<Sky
					turbidity={moodConfigs[mood].skyTurbidity}
					rayleigh={moodConfigs[mood].skyRayleigh}
					mieCoefficient={0.005}
					mieDirectionalG={0.8}
					sunPosition={moodConfigs[mood].sunPosition}
				/>
				<ambientLight intensity={0.5} />
				<Terrain mood={mood} />
				<Water mood={mood} />
				<Sun position={moodConfigs[mood].sunPosition} />
				<MoodDescription mood={mood} />
				<OrbitControls enablePan={false} maxPolarAngle={Math.PI / 2.1} />
			</Canvas>
		</div>
	)
}

export default FullscreenMoodLandscape
