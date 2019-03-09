#ifdef GL_ES
precision mediump float;
#endif

varying vec3 vFragColor;

void main() {
  gl_FragColor = vec4(vFragColor, 1.);
}