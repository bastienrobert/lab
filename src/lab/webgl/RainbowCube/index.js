import { mat4 } from 'gl-matrix'
import CubeGeometry from './CubeGeometry'

import vertexSource from './shader.vert'
import fragmentSource from './shader.frag'

export default class RainbowCube {
  constructor() {
    this.canvas = document.createElement('canvas')
    document.body.appendChild(this.canvas)
    this.gl =
      this.canvas.getContext('webgl') ||
      this.canvas.getContext('experimental-webgl')

    this.gl ? this.init() : console.log("WebGL isn't supported")
  }

  componentWillUnmount() {
    window.cancelAnimationFrame(this.raf)
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

    this.gl.enable(this.gl.DEPTH_TEST) // Enable depth feature
    this.gl.enable(this.gl.CULL_FACE) // Enable face computing feature
    this.gl.cullFace(this.gl.BACK) // Only the back face is computed

    // Call instance method to create shaders
    this.shaders = this.createShaders()
    if (!this.shaders) return

    // Call instance method to create and link program
    this.program = this.createProgram()
    if (!this.program) return

    // Tell webGL the current program
    this.gl.useProgram(this.program)

    // Create box
    this.createBox()

    // Create uniforms
    this.createUniforms()

    // Create some values for animation
    this.angle = 0
    this.identityMatrix = mat4.create()
    this.xRotation = mat4.create()
    this.zRotation = mat4.create()

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

  createBox() {
    const { vertices, indices } = CubeGeometry

    // Create vertex buffer, bind it and add datas
    const vertexBuffer = this.gl.createBuffer()
    this.gl.bindBuffer(this.gl.ARRAY_BUFFER, vertexBuffer)
    this.gl.bufferData(
      this.gl.ARRAY_BUFFER,
      new Float32Array(vertices),
      this.gl.STATIC_DRAW
    )

    // Create indices buffer, bind it and add datas
    const indicesBuffer = this.gl.createBuffer()
    this.gl.bindBuffer(this.gl.ELEMENT_ARRAY_BUFFER, indicesBuffer)
    this.gl.bufferData(
      this.gl.ELEMENT_ARRAY_BUFFER,
      new Uint16Array(indices),
      this.gl.STATIC_DRAW
    )

    // Get vertPosition attribute location in the array of attributes
    const positionLocation = this.gl.getAttribLocation(this.program, 'position')

    this.gl.vertexAttribPointer(
      positionLocation, // Attribute position
      3, // Two elements needed because attribute waiting a vec2
      this.gl.FLOAT, // Type of elements
      this.gl.FALSE, // Normalization
      3 * Float32Array.BYTES_PER_ELEMENT, // Size of an individual vertex
      0 // Offset from the beginning of a single vertex to this attribute
    )

    this.gl.enableVertexAttribArray(positionLocation)
  }

  createUniforms() {
    // Get uniforms index in the array of uniforms
    this.worldUniformLocation = this.gl.getUniformLocation(
      this.program,
      'u_world'
    )
    this.viewUniformLocation = this.gl.getUniformLocation(
      this.program,
      'u_view'
    )
    this.projectionUniformLocation = this.gl.getUniformLocation(
      this.program,
      'u_projection'
    )

    // Create new Matrix
    this.worldMatrix = mat4.create()
    this.viewMatrix = mat4.create()
    this.projectionMatrix = mat4.create()

    // Camera lookAt and options
    mat4.lookAt(
      this.viewMatrix,
      [0, 0, -6], // Camera position
      [0, 0, 0], // Point where looking at
      [0, 1, 0] // Pointing up
    )
    mat4.perspective(
      this.projectionMatrix,
      Math.PI / 4, // Vertical field of view in radians: 45deg
      this.canvas.width / this.canvas.height, // Aspect ratio
      0.1, // Near
      1000 // Far
    )

    // Send uniforms to shaders
    this.gl.uniformMatrix4fv(
      this.worldUniformLocation,
      this.gl.FALSE,
      this.worldMatrix
    )
    this.gl.uniformMatrix4fv(
      this.viewUniformLocation,
      this.gl.FALSE,
      this.viewMatrix
    )
    this.gl.uniformMatrix4fv(
      this.projectionUniformLocation,
      this.gl.FALSE,
      this.projectionMatrix
    )
  }

  render = () => {
    this.raf = window.requestAnimationFrame(this.render)

    this.angle += 0.01
    mat4.rotate(this.xRotation, this.identityMatrix, this.angle, [0, 1, 0])
    mat4.rotate(this.zRotation, this.identityMatrix, this.angle / 2, [1, 0, 0])
    mat4.multiply(this.worldMatrix, this.zRotation, this.xRotation)
    this.gl.uniformMatrix4fv(
      this.worldUniformLocation,
      this.gl.FALSE,
      this.worldMatrix
    )

    // This is clearring the background color and reset the COLOR BUFFER BIT
    this.gl.clearColor(0.2, 0.2, 0.2, 1)
    this.gl.clear(this.gl.COLOR_BUFFER_BIT)

    this.gl.drawElements(
      this.gl.TRIANGLES, // Type to draw
      CubeGeometry.indices.length,
      this.gl.UNSIGNED_SHORT,
      0
    )
  }
}
