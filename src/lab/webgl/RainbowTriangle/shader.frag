#ifdef GL_ES
precision mediump float;
#endif

varying vec3 fragColor;

void main() {
  gl_FragColor = vec4(fragColor, 1.);
}