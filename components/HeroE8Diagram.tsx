"use client";

/*
 * E8 Root System — Coxeter Plane (Petrie) Projection
 *
 * Root construction (all roots normalised to length √2):
 *   Type A  ±eᵢ ± eⱼ,  i < j              → C(8,2)·4  = 112 roots
 *   Type B  ½(±1,…,±1), even number of −1s → 2⁷        = 128 roots
 *   Total: 240 roots
 *
 * Adjacency: ⟨α, β⟩ = 1  →  56 neighbours per root  →  6 720 edges total
 *
 * Projection — E8 Coxeter plane, computed numerically:
 *   Simple roots for the Dynkin diagram  α₁–α₃–α₄–α₅–α₆–α₇–α₈, α₂ off α₄:
 *     α₁ = ½( 1,−1,−1,−1,−1,−1,−1, 1)   α₂ = ( 1, 1, 0,…)   α₃ = (−1, 1, 0,…)
 *     α₄ = ( 0,−1, 1, 0,…)  α₅ = (0,0,−1,1,…)  α₆–α₈ similarly
 *   Bipartite Coxeter element  C = s_W · s_B  (W={α₂,α₃,α₅,α₇}, B={α₁,α₄,α₆,α₈})
 *   acts on ℝ⁸ as a rotation of order h = 30 in the Coxeter plane.
 *   The two projection axes u, v are extracted via spectral projection:
 *     u + iv = (1/h) Σₖ e^{−2πik/h} Cᵏ · e₁
 *   The 240 roots then fall on 8 concentric regular 30-gons (Petrie polygon).
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

// ── Coxeter plane: computed from the bipartite Coxeter element of E8 ─────────

function computeCoxeterAxes(): [number[], number[]] {
  const N = 8;
  const eye = (): number[][] =>
    Array.from({ length: N }, (_, i) =>
      Array.from({ length: N }, (_, j) => (i === j ? 1 : 0)));

  const mmul = (A: number[][], B: number[][]): number[][] => {
    const C = Array.from({ length: N }, () => new Array(N).fill(0));
    for (let i = 0; i < N; i++)
      for (let k = 0; k < N; k++)
        if (A[i][k] !== 0)
          for (let j = 0; j < N; j++)
            C[i][j] += A[i][k] * B[k][j];
    return C;
  };

  const mvec = (M: number[][], v: number[]): number[] =>
    M.map(row => row.reduce((s, x, j) => s + x * v[j], 0));

  // s_α = I − α⊗α  (valid when ‖α‖² = 2)
  const refMat = (a: number[]): number[][] => {
    const M = eye();
    for (let i = 0; i < N; i++)
      for (let j = 0; j < N; j++)
        M[i][j] -= a[i] * a[j];
    return M;
  };

  // E8 simple roots (Dynkin: α₁–α₃–α₄–α₅–α₆–α₇–α₈, α₂ branches off α₄)
  const alpha: number[][] = [
    [ .5,-.5,-.5,-.5,-.5,-.5,-.5, .5], // α₁  (B)
    [ 1,  1,  0,  0,  0,  0,  0,  0],  // α₂  (W)
    [-1,  1,  0,  0,  0,  0,  0,  0],  // α₃  (W)
    [ 0, -1,  1,  0,  0,  0,  0,  0],  // α₄  (B)
    [ 0,  0, -1,  1,  0,  0,  0,  0],  // α₅  (W)
    [ 0,  0,  0, -1,  1,  0,  0,  0],  // α₆  (B)
    [ 0,  0,  0,  0, -1,  1,  0,  0],  // α₇  (W)
    [ 0,  0,  0,  0,  0, -1,  1,  0],  // α₈  (B)
  ];

  // Bipartite Coxeter element  C = s_W · s_B
  let sW = eye();
  for (const i of [1, 2, 4, 6]) sW = mmul(refMat(alpha[i]), sW);
  let sB = eye();
  for (const i of [0, 3, 5, 7]) sB = mmul(refMat(alpha[i]), sB);
  const Cmat = mmul(sW, sB);

  // Spectral projection onto the e^{2πi/h} eigenspace:
  //   (u + iv) = Σ_{k=0}^{h-1} e^{−2πik/h} · Cᵏ · v₀
  // Try all 8 basis vectors, keep the one with largest projected norm.
  const h = 30;
  let bestU: number[] = [], bestV: number[] = [], bestNorm = 0;

  for (let b = 0; b < N; b++) {
    const pu = new Array(N).fill(0);
    const pv = new Array(N).fill(0);
    let Ck_v = new Array(N).fill(0);
    Ck_v[b] = 1; // start from basis vector eᵦ

    for (let k = 0; k < h; k++) {
      const angle = (-2 * Math.PI * k) / h;
      const c = Math.cos(angle), s = Math.sin(angle);
      for (let i = 0; i < N; i++) {
        pu[i] += c * Ck_v[i];
        pv[i] += s * Ck_v[i];
      }
      Ck_v = mvec(Cmat, Ck_v);
    }

    const norm = pu.reduce((s, x) => s + x * x, 0);
    if (norm > bestNorm) { bestNorm = norm; bestU = pu; bestV = pv; }
  }

  const nu = Math.sqrt(bestU.reduce((s, x) => s + x * x, 0));
  const nv = Math.sqrt(bestV.reduce((s, x) => s + x * x, 0));
  return [bestU.map(x => x / nu), bestV.map(x => x / nv)];
}

const [PROJ_U, PROJ_V] = computeCoxeterAxes();

function coxeterProject(r: number[]): [number, number] {
  return [
    r.reduce((s, x, k) => s + x * PROJ_U[k], 0),
    r.reduce((s, x, k) => s + x * PROJ_V[k], 0),
  ];
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

  // Parallax + zoom — drifts slower than text, scales into center on scroll
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    let raf = 0;
    const onScroll = () => {
      raf = requestAnimationFrame(() => {
        const s = window.scrollY;
        const ty    = s * 0.4;
        const scale = 1 + s * 0.0005;
        el.style.transform = `translateY(${ty}px) scale(${scale})`;
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => { window.removeEventListener("scroll", onScroll); cancelAnimationFrame(raf); };
  }, []);

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
