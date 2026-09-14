"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { ContactShadows } from "@react-three/drei";
import { useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";
import type { MotionValue } from "motion/react";

/**
 * Tiga volume yang mewakili CONTEXT — FUNCTION — CHARACTER.
 *
 * Saat scroll, satu per satu volume bergeser ke posisinya dan pada akhirnya
 * ketiganya membentuk satu komposisi arsitektur tunggal.
 */

type Volume = {
  /** Posisi akhir setelah menyatu. */
  end: [number, number, number];
  /** Posisi awal, terurai. */
  start: [number, number, number];
  scale: [number, number, number];
  startRotY: number;
  tone: 0 | 1;
};

const VOLUMES: Volume[] = [
  { end: [0, 0.36, 0], start: [-2.6, 0.36, 1.1], scale: [3.4, 0.72, 2.4], startRotY: -0.5, tone: 0 },
  { end: [0.32, 1.14, -0.12], start: [3.0, 1.5, -1.2], scale: [2.6, 0.82, 2.0], startRotY: 0.62, tone: 1 },
  { end: [-0.24, 1.88, 0.16], start: [-1.4, 3.5, 2.2], scale: [1.7, 0.64, 1.5], startRotY: 0.9, tone: 0 },
];

const TMP = new THREE.Vector3();

function easeOut(t: number) {
  return 1 - Math.pow(1 - t, 3);
}

function Volumes({ progress, still }: { progress: MotionValue<number>; still: boolean }) {
  const group = useRef<THREE.Group>(null);
  const meshes = useRef<THREE.Mesh[]>([]);

  const geometry = useMemo(() => new THREE.BoxGeometry(1, 1, 1), []);
  const materials = useMemo(
    () => [
      new THREE.MeshStandardMaterial({ color: "#f2efe9", roughness: 0.92, metalness: 0 }),
      new THREE.MeshStandardMaterial({ color: "#ddd9d0", roughness: 0.9, metalness: 0 }),
    ],
    [],
  );

  useEffect(
    () => () => {
      geometry.dispose();
      materials.forEach((m) => m.dispose());
    },
    [geometry, materials],
  );

  useFrame((_, delta) => {
    const p = still ? 1 : progress.get();
    const k = Math.min(1, delta * 4);

    VOLUMES.forEach((volume, i) => {
      const mesh = meshes.current[i];
      if (!mesh) return;
      // Tiap volume punya jendela scroll sendiri, saling tumpang tindih sedikit.
      const t = easeOut(Math.max(0, Math.min(1, (p - i * 0.22) / 0.46)));
      TMP.set(
        volume.start[0] + (volume.end[0] - volume.start[0]) * t,
        volume.start[1] + (volume.end[1] - volume.start[1]) * t,
        volume.start[2] + (volume.end[2] - volume.start[2]) * t,
      );
      mesh.position.lerp(TMP, k);
      mesh.rotation.y += (volume.startRotY * (1 - t) - mesh.rotation.y) * k;
      // Sedikit mengecil saat terurai, kembali penuh saat menyatu.
      const s = 0.93 + 0.07 * t;
      mesh.scale.set(volume.scale[0] * s, volume.scale[1] * s, volume.scale[2] * s);
    });

    if (group.current) {
      group.current.rotation.y += (-0.34 + p * 0.24 - group.current.rotation.y) * k * 0.6;
    }
  });

  return (
    <group ref={group} position={[0, -1.05, 0]} rotation={[0, -0.34, 0]}>
      {VOLUMES.map((volume, i) => (
        <mesh
          key={i}
          ref={(node) => {
            if (node) meshes.current[i] = node;
          }}
          geometry={geometry}
          material={materials[volume.tone]}
          position={volume.start}
          scale={volume.scale}
          castShadow
          receiveShadow
        />
      ))}
    </group>
  );
}

export default function ConceptVolumes({
  progress,
  still = false,
}: {
  progress: MotionValue<number>;
  still?: boolean;
}) {
  const host = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(true);

  useEffect(() => {
    const node = host.current;
    if (!node) return;
    let onScreen = true;
    let visible = true;
    const sync = () => setActive(onScreen && visible);

    const observer = new IntersectionObserver(
      ([entry]) => {
        onScreen = entry.isIntersecting;
        sync();
      },
      { rootMargin: "100px" },
    );
    observer.observe(node);

    const onVisibility = () => {
      visible = document.visibilityState === "visible";
      sync();
    };
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      observer.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  return (
    <div ref={host} className="h-full w-full">
      <Canvas
        frameloop={active ? "always" : "never"}
        dpr={[1, 1.5]}
        shadows="percentage"
        gl={{ antialias: true, alpha: true }}
        camera={{ position: [3.4, 2.6, 6.4], fov: 34 }}
        style={{ pointerEvents: "none" }}
      >
        <ambientLight intensity={1.3} color="#fbf8f2" />
        <directionalLight
          position={[3.5, 6, 4]}
          intensity={2}
          color="#fffaf0"
          castShadow
          shadow-mapSize={[1024, 1024]}
          shadow-bias={-0.0008}
        />
        <directionalLight position={[-4, 2, -3]} intensity={0.5} color="#e8e6e0" />
        <Volumes progress={progress} still={still} />
        <ContactShadows position={[0, -1.1, 0]} opacity={0.28} scale={12} blur={2.8} far={5} color="#6c685c" />
      </Canvas>
    </div>
  );
}
