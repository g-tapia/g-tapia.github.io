import { particlesCursor } from 'https://unpkg.com/threejs-toys@0.0.8/build/threejs-toys.module.cdn.min.js'

const pc = particlesCursor({
  el: document.getElementById('particle-animation'),
  gpgpuSize: 512, // Increased particle density
  colors: [0xf403dc, 0xf403dc, 0xf403dc], // Three similar shades
  color: 0xf403dc, // The exact color you provided  
  coordScale: .9,
  noiseIntensity: 0.001,
  noiseTimeCoef: 0.0001,
  pointSize: 5, // Increased point size
  pointDecay: 0.00543424,
  sleepRadiusX: 250,
  sleepRadiusY: 250,
  sleepTimeCoefX: 0.001,
  sleepTimeCoefY: 0.002
});

const darkPurpleHue = 0.75; // Purple hue
const darkPurpleSaturation = 0.8; // Saturation for a vibrant purple
const darkPurpleLightness = 0.2; // Lightness for a dark shade

document.body.addEventListener('click', () => {
  pc.uniforms.uColor.value.setHSL(darkPurpleHue, darkPurpleSaturation, darkPurpleLightness);
  pc.uniforms.uCoordScale.value = 0.001 + Math.random() * 2
  pc.uniforms.uNoiseIntensity.value = 0.0001 + Math.random() * 0.001
  pc.uniforms.uPointSize.value = 1 + Math.random() * 10
});

// document.body.addEventListener('mousemove', (e) => {
//   pc.uniforms.uColor.value.setHSL(darkPurpleHue, darkPurpleSaturation, darkPurpleLightness);
// });


// transition js

document.addEventListener('DOMContentLoaded', function () {
  const projectsLink = document.querySelector('a[href="/portfolio/projects.html"]');
  const effectContainer = document.getElementById('slash-effect');

  projectsLink.addEventListener('click', function (e) {
    e.preventDefault();
    effectContainer.style.display = 'flex';

    // Trigger the slash opening
    effectContainer.classList.add('active');
    
    // After a timeout, open the portal (the purple aura)
    setTimeout(function () {
      effectContainer.classList.add('zoomed');
    }, 500); // The time it takes for the slash to open up

    // After the portal has fully opened, redirect to the projects page
    setTimeout(function () {
      window.location.href = '/portfolio/projects.html';
    }, 1500); // The time it takes to zoom into the rift
  });
});

