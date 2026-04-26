"use client";

/*
 * E8 Root System — Coxeter Plane (Petrie) Projection
 *
 * Each root vector r = (r₀,…,r₇) ∈ ℝ⁸ maps to 2D via:
 *   x = Σₖ rₖ · cos(kπ/15)
 *   y = Σₖ rₖ · sin(kπ/15)
 *
 * The step angle π/15 = 2π/30 comes from E8's Coxeter number h = 30.
 * Projecting along the first exponent (m = 1) eigenvector of the Coxeter
 * element produces the Gosset 4₂₁ polytope silhouette whose Petrie polygon
 * is a regular 30-gon — the concentric-ring pattern characteristic of E8.
 *
 * Root construction (all roots normalised to length √2):
 *   Type A  ±eᵢ ± eⱼ,  i < j              → C(8,2)·4  = 112 roots
 *   Type B  ½(±1,…,±1), even number of −1s → 2⁷        = 128 roots
 *   Total: 240 roots
 *
 * Adjacency: ⟨α, β⟩ = 1  →  56 neighbours per root  →  6 720 edges total
 */

import { useEffect, useRef } from "react";

// ── E8 data: pure math, SSR-safe ────────────────────────────────────────────

function buildRoots(): { vecs: number[][]; types: number[] } {
  const vecs: number[][] = [];
  const types: number[] = [];

  for (let i = 0; i < 8; i++) {
    for (let j = i + 1; j < 8; j++) {
      for (const si of [1, -1] as const) {
        for (const sj of [1, -1] as const) {
          const r = [0, 0, 0, 0, 0, 0, 0, 0];
          r[i] = si; r[j] = sj;
          vecs.push(r); types.push(0);
        }
      }
    }
  }

  for (let mask = 0; mask < 256; mask++) {
    let neg = 0;
    for (let k = 0; k < 8; k++) if ((mask >> k) & 1) neg++;
    if (neg % 2 === 0) {
      vecs.push(Array.from({ length: 8 }, (_, k) => ((mask >> k) & 1 ? -0.5 : 0.5)));
      types.push(1);
    }
  }

  return { vecs, types };
}

function coxeterProject(r: number[]): [number, number] {
  let x = 0, y = 0;
  for (let k = 0; k < 8; k++) {
    const a = (k * Math.PI) / 15;
    x += r[k] * Math.cos(a);
    y += r[k] * Math.sin(a);
  }
  return [x, y];
}

function buildEdges(vecs: number[][]): [number, number][] {
  const edges: [number, number][] = [];
  const n = vecs.length;
  for (let i = 0; i < n; i++) {
    for (let j = i + 1; j < n; j++) {
      let dot = 0;
      for (let k = 0; k < 8; k++) dot += vecs[i][k] * vecs[j][k];
      if (Math.abs(dot - 1) < 1e-6) edges.push([i, j]);
    }
  }
  return edges;
}

const { vecs: ROOTS, types: TYPES } = buildRoots();
const PROJ   = ROOTS.map(coxeterProject);
const EDGES  = buildEdges(ROOTS);
const MAX_R  = Math.max(...PROJ.map(([x, y]) => Math.sqrt(x * x + y * y)));

// ── Component ────────────────────────────────────────────────────────────────

