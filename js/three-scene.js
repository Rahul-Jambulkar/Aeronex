/* ============================================
   Aeronex - Three.js Space Scene
   Animated star field with nebula effects
   for immersive space background
   ============================================ */

(function () {
  'use strict';

  /* --- Scene setup --- */
  const canvas = document.getElementById('three-canvas');
  if (!canvas) return;

  const scene = new THREE.Scene();

  const camera = new THREE.PerspectiveCamera(
    60,
    window.innerWidth / window.innerHeight,
    0.1,
    2000
  );
  camera.position.z = 500;

  const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    alpha: true,
    antialias: true
  });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

  /* --- Star field --- */
  const STAR_COUNT = 3000;
  const starGeometry = new THREE.BufferGeometry();
  const starPositions = new Float32Array(STAR_COUNT * 3);
  const starSizes = new Float32Array(STAR_COUNT);

  for (let i = 0; i < STAR_COUNT; i++) {
    const i3 = i * 3;
    starPositions[i3] = (Math.random() - 0.5) * 2000;
    starPositions[i3 + 1] = (Math.random() - 0.5) * 2000;
    starPositions[i3 + 2] = (Math.random() - 0.5) * 2000;
    starSizes[i] = Math.random() * 2 + 0.5;
  }

  starGeometry.setAttribute('position', new THREE.BufferAttribute(starPositions, 3));
  starGeometry.setAttribute('size', new THREE.BufferAttribute(starSizes, 1));

  /* Custom shader for stars with twinkle effect */
  const starMaterial = new THREE.ShaderMaterial({
    uniforms: {
      uTime: { value: 0 },
      uColor: { value: new THREE.Color(0.85, 0.85, 1.0) }
    },
    vertexShader: `
      attribute float size;
      uniform float uTime;
      varying float vAlpha;

      void main() {
        vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
        float dist = length(mvPosition.xyz);

        /* Twinkle based on position and time */
        vAlpha = 0.4 + 0.6 * sin(uTime * 0.5 + position.x * 0.01 + position.y * 0.01);

        gl_PointSize = size * (300.0 / dist);
        gl_Position = projectionMatrix * mvPosition;
      }
    `,
    fragmentShader: `
      uniform vec3 uColor;
      varying float vAlpha;

      void main() {
        /* Circular soft point */
        float d = length(gl_PointCoord - vec2(0.5));
        if (d > 0.5) discard;

        float alpha = smoothstep(0.5, 0.1, d) * vAlpha;
        gl_FragColor = vec4(uColor, alpha);
      }
    `,
    transparent: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending
  });

  const stars = new THREE.Points(starGeometry, starMaterial);
  scene.add(stars);

  /* --- Nebula particles (larger, colored, fewer) --- */
  const NEBULA_COUNT = 200;
  const nebulaGeometry = new THREE.BufferGeometry();
  const nebulaPositions = new Float32Array(NEBULA_COUNT * 3);
  const nebulaColors = new Float32Array(NEBULA_COUNT * 3);
  const nebulaSizes = new Float32Array(NEBULA_COUNT);

  const nebulaColorOptions = [
    new THREE.Color(0x6c63ff),  /* Accent purple */
    new THREE.Color(0x00e5ff),  /* Cyan accent */
    new THREE.Color(0x8b5cf6),  /* Violet */
    new THREE.Color(0x3b82f6),  /* Blue */
  ];

  for (let i = 0; i < NEBULA_COUNT; i++) {
    const i3 = i * 3;
    nebulaPositions[i3] = (Math.random() - 0.5) * 1500;
    nebulaPositions[i3 + 1] = (Math.random() - 0.5) * 1500;
    nebulaPositions[i3 + 2] = (Math.random() - 0.5) * 800;

    const color = nebulaColorOptions[Math.floor(Math.random() * nebulaColorOptions.length)];
    nebulaColors[i3] = color.r;
    nebulaColors[i3 + 1] = color.g;
    nebulaColors[i3 + 2] = color.b;

    nebulaSizes[i] = Math.random() * 8 + 4;
  }

  nebulaGeometry.setAttribute('position', new THREE.BufferAttribute(nebulaPositions, 3));
  nebulaGeometry.setAttribute('color', new THREE.BufferAttribute(nebulaColors, 3));
  nebulaGeometry.setAttribute('size', new THREE.BufferAttribute(nebulaSizes, 1));

  const nebulaMaterial = new THREE.ShaderMaterial({
    uniforms: {
      uTime: { value: 0 }
    },
    vertexShader: `
      attribute float size;
      attribute vec3 color;
      uniform float uTime;
      varying vec3 vColor;
      varying float vAlpha;

      void main() {
        vColor = color;
        vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
        float dist = length(mvPosition.xyz);

        vAlpha = 0.15 + 0.1 * sin(uTime * 0.3 + position.x * 0.005);

        gl_PointSize = size * (400.0 / dist);
        gl_Position = projectionMatrix * mvPosition;
      }
    `,
    fragmentShader: `
      varying vec3 vColor;
      varying float vAlpha;

      void main() {
        float d = length(gl_PointCoord - vec2(0.5));
        if (d > 0.5) discard;

        float alpha = smoothstep(0.5, 0.0, d) * vAlpha;
        gl_FragColor = vec4(vColor, alpha);
      }
    `,
    transparent: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
    vertexColors: true
  });

  const nebula = new THREE.Points(nebulaGeometry, nebulaMaterial);
  scene.add(nebula);

  /* --- Mouse interaction (subtle camera shift) --- */
  let mouseX = 0;
  let mouseY = 0;
  let targetX = 0;
  let targetY = 0;

  document.addEventListener('mousemove', (e) => {
    mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
    mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
  });

  /* --- Handle resize --- */
  window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  });

  /* --- Scroll-based depth effect --- */
  let scrollY = 0;
  window.addEventListener('scroll', () => {
    scrollY = window.scrollY;
  }, { passive: true });

  /* --- Animation loop --- */
  const clock = new THREE.Clock();

  function animate() {
    requestAnimationFrame(animate);

    const elapsed = clock.getElapsedTime();

    /* Update shader uniforms */
    starMaterial.uniforms.uTime.value = elapsed;
    nebulaMaterial.uniforms.uTime.value = elapsed;

    /* Slow rotation of star field */
    stars.rotation.y = elapsed * 0.015;
    stars.rotation.x = elapsed * 0.008;

    /* Nebula drifts slightly differently */
    nebula.rotation.y = elapsed * 0.01;
    nebula.rotation.z = elapsed * 0.005;

    /* Smooth camera follow mouse */
    targetX += (mouseX * 30 - targetX) * 0.02;
    targetY += (-mouseY * 20 - targetY) * 0.02;
    camera.position.x = targetX;
    camera.position.y = targetY;

    /* Scroll-based depth */
    camera.position.z = 500 - scrollY * 0.15;

    camera.lookAt(scene.position);
    renderer.render(scene, camera);
  }

  animate();

})();
