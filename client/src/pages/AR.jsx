import React, { useState, useRef, useMemo } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { OrbitControls, Sky, Cloud, Text } from '@react-three/drei'
import * as THREE from 'three'
import { createNoise2D } from 'simplex-noise'

const moodConfigs = {
	happy: {
		terrainColor: '#8fbc8f',
		skyTurbidity: 8,
		skyRayleigh: 2,
		sunPosition: [100, 100, 100],
		fogColor: '#e6f3ff',
		fogDensity: 0.002,
		description: 'Joyful and content, with a bright outlook.',
		particleColor: '#ffff00'
	},
	sad: {
		terrainColor: '#4682b4',
		skyTurbidity: 20,
		skyRayleigh: 10,
		sunPosition: [0, 10, -100],
		fogColor: '#708090',
		fogDensity: 0.01,
		description: 'Melancholic, with a touch of introspection.',
		particleColor: '#4169e1'
	},
	excited: {
		terrainColor: '#ff7f50',
		skyTurbidity: 5,
		skyRayleigh: 2,
		sunPosition: [100, 100, 0],
		fogColor: '#ffe4b5',
		fogDensity: 0.001,
		description: 'Energetic and full of anticipation!',
		particleColor: '#ff4500'
	},
	calm: {
		terrainColor: '#98fb98',
		skyTurbidity: 2,
		skyRayleigh: 1,
		sunPosition: [0, 50, 100],
		fogColor: '#f0f8ff',
		fogDensity: 0.003,
		description: 'Peaceful and serene, like a gentle breeze.',
		particleColor: '#00ffff'
	}
}

const Terrain = ({ mood }) => {
	const mesh = useRef()
	const noise2D = useMemo(() => createNoise2D(), [])

	const generateHeight = (width, height, scale = 1, octaves = 6, persistence = 0.5, lacunarity = 2) => {
		const size = width * height
		const data = new Float32Array(size)

		for (let i = 0; i < size; i++) {
			const x = i % width
			const y = Math.floor(i / width)
			let amplitude = 1
			let frequency = 1
			let noiseHeight = 0

			for (let o = 0; o < octaves; o++) {
				const sampleX = (x / width) * scale * frequency
				const sampleY = (y / height) * scale * frequency
				const perlinValue = noise2D(sampleX, sampleY)
				noiseHeight += perlinValue * amplitude

				amplitude *= persistence
				frequency *= lacunarity
			}

			data[i] = noiseHeight * 50
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
		<mesh ref={mesh} rotation={[-Math.PI / 2, 0, 0]} position={[0, -10, 0]} receiveShadow castShadow>
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

const DynamicClouds = ({ count = 20 }) => {
	const group = useRef()
	const cloudPositions = useMemo(() => {
		return Array.from({ length: count }, () => [
			Math.random() * 400 - 200,
			Math.random() * 50 + 50,
			Math.random() * 400 - 200
		])
	}, [count])

	useFrame(() => {
		group.current.children.forEach((cloud) => {
			cloud.position.x += 0.05
			if (cloud.position.x > 200) cloud.position.x = -200
		})
	})

	return (
		<group ref={group}>
			{cloudPositions.map((position, index) => (
				<Cloud
					key={index}
					position={position}
					opacity={0.5}
					speed={0.4}
					width={20}
					depth={1.5}
					segments={20}
					color="#ffffff" 
				/>
			))}
		</group>
	)
}

const Particles = ({ mood }) => {
	const count = 1000
	const mesh = useRef()

	const [positions, colors] = useMemo(() => {
		const positions = new Float32Array(count * 3)
		const colors = new Float32Array(count * 3)
		const color = new THREE.Color(moodConfigs[mood].particleColor)

		for (let i = 0; i < count; i++) {
			positions[i * 3] = (Math.random() - 0.5) * 400
			positions[i * 3 + 1] = Math.random() * 200
			positions[i * 3 + 2] = (Math.random() - 0.5) * 400

			color.toArray(colors, i * 3)
		}

		return [positions, colors]
	}, [count, mood])

	useFrame((state) => {
		const time = state.clock.getElapsedTime()
		for (let i = 0; i < count; i++) {
			const i3 = i * 3
			mesh.current.geometry.attributes.position.array[i3 + 1] =
				Math.sin(time + positions[i3] * 0.01) * 2 + positions[i3 + 1]
		}
		mesh.current.geometry.attributes.position.needsUpdate = true
	})

	return (
		<points ref={mesh}>
			<bufferGeometry>
				<bufferAttribute attach="attributes-position" count={count} array={positions} itemSize={3} />
				<bufferAttribute attach="attributes-color" count={count} array={colors} itemSize={3} />
			</bufferGeometry>
			<pointsMaterial size={0.5} vertexColors />
		</points>
	)
}

const MoodSelector = ({ setMood }) => {
	return (
		<div className="mood-selector">
			{Object.keys(moodConfigs).map((mood) => (
				<button
					key={mood}
					onClick={() => setMood(mood)}
					style={{
						margin: '5px',
						padding: '10px',
						cursor: 'pointer'
					}}
				>
					{mood.charAt(0).toUpperCase() + mood.slice(1)}
				</button>
			))}
		</div>
	)
}

class ErrorBoundary extends React.Component {
	constructor(props) {
		super(props)
		this.state = { hasError: false }
	}

	static getDerivedStateFromError(error) {
		return { hasError: true }
	}

	componentDidCatch(error, errorInfo) {
		console.error('Error caught by ErrorBoundary: ', error, errorInfo)
	}

	render() {
		if (this.state.hasError) {
			return <h1>Something went wrong.</h1>
		}

		return this.props.children
	}
}

const FullscreenMoodLandscape = () => {
	const [mood, setMood] = useState('happy')

	return (
		<ErrorBoundary>
			<div style={{ width: '100vw', height: '100vh', position: 'relative' }}>
				<Canvas camera={{ position: [0, 50, 100], fov: 75 }} shadows>
					<ambientLight intensity={0.5} />
					<fog attach="fog" args={[moodConfigs[mood].fogColor, 0, 1000]} />
					<Sky
						turbidity={moodConfigs[mood].skyTurbidity}
						rayleigh={moodConfigs[mood].skyRayleigh}
						sunPosition={moodConfigs[mood].sunPosition}
					/>
					<OrbitControls />
					<Particles mood={mood} />
					<Terrain mood={mood} />
					<Sun position={moodConfigs[mood].sunPosition} />
					<DynamicClouds />
					<Text
						position={[0, 80, -100]}
						fontSize={5}
						color="#ffffff"
						anchorX="center"
						anchorY="middle"
						outlineWidth={0.2}
						outlineColor="#000000"
					>
						{moodConfigs[mood].description}
					</Text>
				</Canvas>
				<div style={{ position: 'absolute', top: '10px', left: '10px', zIndex: 10 }}>
					<MoodSelector setMood={setMood} />
				</div>
			</div>
		</ErrorBoundary>
	)
}

export default FullscreenMoodLandscape