export default function HeroE8Diagram() {
  const containerRef = useRef<HTMLDivElement>(null);
  const rendererRef  = useRef<any>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let disposed = false;
    let animId = 0;
    let cleanupFns: (() => void)[] = [];

    import("three").then((THREE) => {
      if (disposed) return;

      const w = container.clientWidth  || 480;
      const h = container.clientHeight || 480;
      const SCALE = (Math.min(w, h) * 0.44) / MAX_R;

      const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false });
      renderer.setSize(w, h);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.setClearColor(0xffffff, 1);
      container.appendChild(renderer.domElement);
      rendererRef.current = renderer;

      const scene  = new THREE.Scene();
      const camera = new THREE.OrthographicCamera(
        -w / 2, w / 2, h / 2, -h / 2, -10, 10
      );

      const pivot = new THREE.Object3D();
      scene.add(pivot);

      // Edges
      const edgeBuf = new Float32Array(EDGES.length * 6);
      EDGES.forEach(([i, j], idx) => {
        const [xi, yi] = PROJ[i];
        const [xj, yj] = PROJ[j];
        const b = idx * 6;
        edgeBuf[b]     = xi * SCALE; edgeBuf[b + 1] = yi * SCALE; edgeBuf[b + 2] = 0;
        edgeBuf[b + 3] = xj * SCALE; edgeBuf[b + 4] = yj * SCALE; edgeBuf[b + 5] = 0;
      });
      const edgeGeo = new THREE.BufferGeometry();
      edgeGeo.setAttribute("position", new THREE.BufferAttribute(edgeBuf, 3));
      pivot.add(new THREE.LineSegments(
        edgeGeo,
        new THREE.LineBasicMaterial({ color: 0xd0d0d0, transparent: true, opacity: 0.22 }),
      ));

      // Nodes with ShaderMaterial for per-point breathing
      const n      = ROOTS.length;
      const posBuf = new Float32Array(n * 3);
      const typBuf = new Float32Array(n);
      const offBuf = new Float32Array(n);
      PROJ.forEach(([x, y], i) => {
        posBuf[i * 3]     = x * SCALE;
        posBuf[i * 3 + 1] = y * SCALE;
        posBuf[i * 3 + 2] = 0;
        typBuf[i] = TYPES[i];
        offBuf[i] = (i / n) * Math.PI * 2;
      });

      const nodeGeo = new THREE.BufferGeometry();
      nodeGeo.setAttribute("position", new THREE.BufferAttribute(posBuf, 3));
      nodeGeo.setAttribute("aType",    new THREE.BufferAttribute(typBuf, 1));
      nodeGeo.setAttribute("aOffset",  new THREE.BufferAttribute(offBuf, 1));

      const BASE_SIZE = Math.min(w, h) * 0.018;
      const nodeUniforms = {
        uTime:     { value: 0 },
        uBaseSize: { value: BASE_SIZE },
        uHovered:  { value: 0 },
      };

      const nodeMat = new THREE.ShaderMaterial({
        uniforms: nodeUniforms,
        vertexShader: `
          uniform float uBaseSize;
          uniform float uTime;
          attribute float aType;
          attribute float aOffset;
          varying float vType;
          void main() {
            vType = aType;
            float pulse = 1.0 + 0.08 * sin(uTime * 1.0472 + aOffset);
            float sz = uBaseSize * (aType > 0.5 ? 1.3 : 1.0);
            gl_PointSize = sz * pulse;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
          }
        `,
        fragmentShader: `
          uniform float uHovered;
          varying float vType;
          void main() {
            vec2 uv = gl_PointCoord - 0.5;
            float d = length(uv);
            if (d > 0.5) discard;
            float alpha = 1.0 - smoothstep(0.36, 0.5, d);
            vec3 colA  = vec3(0.039, 0.039, 0.039);
            vec3 colB  = vec3(0.102, 0.420, 1.0);
            vec3 colBH = vec3(0.28,  0.58,  1.0);
            vec3 col = vType > 0.5 ? mix(colB, colBH, uHovered) : colA;
            gl_FragColor = vec4(col, alpha);
          }
        `,
        transparent: true,
        depthTest: false,
      });

      pivot.add(new THREE.Points(nodeGeo, nodeMat));

      // Animation
      let rotAngle = 0;
      let lastTs   = performance.now();
      const startTs = performance.now();
      let hovered  = false;

      const animate = () => {
        if (disposed) return;
        animId = requestAnimationFrame(animate);
        const now = performance.now();
        const dt  = Math.min((now - lastTs) / 1000, 0.05);
        lastTs = now;

        rotAngle += (hovered ? Math.PI / 10 : Math.PI / 20) * dt;
        pivot.rotation.z = rotAngle;

        nodeUniforms.uTime.value = (now - startTs) / 1000;
        nodeUniforms.uHovered.value +=
          ((hovered ? 1 : 0) - nodeUniforms.uHovered.value) * 0.06;

        renderer.render(scene, camera);
      };
      animate();

      // Hover
      const onEnter = () => { hovered = true; };
      const onLeave = () => { hovered = false; };
      container.addEventListener("mouseenter", onEnter);
      container.addEventListener("mouseleave", onLeave);
      cleanupFns.push(() => {
        container.removeEventListener("mouseenter", onEnter);
        container.removeEventListener("mouseleave", onLeave);
      });

      // Resize
      const onResize = () => {
        const nw = container.clientWidth;
        const nh = container.clientHeight;
        renderer.setSize(nw, nh);
        camera.left = -nw / 2; camera.right = nw / 2;
        camera.top  =  nh / 2; camera.bottom = -nh / 2;
        camera.updateProjectionMatrix();
      };
      window.addEventListener("resize", onResize);
      cleanupFns.push(() => window.removeEventListener("resize", onResize));
    });

    return () => {
      disposed = true;
      cancelAnimationFrame(animId);
      cleanupFns.forEach((fn) => fn());
      const r = rendererRef.current;
      if (r) {
        r.dispose();
        if (container.contains(r.domElement)) container.removeChild(r.domElement);
        rendererRef.current = null;
      }
    };
  }, []);

  return (
    <>
      <div
        ref={containerRef}
        className="e8-canvas"
        style={{
          position: "absolute",
          bottom: 0,
          right: 0,
          width: 480,
          height: 480,
          zIndex: 0,
          opacity: 0,
          animation: "e8FadeIn 1.2s ease-out 0.5s forwards",
          pointerEvents: "auto",
        }}
      />
      <style>{`
        @keyframes e8FadeIn { to { opacity: 1; } }
        @media (max-width: 768px) {
          .e8-canvas { width: 280px !important; height: 280px !important; }
        }
      `}</style>
    </>
  );
}
