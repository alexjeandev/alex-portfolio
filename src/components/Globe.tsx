import { useEffect, useRef } from 'react'
import * as THREE from 'three'

function Globe() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(35, 1, 0.1, 100)
    camera.position.set(0, 0, 4)

    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      alpha: true,
    })

    renderer.setPixelRatio(window.devicePixelRatio)
    renderer.setSize(canvas.clientWidth, canvas.clientHeight)

    // Lights
    scene.add(new THREE.AmbientLight(0x404040, 1.5))
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1.2)
    directionalLight.position.set(5, 3, 5)
    scene.add(directionalLight)

    // Earth
    const texture = new THREE.TextureLoader().load('/assets/earth_night.jpg')
    const earth = new THREE.Mesh(
      new THREE.SphereGeometry(1, 64, 64),
      new THREE.MeshPhongMaterial({
        map: texture,
        emissiveMap: texture,
        emissive: new THREE.Color(0x4f8cff),
        emissiveIntensity: 0.1,
        shininess: 30,
      })
    )
    scene.add(earth)

    // Stars
    const starsGeometry = new THREE.BufferGeometry()
    const starCount = 1500
    const starPositions = new Float32Array(starCount * 3)
    for (let i = 0; i < starCount * 3; i++) {
      starPositions[i] = (Math.random() - 0.5) * 50
    }
    starsGeometry.setAttribute('position', new THREE.BufferAttribute(starPositions, 3))
    const starsMaterial = new THREE.PointsMaterial({
      color: 0xffffff,
      size: 0.05,
      transparent: true,
      opacity: 0.9,
    })
    const starField = new THREE.Points(starsGeometry, starsMaterial)
    scene.add(starField)

    // Meteors
    const meteors: THREE.Line[] = []

    function createMeteor() {
      const geometry = new THREE.BufferGeometry()
      const positions = new Float32Array([0, 0, 0, 0.8, 0, 0])
      geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
      const material = new THREE.LineBasicMaterial({
        color: 0xffddaa,
        transparent: true,
        opacity: 1,
      })
      const meteor = new THREE.Line(geometry, material)
      resetMeteor(meteor)
      scene.add(meteor)
      meteors.push(meteor)
    }

    function resetMeteor(meteor: THREE.Line) {
      meteor.position.set(
        -8 + Math.random() * 3,
        4 + Math.random() * 2,
        -5 + Math.random() * 3
      )
      meteor.userData.velocity = new THREE.Vector3(
        0.06 + Math.random() * 0.09,
        -0.07 - Math.random() * 0.07,
        0.02 + Math.random() * 0.05
      )
      ;(meteor.material as THREE.LineBasicMaterial).opacity = 1
    }

    for (let i = 0; i < 3; i++) createMeteor()

    // Animate
    function animate() {
      requestAnimationFrame(animate)
      earth.rotation.y += 0.002
      starField.rotation.y += 0.0004

      meteors.forEach((meteor) => {
        meteor.position.add(meteor.userData.velocity)
        const mat = meteor.material as THREE.LineBasicMaterial
        mat.opacity -= 0.015
        if (meteor.position.y < -5 || mat.opacity <= 0) {
          resetMeteor(meteor)
        }
      })

      renderer.render(scene, camera)
    }

    animate()

    // Cleanup
    return () => {
      renderer.dispose()
    }
  }, [])

  return (
    <canvas ref={canvasRef} style={{ width: '100%', height: '100%' }} />
  )
}

export default Globe