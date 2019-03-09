#ifdef GL_ES
precision mediump float;
#endif

attribute vec3 position;
attribute vec3 normal;
uniform float u_time;
uniform mat4 u_world;
uniform mat4 u_view;
uniform mat4 u_projection;
varying vec3 vPosition;
varying vec3 vNormal;

void main() {
  vNormal = normal;
  vPosition = position;

  gl_Position = u_projection * u_view * u_world * vec4(position.x * (sin(u_time / 1000.) + 1.) / 2., position.y * (cos(u_time / 1000.) + 1.) / 2., position.z, 1.);
}