import * as THREE from 'three'
import OrbitControls from 'utils/OrbitControls'

import values from 'values'
import Emitter from 'utils/Emitter'

export default class App {
  constructor() {
    this.init()
  }

  init() {
    // Create renderer
    this.renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true
    })
    this.renderer.setPixelRatio(window.devicePixelRatio)
    document.body.appendChild(this.renderer.domElement)

    // Create scene, camera & orbitcontrols
    this.scene = new THREE.Scene()
    this.camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    )
    this.controls = new OrbitControls(this.camera, this.renderer.domElement)
    this.camera.position.set(5, 5, 5)
    this.controls.update()

    // Set aspect ratios
    this.onResize()
    // Create floor
    this.createFloor()
    // Listen events
    this.listen()
    // Helpers
    this.helpers()
    // RAF
    this.animate()
  }

  componentWillUnmount() {
    this.unlisten()
    window.cancelAnimationFrame(this.raf)
    document.body.removeChild(this.renderer.domElement)
  }

  createFloor() {
    const geometry = new THREE.PlaneBufferGeometry(10, 10, 1, 1)
    const material = new THREE.MeshBasicMaterial({
      color: 0x2195ce
    })
    geometry.rotateX(-Math.PI / 2)
    this.scene.add(new THREE.Mesh(geometry, material))
  }

  listen() {
    Emitter.on('resize', this.onResize)
  }

  unlisten() {
    Emitter.off('resize', this.onResize)
    this.renderer.dispose()
    this.controls.dispose()
  }

  helpers() {
    this.scene.add(new THREE.GridHelper(50, 50))
  }

  animate = () => {
    this.raf = requestAnimationFrame(this.animate)

    this.controls.update()
    this.renderer.render(this.scene, this.camera)
  }

  onResize = () => {
    this.camera.aspect = values.viewport.width / values.viewport.height
    this.camera.updateProjectionMatrix()
    this.renderer.setSize(values.viewport.width, values.viewport.height)
  }
}
