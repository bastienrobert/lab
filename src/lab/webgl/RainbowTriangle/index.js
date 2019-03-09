import vertexSource from './shader.vert'
import fragmentSource from './shader.frag'

export default class RainbowTriangle {
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
    } catch (e) {
      console.log(e)
    }
  }

  init() {
    // Define default size
    this.canvas.width = 512
    this.canvas.height = 512
    this.gl.viewport(0, 0, this.canvas.width, this.canvas.height)

    // This is clearring the background color and reset the COLOR BUFFER BIT
    this.gl.clearColor(0.2, 0.2, 0.2, 1)
    this.gl.clear(this.gl.COLOR_BUFFER_BIT)

    // Call instance method to create shaders
    this.shaders = this.createShaders()
    if (!this.shaders) return

    // Call instance method to create and link program
    this.program = this.createProgram()
    if (!this.program) return

    // Tell webGL the current program
    this.gl.useProgram(this.program)

    // Create triangle
    this.createTriangle()

    // Render
    this.gl.drawArrays(
      this.gl.TRIANGLES, // Type to draw
      0, // First index to draw in the vertices array
      3 // Number of indexes to draw
    )
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

  createTriangle() {
    const vertices = new Float32Array([
      // X, Y
      0.0,
      0.5,
      -0.5,
      -0.5,
      0.5,
      -0.5
    ])

    // Create vertex buffer, bind it and add datas
    const vertexBuffer = this.gl.createBuffer()
    this.gl.bindBuffer(this.gl.ARRAY_BUFFER, vertexBuffer)
    this.gl.bufferData(this.gl.ARRAY_BUFFER, vertices, this.gl.STATIC_DRAW)

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
}
