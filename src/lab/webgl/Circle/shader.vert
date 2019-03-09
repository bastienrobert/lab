#ifdef GL_ES
precision mediump float;
#endif

attribute vec2 vertPosition;

void main() {
  gl_Position = vec4(vertPosition, 0., 1.);
}