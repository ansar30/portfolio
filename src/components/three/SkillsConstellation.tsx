"use client"
import { useEffect, useRef } from 'react';
import * as THREE from 'three';

/**
 * A small Three.js canvas showing skill labels as 3D floating text nodes
 * connected by glowing lines — used in the Skills section header area.
 */
const SkillsConstellation = () => {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const W = mount.clientWidth  || 600;
    const H = mount.clientHeight || 280;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, W / H, 0.1, 200);
    camera.position.z = 30;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(W, H);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    mount.appendChild(renderer.domElement);

    const NODE_COUNT = 28;
    const nodePositions: THREE.Vector3[] = [];
    const nodeMeshes: THREE.Mesh[] = [];
    const nodeSpeeds: THREE.Vector3[] = [];

    const colors = [0x6366f1, 0x8b5cf6, 0x06b6d4, 0x3b82f6, 0xa78bfa];

    // Create nodes (small glowing spheres)
    for (let i = 0; i < NODE_COUNT; i++) {
      const pos = new THREE.Vector3(
        (Math.random() - 0.5) * 50,
        (Math.random() - 0.5) * 20,
        (Math.random() - 0.5) * 15,
      );
      nodePositions.push(pos);

      const speed = new THREE.Vector3(
        (Math.random() - 0.5) * 0.025,
        (Math.random() - 0.5) * 0.018,
        (Math.random() - 0.5) * 0.01,
      );
      nodeSpeeds.push(speed);

      const geo = new THREE.SphereGeometry(Math.random() * 0.35 + 0.2, 8, 8);
      const mat = new THREE.MeshBasicMaterial({
        color: colors[i % colors.length],
        transparent: true,
        opacity: 0.8,
      });
      const mesh = new THREE.Mesh(geo, mat);
      mesh.position.copy(pos);
      scene.add(mesh);
      nodeMeshes.push(mesh);
    }

    // Connection lines (LineSegments updated each frame)
    const MAX_DIST = 16;
    const linePositions: number[] = [];
    // pre-allocate max possible lines
    const maxLines = NODE_COUNT * (NODE_COUNT - 1) / 2;
    const linePosArr = new Float32Array(maxLines * 6);
    const lineColArr  = new Float32Array(maxLines * 6);

    const lineGeo = new THREE.BufferGeometry();
    lineGeo.setAttribute('position', new THREE.BufferAttribute(linePosArr, 3));
    lineGeo.setAttribute('color',    new THREE.BufferAttribute(lineColArr, 3));

    const lineMat = new THREE.LineBasicMaterial({
      vertexColors: true,
      transparent: true,
      opacity: 0.5,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    const lineSegs = new THREE.LineSegments(lineGeo, lineMat);
    scene.add(lineSegs);

    // Glow particles background
    const glowCount = 120;
    const glowPos = new Float32Array(glowCount * 3);
    for (let i = 0; i < glowCount; i++) {
      glowPos[i * 3]     = (Math.random() - 0.5) * 60;
      glowPos[i * 3 + 1] = (Math.random() - 0.5) * 25;
      glowPos[i * 3 + 2] = (Math.random() - 0.5) * 20 - 5;
    }
    const glowGeo = new THREE.BufferGeometry();
    glowGeo.setAttribute('position', new THREE.BufferAttribute(glowPos, 3));
    const glowMat = new THREE.PointsMaterial({
      size: 0.3,
      color: 0x6366f1,
      transparent: true,
      opacity: 0.4,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    scene.add(new THREE.Points(glowGeo, glowMat));

    // Mouse
    const mouse = { x: 0, y: 0 };
    const handleMouse = (e: MouseEvent) => {
      const rect = mount.getBoundingClientRect();
      mouse.x = ((e.clientX - rect.left) / W - 0.5) * 2;
      mouse.y = -((e.clientY - rect.top)  / H - 0.5) * 2;
    };
    window.addEventListener('mousemove', handleMouse);

    // Resize
    const handleResize = () => {
      const nW = mount.clientWidth;
      const nH = mount.clientHeight;
      camera.aspect = nW / nH;
      camera.updateProjectionMatrix();
      renderer.setSize(nW, nH);
    };
    window.addEventListener('resize', handleResize);

    let frameId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      frameId = requestAnimationFrame(animate);
      const t = clock.getElapsedTime();

      // Move nodes
      for (let i = 0; i < NODE_COUNT; i++) {
        nodePositions[i].add(nodeSpeeds[i]);
        // Bounce off walls
        if (Math.abs(nodePositions[i].x) > 26) nodeSpeeds[i].x *= -1;
        if (Math.abs(nodePositions[i].y) > 11) nodeSpeeds[i].y *= -1;
        if (Math.abs(nodePositions[i].z) > 9)  nodeSpeeds[i].z *= -1;

        nodeMeshes[i].position.copy(nodePositions[i]);
        const mat = nodeMeshes[i].material as THREE.MeshBasicMaterial;
        mat.opacity = 0.5 + Math.sin(t * 1.5 + i) * 0.3;
      }

      // Update lines
      let lineIdx = 0;
      const posAttr = lineGeo.attributes.position as THREE.BufferAttribute;
      const colAttr  = lineGeo.attributes.color    as THREE.BufferAttribute;

      for (let i = 0; i < NODE_COUNT; i++) {
        for (let j = i + 1; j < NODE_COUNT; j++) {
          const dist = nodePositions[i].distanceTo(nodePositions[j]);
          if (dist < MAX_DIST && lineIdx < maxLines) {
            const alpha = 1 - dist / MAX_DIST;
            const c = new THREE.Color(colors[(i + j) % colors.length]);
            const base = lineIdx * 6;

            posAttr.array[base]     = nodePositions[i].x;
            posAttr.array[base + 1] = nodePositions[i].y;
            posAttr.array[base + 2] = nodePositions[i].z;
            posAttr.array[base + 3] = nodePositions[j].x;
            posAttr.array[base + 4] = nodePositions[j].y;
            posAttr.array[base + 5] = nodePositions[j].z;

            colAttr.array[base]     = c.r * alpha;
            colAttr.array[base + 1] = c.g * alpha;
            colAttr.array[base + 2] = c.b * alpha;
            colAttr.array[base + 3] = c.r * alpha;
            colAttr.array[base + 4] = c.g * alpha;
            colAttr.array[base + 5] = c.b * alpha;

            lineIdx++;
          }
        }
      }

      // Zero out remaining slots
      for (let k = lineIdx; k < maxLines; k++) {
        const base = k * 6;
        for (let m = 0; m < 6; m++) {
          posAttr.array[base + m] = 0;
          colAttr.array[base + m] = 0;
        }
      }

      lineGeo.setDrawRange(0, lineIdx * 2);
      posAttr.needsUpdate = true;
      colAttr.needsUpdate  = true;

      // Gentle camera pan
      camera.position.x += (mouse.x * 6 - camera.position.x) * 0.04;
      camera.position.y += (mouse.y * 3 - camera.position.y) * 0.04;

      renderer.render(scene, camera);
    };
    animate();

    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener('mousemove', handleMouse);
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
        width: '100%',
        height: 220,
        borderRadius: 24,
        overflow: 'hidden',
        marginBottom: 32,
        background: 'rgba(99,102,241,0.03)',
        border: '1px solid rgba(99,102,241,0.12)',
      }}
    />
  );
};

export default SkillsConstellation;
