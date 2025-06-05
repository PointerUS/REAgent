"use client"

import { useEffect, useRef, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import type { VirtualTourScene, Hotspot } from "@/lib/types"

interface PanoramaViewerProps {
  scene: VirtualTourScene
  onHotspotClick: (hotspot: Hotspot) => void
  onSceneLoad?: () => void
}

export function PanoramaViewer({ scene, onHotspotClick, onSceneLoad }: PanoramaViewerProps) {
  const mountRef = useRef<HTMLDivElement>(null)
  const sceneRef = useRef<any>()
  const rendererRef = useRef<any>()
  const cameraRef = useRef<any>()
  const sphereRef = useRef<any>()
  const hotspotsRef = useRef<any>()
  const [isLoading, setIsLoading] = useState(true)
  const [loadingProgress, setLoadingProgress] = useState(0)
  const [THREE, setTHREE] = useState<any>(null)

  // Dynamically import Three.js to avoid SSR issues
  useEffect(() => {
    const loadThree = async () => {
      try {
        const threeModule = await import("three")
        setTHREE(threeModule)
      } catch (error) {
        console.error("Failed to load Three.js:", error)
        setIsLoading(false)
      }
    }
    loadThree()
  }, [])

  useEffect(() => {
    if (!mountRef.current || !THREE) return

    // Scene setup
    const threeScene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
    const renderer = new THREE.WebGLRenderer({ antialias: true })

    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.setPixelRatio(window.devicePixelRatio)
    mountRef.current.appendChild(renderer.domElement)

    // Store references
    sceneRef.current = threeScene
    rendererRef.current = renderer
    cameraRef.current = camera

    // Create sphere geometry for 360° image
    const geometry = new THREE.SphereGeometry(500, 60, 40)
    geometry.scale(-1, 1, 1) // Invert to see from inside

    // Load 360° image
    const loader = new THREE.TextureLoader()
    loader.load(
      scene.image360,
      (texture: any) => {
        const material = new THREE.MeshBasicMaterial({ map: texture })
        const sphere = new THREE.Mesh(geometry, material)
        threeScene.add(sphere)
        sphereRef.current = sphere

        setIsLoading(false)
        onSceneLoad?.()
      },
      (progress: any) => {
        const percent = (progress.loaded / progress.total) * 100
        setLoadingProgress(percent)
      },
      (error: any) => {
        console.error("Error loading 360° image:", error)
        setIsLoading(false)
      },
    )

    // Add hotspots
    const hotspotsGroup = new THREE.Group()
    threeScene.add(hotspotsGroup)
    hotspotsRef.current = hotspotsGroup

    // Camera controls
    let isMouseDown = false
    let mouseX = 0
    let mouseY = 0
    let lon = 0
    let lat = 0
    let phi = 0
    let theta = 0

    const onMouseDown = (event: MouseEvent) => {
      isMouseDown = true
      mouseX = event.clientX
      mouseY = event.clientY
    }

    const onMouseUp = () => {
      isMouseDown = false
    }

    const onMouseMove = (event: MouseEvent) => {
      if (!isMouseDown) return

      const deltaX = event.clientX - mouseX
      const deltaY = event.clientY - mouseY

      mouseX = event.clientX
      mouseY = event.clientY

      lon -= deltaX * 0.1
      lat += deltaY * 0.1

      lat = Math.max(-85, Math.min(85, lat))

      phi = THREE.MathUtils.degToRad(90 - lat)
      theta = THREE.MathUtils.degToRad(lon)

      camera.position.x = 100 * Math.sin(phi) * Math.cos(theta)
      camera.position.y = 100 * Math.cos(phi)
      camera.position.z = 100 * Math.sin(phi) * Math.sin(theta)

      camera.lookAt(0, 0, 0)
    }

    // Touch controls for mobile
    const onTouchStart = (event: TouchEvent) => {
      if (event.touches.length === 1) {
        mouseX = event.touches[0].clientX
        mouseY = event.touches[0].clientY
        isMouseDown = true
      }
    }

    const onTouchMove = (event: TouchEvent) => {
      if (event.touches.length === 1 && isMouseDown) {
        const deltaX = event.touches[0].clientX - mouseX
        const deltaY = event.touches[0].clientY - mouseY

        mouseX = event.touches[0].clientX
        mouseY = event.touches[0].clientY

        lon -= deltaX * 0.1
        lat += deltaY * 0.1

        lat = Math.max(-85, Math.min(85, lat))

        phi = THREE.MathUtils.degToRad(90 - lat)
        theta = THREE.MathUtils.degToRad(lon)

        camera.position.x = 100 * Math.sin(phi) * Math.cos(theta)
        camera.position.y = 100 * Math.cos(phi)
        camera.position.z = 100 * Math.sin(phi) * Math.sin(theta)

        camera.lookAt(0, 0, 0)
      }
    }

    const onTouchEnd = () => {
      isMouseDown = false
    }

    // Add event listeners
    renderer.domElement.addEventListener("mousedown", onMouseDown)
    renderer.domElement.addEventListener("mouseup", onMouseUp)
    renderer.domElement.addEventListener("mousemove", onMouseMove)
    renderer.domElement.addEventListener("touchstart", onTouchStart)
    renderer.domElement.addEventListener("touchmove", onTouchMove)
    renderer.domElement.addEventListener("touchend", onTouchEnd)

    // Handle window resize
    const handleResize = () => {
      if (!mountRef.current) return
      const width = mountRef.current.clientWidth
      const height = mountRef.current.clientHeight

      camera.aspect = width / height
      camera.updateProjectionMatrix()
      renderer.setSize(width, height)
    }

    window.addEventListener("resize", handleResize)
    handleResize()

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate)
      renderer.render(threeScene, camera)
    }
    animate()

    // Cleanup
    return () => {
      window.removeEventListener("resize", handleResize)
      renderer.domElement.removeEventListener("mousedown", onMouseDown)
      renderer.domElement.removeEventListener("mouseup", onMouseUp)
      renderer.domElement.removeEventListener("mousemove", onMouseMove)
      renderer.domElement.removeEventListener("touchstart", onTouchStart)
      renderer.domElement.removeEventListener("touchmove", onTouchMove)
      renderer.domElement.removeEventListener("touchend", onTouchEnd)

      if (mountRef.current && renderer.domElement) {
        mountRef.current.removeChild(renderer.domElement)
      }
      renderer.dispose()
    }
  }, [THREE, scene.image360, onSceneLoad])

  // Add hotspots when scene changes
  useEffect(() => {
    if (!hotspotsRef.current || !scene.hotspots || !THREE) return

    // Clear existing hotspots
    hotspotsRef.current.clear()

    // Add new hotspots
    scene.hotspots.forEach((hotspot) => {
      const hotspotGeometry = new THREE.SphereGeometry(5, 16, 16)
      const hotspotMaterial = new THREE.MeshBasicMaterial({
        color: hotspot.type === "navigation" ? 0x00ff00 : 0xff0000,
        transparent: true,
        opacity: 0.8,
      })
      const hotspotMesh = new THREE.Mesh(hotspotGeometry, hotspotMaterial)

      // Position hotspot
      const distance = 400
      hotspotMesh.position.set(
        hotspot.position.x * distance,
        hotspot.position.y * distance,
        hotspot.position.z * distance,
      )

      // Add click handler
      hotspotMesh.userData = { hotspot, onClick: () => onHotspotClick(hotspot) }

      hotspotsRef.current?.add(hotspotMesh)
    })
  }, [THREE, scene.hotspots, onHotspotClick])

  // Handle hotspot clicks
  useEffect(() => {
    if (!rendererRef.current || !cameraRef.current || !THREE) return

    const raycaster = new THREE.Raycaster()
    const mouse = new THREE.Vector2()

    const handleClick = (event: MouseEvent) => {
      if (!mountRef.current || !hotspotsRef.current) return

      const rect = mountRef.current.getBoundingClientRect()
      mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1
      mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1

      raycaster.setFromCamera(mouse, cameraRef.current!)
      const intersects = raycaster.intersectObjects(hotspotsRef.current.children)

      if (intersects.length > 0) {
        const hotspot = intersects[0].object.userData.hotspot
        if (hotspot) {
          onHotspotClick(hotspot)
        }
      }
    }

    rendererRef.current.domElement.addEventListener("click", handleClick)

    return () => {
      if (rendererRef.current?.domElement) {
        rendererRef.current.domElement.removeEventListener("click", handleClick)
      }
    }
  }, [THREE, onHotspotClick])

  if (!THREE) {
    return (
      <div className="relative w-full h-full flex items-center justify-center bg-gray-100">
        <div className="text-center">
          <motion.div
            className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full mx-auto mb-4"
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
          />
          <p className="text-lg font-medium text-gray-700">Loading 3D Engine...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="relative w-full h-full">
      <div ref={mountRef} className="w-full h-full" />

      <AnimatePresence>
        {isLoading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center"
          >
            <div className="text-center text-white">
              <motion.div
                className="w-16 h-16 border-4 border-white border-t-transparent rounded-full mx-auto mb-4"
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
              />
              <p className="text-lg font-medium">Loading Virtual Tour</p>
              <p className="text-sm opacity-75">{Math.round(loadingProgress)}%</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
