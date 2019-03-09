// prettier-ignore
const vertices = [
  // x, y, z
  // FRONT
  1.0, 1.0, 1.0,
  -1.0, 1.0, 1.0,
  -1.0, -1.0 ,1.0,
  1.0, -1.0, 1.0,
  // RIGHT
  1.0, 1.0, -1.0,
  1.0, 1.0, 1.0,
  1.0, -1.0, 1.0,
  1.0, -1.0, -1.0,
  // TOP
  1.0, 1.0, -1.0,
  -1.0, 1.0, -1.0,
  -1.0, 1.0, 1.0,
  1.0, 1.0, 1.0,
  // LEFT
  -1.0, 1.0, 1.0,
  -1.0, 1.0, -1.0,
  -1.0, -1.0, -1.0,
  -1.0, -1.0, 1.0,
  // BOTTOM
  1.0, -1.0, 1.0,
  -1.0, -1.0, 1.0,
  -1.0, -1.0, -1.0,
  1.0, -1.0, -1.0,
  // BACK
  -1.0, 1.0, -1.0,
  1.0, 1.0, -1.0,
  1.0, -1.0, -1.0,
  -1.0, -1.0, -1.0
]

// prettier-ignore
const normals = [
  0.0, 0.0, 1.0,
  0.0, 0.0, 1.0,
  0.0, 0.0, 1.0,
  0.0, 0.0, 1.0,

  1.0, 0.0, 0.0,
  1.0, 0.0, 0.0,
  1.0, 0.0, 0.0,
  1.0, 0.0, 0.0,

  0.0, 1.0, 0.0,
  0.0, 1.0, 0.0,
  0.0, 1.0, 0.0,
  0.0, 1.0, 0.0,

  -1.0, 0.0, 0.0,
  -1.0, 0.0, 0.0,
  -1.0, 0.0, 0.0,
  -1.0, 0.0, 0.0,

  0.0, -1.0, 0.0,
  0.0, -1.0, 0.0,
  0.0, -1.0, 0.0,
  0.0, -1.0, 0.0,

  0.0, 0.0, -1.0,
  0.0, 0.0, -1.0,
  0.0, 0.0, -1.0,
  0.0, 0.0, -1.0
]

// prettier-ignore
const textures = [
  1.0, 1.0,
  0.0, 1.0,
  0.0, 0.0,
  1.0, 0.0,

  1.0, 1.0,
  0.0, 1.0,
  0.0, 0.0,
  1.0, 0.0,

  1.0, 1.0,
  0.0, 1.0,
  0.0, 0.0,
  1.0, 0.0,

  1.0, 1.0,
  0.0, 1.0,
  0.0, 0.0,
  1.0, 0.0,

  1.0, 1.0,
  0.0, 1.0,
  0.0, 0.0,
  1.0, 0.0,

  1.0, 1.0,
  0.0, 1.0,
  0.0, 0.0,
  1.0, 0.0
]

// prettier-ignore
const indices = [
  0, 1, 2,
  0, 2, 3,
  4, 5, 6,

  4, 6, 7,
  8, 9, 10,
  8, 10, 11,

  12, 13, 14,
  12, 14, 15,
  16, 17, 18,

  16, 18, 19,
  20, 21, 22,
  20, 22, 23
]

export default {
  vertices,
  normals,
  textures,
  indices
}