"use client"
import { useEffect, useRef } from 'react';
import * as THREE from 'three';

/**
 * A highly polished, premium abstract 3D background.
 * Creates a flowing, dark "digital sea" of particles that undulates smoothly.
 * Replaces the busy random shapes with elegant, math-driven minimalism.
 */
const ThreeBackground = () => {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x0a0a0a, 0.015);

    const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.set(0, 15, 40);
    camera.lookAt(0, 0, 0);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x0a0a0a, 1); // Deep dark background
    mount.appendChild(renderer.domElement);

    // ─── Particle Wave System ──────────────────────────────────────────
    const GRID_SIZE = 80;
    const SPACING = 1.2;
    const particleCount = GRID_SIZE * GRID_SIZE;
    
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);
    
    const colorBase = new THREE.Color(0x1e1b4b); // Deep indigo base
    const colorHighlight = new THREE.Color(0x8b5cf6); // Violet highlight
    const colorHighlight2 = new THREE.Color(0x06b6d4); // Cyan highlight

    let i = 0;
    for (let x = 0; x < GRID_SIZE; x++) {
      for (let z = 0; z < GRID_SIZE; z++) {
        const px = (x - GRID_SIZE / 2) * SPACING;
        const pz = (z - GRID_SIZE / 2) * SPACING;
        
        positions[i * 3] = px;
        positions[i * 3 + 1] = 0; // Y updated in animate
        positions[i * 3 + 2] = pz;

        // Base color mixed slightly with highlights for variety
        const mixRatio = Math.random();
        const c = colorBase.clone().lerp(
          Math.random() > 0.5 ? colorHighlight : colorHighlight2,
          mixRatio * 0.3
        );
        
        colors[i * 3] = c.r;
        colors[i * 3 + 1] = c.g;
        colors[i * 3 + 2] = c.b;

        i++;
      }
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    // Custom shader material for smooth, glowing particles
    const material = new THREE.PointsMaterial({
      size: 0.15,
      vertexColors: true,
      transparent: true,
      opacity: 0.8,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    const particles = new THREE.Points(geometry, material);
    // Tilt the whole plane slightly
    particles.rotation.x = -Math.PI / 12;
    scene.add(particles);

    // ─── Floating Dust Particles ───────────────────────────────────────
    const dustCount = 400;
    const dustGeo = new THREE.BufferGeometry();
    const dustPos = new Float32Array(dustCount * 3);
    for (let j = 0; j < dustCount; j++) {
      dustPos[j * 3] = (Math.random() - 0.5) * 100;
      dustPos[j * 3 + 1] = Math.random() * 40 - 10;
      dustPos[j * 3 + 2] = (Math.random() - 0.5) * 100;
    }
    dustGeo.setAttribute('position', new THREE.BufferAttribute(dustPos, 3));
    const dustMat = new THREE.PointsMaterial({
      size: 0.08,
      color: 0xffffff,
      transparent: true,
      opacity: 0.15,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    const dust = new THREE.Points(dustGeo, dustMat);
    scene.add(dust);

    // ─── Interaction & Resize ──────────────────────────────────────────
    const mouse = { x: 0, y: 0 };
    let targetCameraX = 0;
    let targetCameraY = 15;

    const handleMouseMove = (e: MouseEvent) => {
      mouse.x = (e.clientX / window.innerWidth - 0.5) * 2;
      mouse.y = (e.clientY / window.innerHeight - 0.5) * 2;
      targetCameraX = mouse.x * 5;
      targetCameraY = 15 - mouse.y * 3;
    };

    const handleScroll = () => {
      const scrollY = window.scrollY;
      // Gently move camera down and forward on scroll
      camera.position.z = 40 - scrollY * 0.01;
      particles.position.y = scrollY * 0.005;
    };

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleResize);

    // ─── Animation Loop ────────────────────────────────────────────────
    let frameId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      frameId = requestAnimationFrame(animate);
      const t = clock.getElapsedTime() * 0.4;

      // Smooth camera interpolation
      camera.position.x += (targetCameraX - camera.position.x) * 0.02;
      camera.position.y += (targetCameraY - camera.position.y) * 0.02;
      camera.lookAt(0, 0, 0);

      // Animate particle wave
      const posAttr = geometry.attributes.position as THREE.BufferAttribute;
      const colAttr = geometry.attributes.color as THREE.BufferAttribute;
      
      let idx = 0;
      for (let x = 0; x < GRID_SIZE; x++) {
        for (let z = 0; z < GRID_SIZE; z++) {
          const px = (x - GRID_SIZE / 2) * SPACING;
          const pz = (z - GRID_SIZE / 2) * SPACING;
          
          // Complex wave equation using combined sines
          const wave1 = Math.sin(px * 0.1 + t) * Math.cos(pz * 0.1 + t) * 3;
          const wave2 = Math.sin(px * 0.05 - t * 0.8) * 2;
          const wave3 = Math.cos(pz * 0.08 + t * 1.2) * 2;
          
          const py = wave1 + wave2 + wave3;
          posAttr.array[idx * 3 + 1] = py;

          // Dynamically adjust color brightness based on wave height
          // Highest points get brighter cyan/violet
          const heightNorm = (py + 7) / 14; // Approximate normalization 0 to 1
          if (heightNorm > 0.6) {
             const h = (heightNorm - 0.6) * 2.5; // Scale up effect
             colAttr.array[idx * 3]     += (colorHighlight2.r - colAttr.array[idx * 3]) * h * 0.05;
             colAttr.array[idx * 3 + 1] += (colorHighlight2.g - colAttr.array[idx * 3 + 1]) * h * 0.05;
             colAttr.array[idx * 3 + 2] += (colorHighlight2.b - colAttr.array[idx * 3 + 2]) * h * 0.05;
          } else {
             // Slowly revert to base color
             colAttr.array[idx * 3]     += (colors[idx * 3] - colAttr.array[idx * 3]) * 0.02;
             colAttr.array[idx * 3 + 1] += (colors[idx * 3 + 1] - colAttr.array[idx * 3 + 1]) * 0.02;
             colAttr.array[idx * 3 + 2] += (colors[idx * 3 + 2] - colAttr.array[idx * 3 + 2]) * 0.02;
          }

          idx++;
        }
      }
      posAttr.needsUpdate = true;
      colAttr.needsUpdate = true;

      // Slowly rotate dust particles
      dust.rotation.y = t * 0.05;

      renderer.render(scene, camera);
    };
    animate();

    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
      renderer.dispose();
      if (mount.contains(renderer.domElement)) {
        mount.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      ref={mountRef}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 0,
        pointerEvents: 'none',
      }}
    />
  );
};

export default ThreeBackground;
