"use client"
import { useEffect, useRef } from 'react';
import * as THREE from 'three';

/** 
 * React-inspired 3D Atom — three electron orbital rings (like the React logo),
 * a glowing nucleus cluster, revolving electron particles, and pulsing energy rings.
 * Theme: React / Full Stack Dev / Web Development
 */
interface ReactAtomProps {
  size?: number;
}

const ReactAtom = ({ size = 460 }: ReactAtomProps) => {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const W = size;
    const H = size;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(50, W / H, 0.1, 200);
    camera.position.set(0, 0, 7);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(W, H);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    mount.appendChild(renderer.domElement);

    // ─── Nucleus ────────────────────────────────────────────────────────
    // Core glow sphere
    const coreGeo = new THREE.SphereGeometry(0.38, 32, 32);
    const coreMat = new THREE.MeshStandardMaterial({
      color: 0x61dafb,
      emissive: new THREE.Color(0x61dafb),
      emissiveIntensity: 1.5,
      roughness: 0.1,
      metalness: 0.5,
    });
    const core = new THREE.Mesh(coreGeo, coreMat);
    scene.add(core);

    // Nucleus glow halo (transparent sphere slightly larger)
    const haloGeo = new THREE.SphereGeometry(0.55, 24, 24);
    const haloMat = new THREE.MeshBasicMaterial({
      color: 0x61dafb,
      transparent: true,
      opacity: 0.07,
      side: THREE.BackSide,
    });
    scene.add(new THREE.Mesh(haloGeo, haloMat));

    // ─── Orbital rings (React logo: 3 rings, 120° apart in tilt) ──────
    const ORBITAL_RADIUS = 2.0;
    const orbitalRingData = [
      { tiltX: 0,            tiltZ: 0            }, // horizontal
      { tiltX: Math.PI / 3,  tiltZ: Math.PI / 6  }, // 60° tilt
      { tiltX: -Math.PI / 3, tiltZ: Math.PI / 6  }, // -60° tilt
    ];

    const ringColor = 0x61dafb;
    const ringMeshes: THREE.Mesh[] = [];

    orbitalRingData.forEach(({ tiltX, tiltZ }) => {
      const ringGeo = new THREE.TorusGeometry(ORBITAL_RADIUS, 0.018, 16, 120);
      const ringMat = new THREE.MeshBasicMaterial({
        color: ringColor,
        transparent: true,
        opacity: 0.55,
      });
      const ring = new THREE.Mesh(ringGeo, ringMat);
      ring.rotation.x = tiltX;
      ring.rotation.z = tiltZ;
      scene.add(ring);
      ringMeshes.push(ring);
    });

    // ─── Electrons (one per ring, plus a few bonus) ────────────────────
    interface ElectronData {
      mesh: THREE.Mesh;
      angle: number;
      speed: number;
      radius: number;
      tiltX: number;
      tiltZ: number;
      trail: THREE.Points;
    }

    const electronColor = 0xffffff;
    const electrons: ElectronData[] = [];
    const TRAIL_LENGTH = 30;

    orbitalRingData.forEach(({ tiltX, tiltZ }, i) => {
      const electronGeo = new THREE.SphereGeometry(0.08, 10, 10);
      const electronMat = new THREE.MeshBasicMaterial({
        color: electronColor,
        transparent: true,
        opacity: 0.95,
      });
      const electronMesh = new THREE.Mesh(electronGeo, electronMat);
      scene.add(electronMesh);

      // Trail
      const trailPositions = new Float32Array(TRAIL_LENGTH * 3);
      const trailGeo = new THREE.BufferGeometry();
      trailGeo.setAttribute('position', new THREE.BufferAttribute(trailPositions, 3));
      const trailMat = new THREE.PointsMaterial({
        color: 0x61dafb,
        size: 0.035,
        transparent: true,
        opacity: 0.5,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      });
      const trail = new THREE.Points(trailGeo, trailMat);
      scene.add(trail);

      electrons.push({
        mesh: electronMesh,
        angle: (i * Math.PI * 2) / 3,
        speed: 0.8 + i * 0.15,
        radius: ORBITAL_RADIUS,
        tiltX,
        tiltZ,
        trail,
      });
    });

    // Extra faster outer electron
    const extraGeo = new THREE.SphereGeometry(0.06, 8, 8);
    const extraMat = new THREE.MeshBasicMaterial({ color: 0xa78bfa, transparent: true, opacity: 0.9 });
    const extraMesh = new THREE.Mesh(extraGeo, extraMat);
    scene.add(extraMesh);
    const extraTrailPos = new Float32Array(TRAIL_LENGTH * 3);
    const extraTrailGeo = new THREE.BufferGeometry();
    extraTrailGeo.setAttribute('position', new THREE.BufferAttribute(extraTrailPos, 3));
    const extraTrail = new THREE.Points(extraTrailGeo, new THREE.PointsMaterial({
      color: 0xa78bfa, size: 0.03, transparent: true, opacity: 0.4,
      blending: THREE.AdditiveBlending, depthWrite: false,
    }));
    scene.add(extraTrail);
    electrons.push({
      mesh: extraMesh,
      angle: Math.PI * 0.7,
      speed: 1.4,
      radius: ORBITAL_RADIUS * 1.25,
      tiltX: Math.PI * 0.15,
      tiltZ: -Math.PI * 0.25,
      trail: extraTrail,
    });

    // ─── Ambient energy particles around the atom ──────────────────────
    const ENERGY_COUNT = 200;
    const energyPos = new Float32Array(ENERGY_COUNT * 3);
    const energyCol = new Float32Array(ENERGY_COUNT * 3);
    const energySpeeds: number[] = [];
    const energyAngles: number[] = [];
    const energyRadii: number[] = [];
    const energyHeights: number[] = [];

    const energyPalette = [
      new THREE.Color(0x61dafb),
      new THREE.Color(0xa78bfa),
      new THREE.Color(0x6366f1),
      new THREE.Color(0xffffff),
    ];

    for (let i = 0; i < ENERGY_COUNT; i++) {
      const c = energyPalette[i % energyPalette.length];
      energyCol[i * 3]     = c.r;
      energyCol[i * 3 + 1] = c.g;
      energyCol[i * 3 + 2] = c.b;
      energyAngles.push(Math.random() * Math.PI * 2);
      energyRadii.push(1.5 + Math.random() * 3.0);
      energyHeights.push((Math.random() - 0.5) * 3.5);
      energySpeeds.push((Math.random() - 0.5) * 0.012);
    }

    const energyGeo = new THREE.BufferGeometry();
    energyGeo.setAttribute('position', new THREE.BufferAttribute(energyPos, 3));
    energyGeo.setAttribute('color',    new THREE.BufferAttribute(energyCol, 3));
    const energyMat = new THREE.PointsMaterial({
      size: 0.045,
      vertexColors: true,
      transparent: true,
      opacity: 0.65,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    const energyPoints = new THREE.Points(energyGeo, energyMat);
    scene.add(energyPoints);

    // ─── Pulsing energy shell rings ────────────────────────────────────
    const shellRings: THREE.Mesh[] = [];
    [3.2, 4.0].forEach((r, i) => {
      const sGeo = new THREE.TorusGeometry(r, 0.006, 8, 80);
      const sMat = new THREE.MeshBasicMaterial({
        color: 0x6366f1,
        transparent: true,
        opacity: 0.2 - i * 0.06,
      });
      const sRing = new THREE.Mesh(sGeo, sMat);
      sRing.rotation.x = Math.PI / 4 + i * 0.3;
      scene.add(sRing);
      shellRings.push(sRing);
    });

    // ─── Lighting ──────────────────────────────────────────────────────
    scene.add(new THREE.AmbientLight(0xffffff, 0.3));

    const pl1 = new THREE.PointLight(0x61dafb, 4, 15);
    pl1.position.set(2, 2, 3);
    scene.add(pl1);

    const pl2 = new THREE.PointLight(0x6366f1, 2, 12);
    pl2.position.set(-2, -2, 2);
    scene.add(pl2);

    const pl3 = new THREE.PointLight(0xa78bfa, 1.5, 10);
    pl3.position.set(0, 3, -2);
    scene.add(pl3);

    // ─── Mouse tracking ────────────────────────────────────────────────
    const mouse = { x: 0, y: 0 };
    const handleMouseMove = (e: MouseEvent) => {
      mouse.x = (e.clientX / window.innerWidth  - 0.5) * 2;
      mouse.y = -(e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener('mousemove', handleMouseMove);

    // ─── Trail history ─────────────────────────────────────────────────
    const trailHistory: Array<Array<THREE.Vector3>> = electrons.map(() =>
      Array.from({ length: TRAIL_LENGTH }, () => new THREE.Vector3()),
    );

    // ─── Animation ────────────────────────────────────────────────────
    let frameId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      frameId = requestAnimationFrame(animate);
      const t = clock.getElapsedTime();

      // Scene slowly tilts toward mouse
      scene.rotation.y = mouse.x * 0.3 + t * 0.06;
      scene.rotation.x = mouse.y * 0.2;

      // Core pulse
      const pulse = 1 + Math.sin(t * 2.5) * 0.08;
      core.scale.setScalar(pulse);
      coreMat.emissiveIntensity = 1.2 + Math.sin(t * 2.5) * 0.5;

      // Orbital rings spin gently
      ringMeshes.forEach((ring, i) => {
        ring.rotation.z += 0.003 * (i % 2 === 0 ? 1 : -1);
      });

      // Electrons orbit
      electrons.forEach((el, eIdx) => {
        el.angle += 0.008 * el.speed;
        const a = el.angle;

        // Position on tilted ellipse
        const rawX = el.radius * Math.cos(a);
        const rawZ = el.radius * Math.sin(a);

        // Apply ring tilt (rotate around X then Z)
        const cosX = Math.cos(el.tiltX), sinX = Math.sin(el.tiltX);
        const cosZ = Math.cos(el.tiltZ), sinZ = Math.sin(el.tiltZ);

        const y1 = -rawZ * sinX;
        const z1 =  rawZ * cosX;
        const x2 = rawX * cosZ - y1 * sinZ;
        const y2 = rawX * sinZ + y1 * cosZ;

        el.mesh.position.set(x2, y2, z1);

        // Update trail
        const hist = trailHistory[eIdx];
        hist.unshift(el.mesh.position.clone());
        if (hist.length > TRAIL_LENGTH) hist.pop();

        const posAttr = el.trail.geometry.attributes.position as THREE.BufferAttribute;
        for (let t2 = 0; t2 < TRAIL_LENGTH; t2++) {
          const v = hist[t2] ?? new THREE.Vector3();
          posAttr.array[t2 * 3]     = v.x;
          posAttr.array[t2 * 3 + 1] = v.y;
          posAttr.array[t2 * 3 + 2] = v.z;
        }
        posAttr.needsUpdate = true;
      });

      // Energy particles orbit
      const ePosAttr = energyGeo.attributes.position as THREE.BufferAttribute;
      for (let i = 0; i < ENERGY_COUNT; i++) {
        energyAngles[i] += energySpeeds[i];
        ePosAttr.array[i * 3]     = energyRadii[i] * Math.cos(energyAngles[i]);
        ePosAttr.array[i * 3 + 1] = energyHeights[i] + Math.sin(t * 0.3 + i) * 0.15;
        ePosAttr.array[i * 3 + 2] = energyRadii[i] * Math.sin(energyAngles[i]);
      }
      ePosAttr.needsUpdate = true;
      energyMat.opacity = 0.5 + Math.sin(t * 0.8) * 0.15;

      // Shell ring pulse
      shellRings.forEach((ring, i) => {
        ring.rotation.y = t * (0.12 + i * 0.08);
        ring.rotation.x = t * (0.08 + i * 0.05);
        (ring.material as THREE.MeshBasicMaterial).opacity =
          (0.14 - i * 0.04) + Math.sin(t * 1.5 + i) * 0.06;
      });

      // Lights orbit
      pl1.position.x = Math.sin(t * 0.7) * 3;
      pl1.position.z = Math.cos(t * 0.7) * 3;
      pl2.position.x = Math.cos(t * 0.5) * 3;
      pl2.position.y = Math.sin(t * 0.5) * 2;

      renderer.render(scene, camera);
    };
    animate();

    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener('mousemove', handleMouseMove);
      renderer.dispose();
      if (mount.contains(renderer.domElement)) {
        mount.removeChild(renderer.domElement);
      }
    };
  }, [size]);

  return (
    <div
      ref={mountRef}
      style={{
        width: size,
        height: size,
        flexShrink: 0,
        filter: [
          'drop-shadow(0 0 40px rgba(97,218,251,0.5))',
          'drop-shadow(0 0 80px rgba(99,102,241,0.25))',
          'drop-shadow(0 0 140px rgba(167,139,250,0.12))',
        ].join(' '),
      }}
    />
  );
};

export default ReactAtom;
