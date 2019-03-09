export default class SphereGeometry {
  vertices = []
  textures = []
  normals = []
  indices = []
  lines = []

  constructor({ radius = 1, widthSegments = 10, heightSegments = 10 } = {}) {
    this.widthSegments = widthSegments
    this.heightSegments = heightSegments
    this.radius = radius

    this.generate()
  }

  generate() {
    for (let width = 0; width <= this.widthSegments; width++) {
      const theta = (width * Math.PI) / this.widthSegments
      const sinTheta = Math.sin(theta)
      const cosTheta = Math.cos(theta)

      for (let height = 0; height <= this.heightSegments; height++) {
        const phi = (height * 2 * Math.PI) / this.heightSegments
        const sinPhi = Math.sin(phi)
        const cosPhi = Math.cos(phi)

        const x = cosPhi * sinTheta
        const y = cosTheta
        const z = sinPhi * sinTheta
        const u = 1 - height / this.heightSegments
        const v = 1 - width / this.widthSegments

        this.normals.push(x, y, z)
        this.textures.push(u, v)
        this.vertices.push(this.radius * x, this.radius * y, this.radius * z)
      }
    }

    for (let width = 0; width < this.widthSegments; width++) {
      for (let height = 0; height < this.heightSegments; height++) {
        const first = width * (this.heightSegments + 1) + height
        const second = first + this.heightSegments + 1
        this.indices.push(
          second,
          first,
          first + 1,
          second + 1,
          second,
          first + 1
        )
      }
    }
  }
}
