#ifdef GL_ES
precision mediump float;
#endif

uniform sampler2D u_sampler;
varying vec2 vTexture;

void main() {
  gl_FragColor = texture2D(u_sampler, vTexture);
}