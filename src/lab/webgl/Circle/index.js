import * as dat from 'dat.gui'

import vertexSource from './shader.vert'
import fragmentSource from './shader.frag'

export default class Circle {
  constructor() {
    this.canvas = document.createElement('canvas')
    document.body.appendChild(this.canvas)
    this.gl =
      this.canvas.getContext('webgl') ||
      this.canvas.getContext('experimental-webgl')

    this.gl ? this.init() : console.log("WebGL isn't supported")
  }

  componentWillUnmount() {
    try {
      document.body.removeChild(this.canvas)
      document.body.removeChild(this.gui.domElement)
    } catch (e) {
      console.log(e)
    }
  }

  init() {
    // Define default size
    this.canvas.width = 512
    this.canvas.height = 512
    this.gl.viewport(0, 0, this.canvas.width, this.canvas.height)

    // Call instance method to create shaders
    this.shaders = this.createShaders()
    if (!this.shaders) return

    // Call instance method to create and link program
    this.program = this.createProgram()
    if (!this.program) return

    // Tell webGL the current program
    this.gl.useProgram(this.program)

    // Add some controls
    this.createGUI()

    // Create vertices and triangle
    this.createVertices()
    this.createTriangle()

    // Render
    this.render()
  }

  createShaders() {
    // Create shaders
    const vertexShader = this.gl.createShader(this.gl.VERTEX_SHADER)
    const fragmentShader = this.gl.createShader(this.gl.FRAGMENT_SHADER)

    // Link shaders sources to gl shaders
    this.gl.shaderSource(vertexShader, vertexSource)
    this.gl.shaderSource(fragmentShader, fragmentSource)

    // Compile shaders and check if there's error during copilation
    this.gl.compileShader(vertexShader)
    if (!this.gl.getShaderParameter(vertexShader, this.gl.COMPILE_STATUS)) {
      console.error(
        'ERROR DURING VERTEX SHADER COMPILATION',
        this.gl.getShaderInfoLog(vertexShader)
      )
      return null
    }
    this.gl.compileShader(fragmentShader)
    if (!this.gl.getShaderParameter(fragmentShader, this.gl.COMPILE_STATUS)) {
      console.error(
        'ERROR DURING FRAGMENT SHADER COMPILATION',
        this.gl.getShaderInfoLog(fragmentShader)
      )
      return null
    }

    return {
      vertexShader,
      fragmentShader
    }
  }

  createProgram() {
    const { vertexShader, fragmentShader } = this.shaders

    // Create program & attach shaders to pragram
    const program = this.gl.createProgram()
    this.gl.attachShader(program, vertexShader)
    this.gl.attachShader(program, fragmentShader)

    // Link program to gl context
    this.gl.linkProgram(program)
    if (!this.gl.getProgramParameter(program, this.gl.LINK_STATUS)) {
      console.error(
        'ERROR DURING PROGRAM LINK',
        this.gl.getProgramInfoLog(program)
      )
      return null
    }

    // Validate program
    this.gl.validateProgram(program)
    if (!this.gl.getProgramParameter(program, this.gl.VALIDATE_STATUS)) {
      console.error(
        'ERROR DURING PROGRAM VALIDATION',
        this.gl.getProgramInfoLog(program)
      )
      return null
    }

    return program
  }

  createVertices() {
    let vertices = []
    let indices = []

    const alpha = (this.options.aperture * Math.PI * 2) / this.options.triangles

    for (let i = 0; i < this.options.triangles; i++) {
      vertices.push(
        0.0,
        0.0,
        Math.cos(alpha * i) * this.options.ray,
        Math.sin(alpha * i) * this.options.ray,
        Math.cos(alpha * (i + 1)) * this.options.ray,
        Math.sin(alpha * (i + 1)) * this.options.ray
      )

      const index = i * 3 // Because it's triangle : 3 points
      indices.push(index, index + 1, index + 2)
    }

    this.vertices = vertices
    this.indices = indices
  }

  createTriangle() {
    const vertices = new Float32Array(this.vertices)
    const indices = new Uint16Array(this.indices)

    // Create vertex buffer, bind it and add datas
    const vertexBuffer = this.gl.createBuffer()
    this.gl.bindBuffer(this.gl.ARRAY_BUFFER, vertexBuffer)
    this.gl.bufferData(this.gl.ARRAY_BUFFER, vertices, this.gl.STATIC_DRAW)

    const indicesBuffer = this.gl.createBuffer()
    this.gl.bindBuffer(this.gl.ELEMENT_ARRAY_BUFFER, indicesBuffer)
    this.gl.bufferData(
      this.gl.ELEMENT_ARRAY_BUFFER,
      indices,
      this.gl.STATIC_DRAW
    )

    // Get vertPosition attribute location in the array of attributes
    const vertPositionLocation = this.gl.getAttribLocation(
      this.program,
      'vertPosition'
    )

    this.gl.vertexAttribPointer(
      vertPositionLocation, // Attribute position
      2, // Two elements needed because attribute waiting a vec2
      this.gl.FLOAT, // Type of elements
      this.gl.FALSE, // Normalization
      2 * Float32Array.BYTES_PER_ELEMENT, // Size of an individual vertex
      0 // Offset from the beginning of a single vertex to this attribute
    )

    this.gl.enableVertexAttribArray(vertPositionLocation)
  }

  render = () => {
    // This is clearring the background color and reset the COLOR BUFFER BIT
    this.gl.clearColor(0.2, 0.2, 0.2, 1)
    this.gl.clear(this.gl.COLOR_BUFFER_BIT)

    // Draw elements in buffers
    this.gl.drawElements(
      this.gl.TRIANGLES, // Type to draw
      this.indices.length,
      this.gl.UNSIGNED_SHORT,
      0
    )
  }

  reset = () => {
    this.createVertices()
    this.createTriangle()
    this.render()
  }

  createGUI() {
    this.gui = new dat.GUI()

    this.options = {
      aperture: 1,
      triangles: 20,
      ray: 0.5
    }

    this.gui.add(this.options, 'aperture', 0, 1).onChange(this.reset)
    this.gui.add(this.options, 'triangles', 3, 200, 1).onChange(this.reset)
    this.gui.add(this.options, 'ray', 0.2, 0.8).onChange(this.reset)

    document.body.appendChild(this.gui.domElement)
  }
}
