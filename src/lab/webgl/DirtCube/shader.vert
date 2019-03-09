#ifdef GL_ES
precision mediump float;
#endif

attribute vec3 position;
attribute vec2 texture;
uniform mat4 u_world;
uniform mat4 u_view;
uniform mat4 u_projection;
varying vec2 vTexture;

void main() {
  vTexture = texture;

  gl_Position = u_projection * u_view * u_world * vec4(position, 1.);
}