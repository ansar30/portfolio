"use client"
import { useEffect, useRef } from 'react';
import * as THREE from 'three';

/**
 * Rotating 3D globe with glowing latitude/longitude lines and
 * pulsing connection arcs — used in the Contact section header.
 */
const ContactGlobe = () => {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const W = mount.clientWidth  || 300;
    const H = mount.clientHeight || 300;

    const scene  = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, W / H, 0.1, 100);
    camera.position.z = 4.5;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(W, H);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    mount.appendChild(renderer.domElement);

    // ─── Globe sphere (semi-transparent) ─────────────────────────────
    const globeGeo = new THREE.SphereGeometry(1.5, 48, 48);
    const globeMat = new THREE.MeshStandardMaterial({
      color: 0x0a0a2a,
      roughness: 0.5,
      metalness: 0.6,
      transparent: true,
      opacity: 0.85,
    });
    const globe = new THREE.Mesh(globeGeo, globeMat);
    scene.add(globe);

    // ─── Latitude lines ───────────────────────────────────────────────
    const latCount = 10;
    for (let i = 0; i <= latCount; i++) {
      const phi  = (i / latCount) * Math.PI;
      const r    = 1.51 * Math.sin(phi);
      const y    = 1.51 * Math.cos(phi);
      const pts: THREE.Vector3[] = [];
      for (let j = 0; j <= 64; j++) {
        const theta = (j / 64) * Math.PI * 2;
        pts.push(new THREE.Vector3(r * Math.cos(theta), y, r * Math.sin(theta)));
      }
      const geo = new THREE.BufferGeometry().setFromPoints(pts);
      scene.add(new THREE.Line(geo, new THREE.LineBasicMaterial({
        color: 0x6366f1, transparent: true, opacity: 0.18,
      })));
    }

    // ─── Longitude lines ──────────────────────────────────────────────
    const lonCount = 14;
    for (let i = 0; i < lonCount; i++) {
      const theta = (i / lonCount) * Math.PI * 2;
      const pts: THREE.Vector3[] = [];
      for (let j = 0; j <= 64; j++) {
        const phi = (j / 64) * Math.PI;
        pts.push(new THREE.Vector3(
          1.51 * Math.sin(phi) * Math.cos(theta),
          1.51 * Math.cos(phi),
          1.51 * Math.sin(phi) * Math.sin(theta),
        ));
      }
      const geo = new THREE.BufferGeometry().setFromPoints(pts);
      scene.add(new THREE.Line(geo, new THREE.LineBasicMaterial({
        color: 0x6366f1, transparent: true, opacity: 0.12,
      })));
    }

    // ─── Hotspot points (cities) ──────────────────────────────────────
    const hotspots = [
      { lat: 13.08,  lon: 80.27  }, // Chennai
      { lat: 37.77,  lon: -122.4 }, // San Francisco
      { lat: 51.5,   lon: -0.12  }, // London
      { lat: 40.71,  lon: -74.0  }, // New York
      { lat: 35.68,  lon: 139.7  }, // Tokyo
      { lat: -33.87, lon: 151.2  }, // Sydney
    ];

    const latLonToVec = (lat: number, lon: number, r = 1.55) => {
      const phi   = (90 - lat) * (Math.PI / 180);
      const theta = (lon + 180) * (Math.PI / 180);
      return new THREE.Vector3(
        -r * Math.sin(phi) * Math.cos(theta),
         r * Math.cos(phi),
         r * Math.sin(phi) * Math.sin(theta),
      );
    };

    const dotMeshes: THREE.Mesh[] = [];
    hotspots.forEach(({ lat, lon }) => {
      const pos = latLonToVec(lat, lon);
      const dot = new THREE.Mesh(
        new THREE.SphereGeometry(0.045, 8, 8),
        new THREE.MeshBasicMaterial({ color: 0x61dafb, transparent: true, opacity: 0.9 }),
      );
      dot.position.copy(pos);
      scene.add(dot);
      dotMeshes.push(dot);
    });

    // ─── Outer atmosphere glow ────────────────────────────────────────
    const atmoGeo = new THREE.SphereGeometry(1.65, 32, 32);
    const atmoMat = new THREE.MeshBasicMaterial({
      color: 0x6366f1, transparent: true, opacity: 0.06, side: THREE.BackSide,
    });
    scene.add(new THREE.Mesh(atmoGeo, atmoMat));

    // ─── Orbiting ring ────────────────────────────────────────────────
    const ringGeo = new THREE.TorusGeometry(2.0, 0.012, 8, 100);
    const ringMat = new THREE.MeshBasicMaterial({ color: 0x61dafb, transparent: true, opacity: 0.3 });
    const ring    = new THREE.Mesh(ringGeo, ringMat);
    ring.rotation.x = Math.PI / 3;
    scene.add(ring);

    // ─── Ambient particles ────────────────────────────────────────────
    const ptCount = 180;
    const ptPos = new Float32Array(ptCount * 3);
    for (let i = 0; i < ptCount; i++) {
      const phi   = Math.acos(2 * Math.random() - 1);
      const theta = Math.random() * Math.PI * 2;
      const r     = 2.2 + Math.random() * 1.5;
      ptPos[i*3]     = r * Math.sin(phi) * Math.cos(theta);
      ptPos[i*3 + 1] = r * Math.cos(phi);
      ptPos[i*3 + 2] = r * Math.sin(phi) * Math.sin(theta);
    }
    const ptGeo = new THREE.BufferGeometry();
    ptGeo.setAttribute('position', new THREE.BufferAttribute(ptPos, 3));
    scene.add(new THREE.Points(ptGeo, new THREE.PointsMaterial({
      size: 0.04, color: 0x6366f1, transparent: true, opacity: 0.55,
      blending: THREE.AdditiveBlending, depthWrite: false,
    })));

    // ─── Lighting ─────────────────────────────────────────────────────
    scene.add(new THREE.AmbientLight(0xffffff, 0.4));
    const pl1 = new THREE.PointLight(0x6366f1, 3, 15);
    pl1.position.set(3, 3, 3);
    scene.add(pl1);
    const pl2 = new THREE.PointLight(0x61dafb, 1.5, 10);
    pl2.position.set(-3, -1, 2);
    scene.add(pl2);

    // ─── Mouse ────────────────────────────────────────────────────────
    const mouse = { x: 0, y: 0 };
    const onMouse = (e: MouseEvent) => {
      mouse.x = (e.clientX / window.innerWidth  - 0.5) * 2;
      mouse.y = -(e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener('mousemove', onMouse);

    let frameId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      frameId = requestAnimationFrame(animate);
      const t = clock.getElapsedTime();

      globe.rotation.y = t * 0.12 + mouse.x * 0.15;
      globe.rotation.x = mouse.y * 0.08;

      ring.rotation.z = t * 0.4;
      (ring.material as THREE.MeshBasicMaterial).opacity = 0.2 + Math.sin(t * 1.2) * 0.12;

      dotMeshes.forEach((dot, i) => {
        const mat = dot.material as THREE.MeshBasicMaterial;
        mat.opacity = 0.6 + Math.sin(t * 2 + i * 1.2) * 0.4;
        dot.scale.setScalar(1 + Math.sin(t * 2 + i) * 0.2);
      });

      pl1.position.x = Math.sin(t * 0.6) * 4;
      pl1.position.z = Math.cos(t * 0.6) * 4;

      renderer.render(scene, camera);
    };
    animate();

    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener('mousemove', onMouse);
      renderer.dispose();
      if (mount.contains(renderer.domElement)) mount.removeChild(renderer.domElement);
    };
  }, []);

  return (
    <div
      ref={mountRef}
      style={{
        width: '100%',
        maxWidth: 280,
        height: 280,
        margin: '0 auto 24px',
        filter: [
          'drop-shadow(0 0 30px rgba(99,102,241,0.4))',
          'drop-shadow(0 0 60px rgba(97,218,251,0.15))',
        ].join(' '),
      }}
    />
  );
};

export default ContactGlobe;
