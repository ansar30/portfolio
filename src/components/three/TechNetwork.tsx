"use client"
import { useEffect, useRef } from 'react';
import * as THREE from 'three';

/**
 * Floating 3D tech-stack nodes with glowing connection lines —
 * used as an immersive accent inside the Experience section.
 * Nodes label tech keywords (React, Node.js, AWS, etc.)
 */
const TechNetwork = () => {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const W = mount.clientWidth  || 700;
    const H = mount.clientHeight || 260;

    const scene  = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(55, W / H, 0.1, 300);
    camera.position.z = 28;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(W, H);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    mount.appendChild(renderer.domElement);

    // ─── Node definitions ─────────────────────────────────────────────
    const TECH_COLORS: Record<string, number> = {
      React:    0x61dafb,
      'Node.js':0x6cc24a,
      AWS:      0xff9900,
      'Next.js':0xffffff,
      NestJS:   0xe0234e,
      MongoDB:  0x47a248,
      TypeScript: 0x3178c6,
      Python:   0xffd43b,
      GenAI:    0xa78bfa,
      Lambda:   0xff9900,
      Bedrock:  0x6366f1,
      RAG:      0x06b6d4,
    };
    const labels = Object.keys(TECH_COLORS);

    interface NodeData {
      pos: THREE.Vector3;
      vel: THREE.Vector3;
      mesh: THREE.Mesh;
    }
    const nodes: NodeData[] = [];

    labels.forEach((label, i) => {
      const theta = (i / labels.length) * Math.PI * 2;
      const radius = 9 + (i % 3) * 2.5;
      const pos = new THREE.Vector3(
        radius * Math.cos(theta),
        (Math.random() - 0.5) * 8,
        (Math.random() - 0.5) * 8,
      );
      const vel = new THREE.Vector3(
        (Math.random() - 0.5) * 0.015,
        (Math.random() - 0.5) * 0.012,
        (Math.random() - 0.5) * 0.008,
      );

      const sz = 0.25 + Math.random() * 0.2;
      const geo = new THREE.SphereGeometry(sz, 12, 12);
      const mat = new THREE.MeshStandardMaterial({
        color: TECH_COLORS[label],
        emissive: new THREE.Color(TECH_COLORS[label]),
        emissiveIntensity: 0.8,
        roughness: 0.3,
        metalness: 0.6,
      });
      const mesh = new THREE.Mesh(geo, mat);
      mesh.position.copy(pos);
      scene.add(mesh);
      nodes.push({ pos, vel, mesh });
    });

    // ─── Edge lines ───────────────────────────────────────────────────
    const MAX_DIST = 14;
    const N = labels.length;
    const maxEdges = (N * (N - 1)) / 2;
    const edgePosArr = new Float32Array(maxEdges * 6);
    const edgeColArr = new Float32Array(maxEdges * 6);

    const edgeGeo = new THREE.BufferGeometry();
    edgeGeo.setAttribute('position', new THREE.BufferAttribute(edgePosArr, 3));
    edgeGeo.setAttribute('color',    new THREE.BufferAttribute(edgeColArr, 3));

    const edgeMat = new THREE.LineBasicMaterial({
      vertexColors: true,
      transparent: true,
      opacity: 0.5,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    const edges = new THREE.LineSegments(edgeGeo, edgeMat);
    scene.add(edges);

    // ─── Background particles ─────────────────────────────────────────
    const bgCount = 160;
    const bgPos = new Float32Array(bgCount * 3);
    for (let i = 0; i < bgCount; i++) {
      bgPos[i * 3]     = (Math.random() - 0.5) * 60;
      bgPos[i * 3 + 1] = (Math.random() - 0.5) * 30;
      bgPos[i * 3 + 2] = (Math.random() - 0.5) * 20 - 5;
    }
    const bgGeo = new THREE.BufferGeometry();
    bgGeo.setAttribute('position', new THREE.BufferAttribute(bgPos, 3));
    scene.add(new THREE.Points(bgGeo, new THREE.PointsMaterial({
      size: 0.2, color: 0x6366f1, transparent: true, opacity: 0.35,
      blending: THREE.AdditiveBlending, depthWrite: false,
    })));

    // ─── Lighting ─────────────────────────────────────────────────────
    scene.add(new THREE.AmbientLight(0xffffff, 0.6));
    const pl = new THREE.PointLight(0x6366f1, 2, 40);
    pl.position.set(0, 5, 10);
    scene.add(pl);

    // ─── Mouse ────────────────────────────────────────────────────────
    const mouse = { x: 0, y: 0 };
    const onMouse = (e: MouseEvent) => {
      const rect = mount.getBoundingClientRect();
      mouse.x = ((e.clientX - rect.left) / W - 0.5) * 2;
      mouse.y = -((e.clientY - rect.top)  / H - 0.5) * 2;
    };
    window.addEventListener('mousemove', onMouse);

    // Resize
    const onResize = () => {
      const nW = mount.clientWidth;
      const nH = mount.clientHeight;
      camera.aspect = nW / nH;
      camera.updateProjectionMatrix();
      renderer.setSize(nW, nH);
    };
    window.addEventListener('resize', onResize);

    let frameId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      frameId = requestAnimationFrame(animate);
      const t = clock.getElapsedTime();

      // Move nodes
      nodes.forEach(({ pos, vel, mesh }, i) => {
        pos.add(vel);
        if (Math.abs(pos.x) > 13) vel.x *= -1;
        if (Math.abs(pos.y) > 6)  vel.y *= -1;
        if (Math.abs(pos.z) > 5)  vel.z *= -1;
        mesh.position.copy(pos);
        // Pulse glow
        const mat = mesh.material as THREE.MeshStandardMaterial;
        mat.emissiveIntensity = 0.6 + Math.sin(t * 1.8 + i * 0.7) * 0.4;
      });

      // Rebuild edges
      let eIdx = 0;
      const pa = edgeGeo.attributes.position as THREE.BufferAttribute;
      const ca = edgeGeo.attributes.color    as THREE.BufferAttribute;
      for (let i = 0; i < N; i++) {
        for (let j = i + 1; j < N; j++) {
          if (eIdx >= maxEdges) break;
          const d = nodes[i].pos.distanceTo(nodes[j].pos);
          if (d < MAX_DIST) {
            const alpha = (1 - d / MAX_DIST);
            const c1 = new THREE.Color(TECH_COLORS[labels[i]]);
            const c2 = new THREE.Color(TECH_COLORS[labels[j]]);
            const b  = eIdx * 6;
            pa.array[b]     = nodes[i].pos.x; pa.array[b+1] = nodes[i].pos.y; pa.array[b+2] = nodes[i].pos.z;
            pa.array[b+3]   = nodes[j].pos.x; pa.array[b+4] = nodes[j].pos.y; pa.array[b+5] = nodes[j].pos.z;
            ca.array[b]     = c1.r*alpha; ca.array[b+1] = c1.g*alpha; ca.array[b+2] = c1.b*alpha;
            ca.array[b+3]   = c2.r*alpha; ca.array[b+4] = c2.g*alpha; ca.array[b+5] = c2.b*alpha;
            eIdx++;
          }
        }
      }
      for (let k = eIdx; k < maxEdges; k++) {
        const b = k * 6;
        for (let m = 0; m < 6; m++) { pa.array[b+m] = 0; ca.array[b+m] = 0; }
      }
      edgeGeo.setDrawRange(0, eIdx * 2);
      pa.needsUpdate = true;
      ca.needsUpdate = true;

      // Camera tilt
      camera.position.x += (mouse.x * 5 - camera.position.x) * 0.04;
      camera.position.y += (mouse.y * 3 - camera.position.y) * 0.04;
      camera.lookAt(0, 0, 0);

      renderer.render(scene, camera);
    };
    animate();

    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener('mousemove', onMouse);
      window.removeEventListener('resize', onResize);
      renderer.dispose();
      if (mount.contains(renderer.domElement)) mount.removeChild(renderer.domElement);
    };
  }, []);

  return (
    <div
      ref={mountRef}
      style={{
        width: '100%',
        height: 200,
        borderRadius: 20,
        overflow: 'hidden',
        marginBottom: 32,
        background: 'rgba(99,102,241,0.02)',
        border: '1px solid rgba(99,102,241,0.1)',
      }}
    />
  );
};

export default TechNetwork;
