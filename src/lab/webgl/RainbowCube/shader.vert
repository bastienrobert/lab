#ifdef GL_ES
precision mediump float;
#endif

attribute vec3 position;
uniform mat4 u_world;
uniform mat4 u_view;
uniform mat4 u_projection;
varying vec3 vFragColor;

void main() {
  // Color sent to fragment shader
  vFragColor = vec3(
    position.y + 1. / 2.,
    (position.x + 1. / 2.) - (position.y + 1. / 2.),
    1. - (position.x + 1. / 2.) - (position.y + 1. / 2.)
  );

  gl_Position = u_projection * u_view * u_world * vec4(position, 1.);
}