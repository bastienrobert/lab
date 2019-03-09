#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
varying vec3 vColor;

void main() {
  vec2 st = gl_FragCoord.xy / u_resolution.xy;
  st.x *= u_resolution.x / u_resolution.y;

  gl_FragColor = vec4(st, 1., 1.0);
}