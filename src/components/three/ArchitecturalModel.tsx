"use client";

import { useFrame } from "@react-three/fiber";
import { useEffect, useMemo, useRef } from "react";
import * as THREE from "three";
import type { MotionValue } from "motion/react";

/**
 * Maket arsitektur abstrak — bukan rumah realistis.
 *
 * Disusun dari primitif: plinth, dua massa utama, satu massa kecil,
 * bidang atap, sirip fasad vertikal, dan satu bingkai struktural.
 * Semua mesh berbagi satu BoxGeometry unit dan tiga material,
 * sehingga jumlah geometri/material tetap minimum.
 */

type Piece = {
  pos: [number, number, number];
  scale: [number, number, number];
  tone: 0 | 1 | 2;
  /** Arah pemisahan saat scroll (garis arsitektur "terurai" sedikit). */
  drift?: [number, number, number];
  /** Plinth berperan sebagai tanah — hanya menerima bayangan, tidak menjatuhkan. */
  noShadow?: boolean;
};

const PLINTH: Piece[] = [{ pos: [0, -0.06, 0], scale: [4.9, 0.12, 3.2], tone: 2, noShadow: true }];

const MASSES: Piece[] = [
  // Massa tinggi (kanan)
  { pos: [1.25, 1.2, 0], scale: [1.9, 2.4, 2.3], tone: 0, drift: [0.16, 0.1, 0] },
  // Massa panjang rendah (kiri)
  { pos: [-0.95, 0.62, 0.15], scale: [2.5, 1.24, 1.9], tone: 1, drift: [-0.18, 0, 0.05] },
  // Massa kecil (ujung kiri)
  { pos: [-2.05, 0.45, 0.75], scale: [1.0, 0.9, 1.3], tone: 0, drift: [-0.26, -0.04, 0.12] },
  // Bidang atap tipis di atas massa panjang
  { pos: [-0.9, 1.29, 0.15], scale: [2.9, 0.07, 2.25], tone: 2, drift: [-0.1, 0.26, 0] },
  // Bidang atap tipis di atas massa tinggi
  { pos: [1.25, 2.44, 0], scale: [2.25, 0.07, 2.6], tone: 2, drift: [0.1, 0.34, 0] },
  // Dinding berdiri bebas
  { pos: [-2.45, 0.55, -0.85], scale: [0.09, 1.1, 1.7], tone: 1, drift: [-0.34, 0, -0.14] },
];

// Sirip fasad vertikal pada massa tinggi
const FINS: Piece[] = Array.from({ length: 5 }, (_, i) => ({
  pos: [0.62 + i * 0.32, 1.2, 1.17] as [number, number, number],
  scale: [0.085, 2.1, 0.18] as [number, number, number],
  tone: 1 as const,
  drift: [0, 0, 0.22] as [number, number, number],
}));

// Bukaan (relung gelap) pada massa panjang
const OPENINGS: Piece[] = [
  { pos: [-1.5, 0.66, 1.07], scale: [0.75, 0.62, 0.06], tone: 2, drift: [-0.16, 0, 0.16] },
  { pos: [-0.5, 0.66, 1.07], scale: [0.45, 0.62, 0.06], tone: 2, drift: [-0.12, 0, 0.16] },
];

// Bingkai struktural berdiri bebas di depan
const FRAME: Piece[] = [
  { pos: [-1.9, 0.95, 1.7], scale: [0.07, 1.9, 0.07], tone: 1, drift: [-0.2, 0, 0.3] },
  { pos: [-0.35, 0.95, 1.7], scale: [0.07, 1.9, 0.07], tone: 1, drift: [-0.05, 0, 0.3] },
  { pos: [-1.125, 1.87, 1.7], scale: [1.62, 0.07, 0.07], tone: 1, drift: [-0.12, 0.1, 0.3] },
];

const PIECES = [...PLINTH, ...MASSES, ...FINS, ...OPENINGS, ...FRAME];

