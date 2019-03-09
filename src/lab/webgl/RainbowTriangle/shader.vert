#ifdef GL_ES
precision mediump float;
#endif

attribute vec2 vertPosition;
// Following attribute is needed to add the rainbow inside the triangle
varying vec3 fragColor;

void main() {
  // Color sent to fragment shader
  fragColor = vec3(
    vertPosition.y + 1. / 2.,
    (vertPosition.x + 1. / 2.) - (vertPosition.y + 1. / 2.),
    1. - (vertPosition.x + 1. / 2.) - (vertPosition.y + 1. / 2.)
  );

  gl_Position = vec4(vertPosition, 0., 1.);
}