import { particlesCursor } from 'https://unpkg.com/threejs-toys@0.0.8/build/threejs-toys.module.cdn.min.js';

// Detect touch devices (phones/tablets)
const isTouch = matchMedia('(hover: none) and (pointer: coarse)').matches;

const pc = particlesCursor({
  el: document.getElementById('particle-animation'),

  // Heavier on desktop, lighter on phones
  gpgpuSize: isTouch ? 384 : 712,

  // Visuals
  colors: [0xf403dc, 0xf403dc, 0xf403dc],
  color: 0xf403dc,

  // Motion / feel (tuned separately for touch)
  coordScale:      isTouch ? 0.6    : 0.9,
  noiseIntensity:  isTouch ? 0.0015 : 0.001,
  noiseTimeCoef:   isTouch ? 0.00025: 0.0001,
  pointSize:       isTouch ? 3      : 5,
  pointDecay: 0.00543424,

  // Keep it awake on phones so it “moves on its own”
  sleepRadiusX:    isTouch ? 0 : 250,
  sleepRadiusY:    isTouch ? 0 : 250,
  sleepTimeCoefX:  isTouch ? 0 : 0.001,
  sleepTimeCoefY:  isTouch ? 0 : 0.002
});

// Click color/feel change (works on both)
const darkPurpleHue = 0.75;     // purple
const darkPurpleSaturation = 0.8;
const darkPurpleLightness = 0.2;

document.body.addEventListener('click', () => {
  if (!pc?.uniforms) return;
  pc.uniforms.uColor.value.setHSL(darkPurpleHue, darkPurpleSaturation, darkPurpleLightness);
  pc.uniforms.uCoordScale.value     = 0.001 + Math.random() * 2;
  pc.uniforms.uNoiseIntensity.value = 0.0001 + Math.random() * 0.001;
  pc.uniforms.uPointSize.value      = 1 + Math.random() * 10;
});

// On touch devices, drift the uniforms a bit so the particles animate
// even without mouse input (subtle, battery-friendly).
if (isTouch && pc?.uniforms) {
  let t = 0;
  const drift = () => {
    t += 0.006; // gentle pace
    pc.uniforms.uCoordScale.value      = 0.6 + 0.2 * Math.sin(t * 1.4);
    pc.uniforms.uNoiseIntensity.value  = 0.0006 + 0.0006 * Math.cos(t * 2.1);
    pc.uniforms.uPointSize.value       = 2 + 1.5 * (1 + Math.sin(t * 1.1));
    requestAnimationFrame(drift);
  };
  drift();
}

// Respect users who prefer reduced motion
if (matchMedia('(prefers-reduced-motion: reduce)').matches && pc?.uniforms) {
  pc.uniforms.uNoiseIntensity.value = 0.0002;
  // You could also skip the drift if desired.
}