/** Vektor sementara — dipakai ulang tiap frame agar tidak ada alokasi. */
const TMP = new THREE.Vector3();

/**
 * Maket diletakkan ke kanan-bawah dan diperkecil: tipografi tetap dominan,
 * model hanya menempati sisa ruang komposisi.
 */
const BASE = { x: 1.55, y: -0.5, scale: 0.6 };

type Props = {
  /** −1..1, posisi pointer yang sudah dinormalisasi. */
  pointer: React.RefObject<{ x: number; y: number }>;
  /** 0..1 progres scroll hero. */
  progress?: MotionValue<number>;
  /** Matikan seluruh gerak (prefers-reduced-motion). */
  still?: boolean;
};

export function ArchitecturalModel({ pointer, progress, still = false }: Props) {
  const group = useRef<THREE.Group>(null);
  const inner = useRef<THREE.Group>(null);
  const drifters = useRef<THREE.Mesh[]>([]);

  const geometry = useMemo(() => new THREE.BoxGeometry(1, 1, 1), []);

  const materials = useMemo(
    () => [
      new THREE.MeshStandardMaterial({ color: "#f2efe9", roughness: 0.92, metalness: 0 }),
      new THREE.MeshStandardMaterial({ color: "#e3dfd6", roughness: 0.88, metalness: 0 }),
      new THREE.MeshStandardMaterial({ color: "#cdc7bb", roughness: 0.95, metalness: 0 }),
    ],
    [],
  );

  // Geometry & material dibuat manual, jadi dibuang manual saat unmount.
  useEffect(
    () => () => {
      geometry.dispose();
      materials.forEach((m) => m.dispose());
    },
    [geometry, materials],
  );

  useFrame((_, delta) => {
    if (!group.current || !inner.current) return;
    const k = Math.min(1, delta * 3.2); // damping yang stabil di FPS berapa pun

    const p = progress?.get() ?? 0;
    const targetX = still ? 0 : (pointer.current?.y ?? 0) * 0.055; // ±~3°
    const targetY = still ? 0 : (pointer.current?.x ?? 0) * 0.075 + p * 0.22;

    group.current.rotation.x += (targetX - group.current.rotation.x) * k;
    group.current.rotation.y += (targetY - group.current.rotation.y) * k;

    // Saat scroll: model bergeser ke kanan dan sedikit turun,
    // memberi ruang untuk foto portofolio pertama.
    const targetPosX = BASE.x + p * 1.9;
    const targetPosY = BASE.y - p * 0.4;
    inner.current.position.x += (targetPosX - inner.current.position.x) * k;
    inner.current.position.y += (targetPosY - inner.current.position.y) * k;

    // Garis arsitektur terurai sedikit, lalu kembali menyatu.
    const spread = Math.sin(Math.min(p, 1) * Math.PI) * (still ? 0 : 1);
    for (const mesh of drifters.current) {
      if (!mesh?.userData.base) continue;
      const { base, drift } = mesh.userData as { base: THREE.Vector3; drift: THREE.Vector3 };
      TMP.copy(base).addScaledVector(drift, spread);
      mesh.position.lerp(TMP, k);
    }
  });

  return (
    <group ref={group} scale={BASE.scale}>
      <group ref={inner} position={[BASE.x, BASE.y, 0]}>
        {PIECES.map((piece, i) => (
          <mesh
            key={i}
            ref={(node) => {
              if (!node) return;
              node.userData.base = new THREE.Vector3(...piece.pos);
              node.userData.drift = new THREE.Vector3(...(piece.drift ?? [0, 0, 0]));
              drifters.current[i] = node;
            }}
            geometry={geometry}
            material={materials[piece.tone]}
            position={piece.pos}
            scale={piece.scale}
            castShadow={!piece.noShadow}
            receiveShadow
          />
        ))}
      </group>
    </group>
  );
}
