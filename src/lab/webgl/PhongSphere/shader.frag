#ifdef GL_ES
precision mediump float;
#endif

varying vec3 vNormal;
varying vec3 vPosition;

/* void main() {
  vec3 color = (vNormal * vPosition + 1.) * .5;
  gl_FragColor = vec4(color, 1.);
} */


void main() {
  // Setup
  vec3 light = vec3(0., 2., 0.);
  float shininess = 5.;
  float Ka = .75; // ambient reflection
  float Kd = 1.; // diffuse reflection
  float Ks = .1; // specular reflection
  vec3 ambientColor = vec3(.83, .87, .92);
  vec3 diffuseColor = vec3(.25, .25, .25);
  vec3 specularColor = vec3(1., 1., 1.);

  // Init
  vec3 N = normalize(vNormal);
  vec3 L = normalize(light - vPosition);

  // Lambert's cosine law
  float lambertian = max(dot(N, L), 0.);
  float specular = 0.;

  vec3 R = reflect(-L, N);      // Reflected light vector
  vec3 V = normalize(-vPosition); // Vector to viewer
  // Compute the specular term
  float specAngle = max(dot(R, V), 0.0);
  specular = pow(specAngle, shininess);

  gl_FragColor = vec4(Ka * ambientColor +
    Kd * lambertian * diffuseColor +
    Ks * specular * specularColor, 1.0);
}