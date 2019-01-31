#ifdef GL_ES
precision mediump float;
#endif

varying vec3 vNormal;
varying vec3 vPosition;

void main() {
  vec3 color = (vNormal * vPosition + 1.) * .5;
  gl_FragColor = vec4(color, 1.);
}