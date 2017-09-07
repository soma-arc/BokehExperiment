#version 300 es

precision mediump float;

uniform sampler2D u_accTexture;
uniform vec2 u_resolution;
uniform float u_textureWeight;
uniform float u_numSamples;

vec2 rand2n(const vec2 co, const float sampleIndex) {
    vec2 seed = co * (sampleIndex + 1.0);
    seed+=vec2(-1,1);
    // implementation based on: lumina.sourceforge.net/Tutorials/Noise.html
    return vec2(fract(sin(dot(seed.xy ,vec2(12.9898,78.233))) * 43758.5453),
                fract(cos(dot(seed.xy ,vec2(4.898,7.23))) * 23421.631));
}

vec3 calcRay (const vec3 eye, const vec3 target, const vec3 up, const float fov,
              const vec2 resolution, const vec2 coord) {
    float imagePlane = (resolution.y * .5) / tan(fov * .5);
    vec3 v = normalize(target - eye);
    vec3 xaxis = normalize(cross(v, up));
    vec3 yaxis =  normalize(cross(v, xaxis));
    vec3 center = v * imagePlane;
    vec3 origin = center - (xaxis * (resolution.x  *.5)) - (yaxis * (resolution.y * .5));
    return normalize(origin + (xaxis * coord.x) + (yaxis * (resolution.y - coord.y)));
}

vec3 computeColor(vec3 rayOrigin, vec3 rayDir) {
	return vec3(0);
}

const c_pos = vec3(0, 3, 3);
const c_target = vec3(0);
const c_up = vec3(0, 1, 0);
const c_fov = radians(3.14 / 3);

out vec4 outColor;
void main() {
	vec3 sum = vec3(0);
	vec2 coordOffset = rand2n(gl_FragCoord.xy, u_numSamples);
	vec3 ray = calcRay(c_pos, c_target, c_up, c_fov,
					   u_resolution, gl_FragCoord.xy + coordOffset);
	vec3 texCol = texture(u_accTexture, gl_FragCoord.xy / u_resolution).rgb;
	outColor = vec4(mix(computeColor(c_pos, ray), texCol, u_textureWeight), 1.0);
}
