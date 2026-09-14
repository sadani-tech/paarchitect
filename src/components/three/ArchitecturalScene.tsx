"use client";

import { Canvas, useThree } from "@react-three/fiber";
import { ContactShadows } from "@react-three/drei";
import { useEffect, useRef, useState } from "react";
import type { MotionValue } from "motion/react";
import { ArchitecturalModel } from "./ArchitecturalModel";

/**
 * Menjaga maket tetap utuh di dalam bingkai: makin sempit viewport,
 * makin jauh kamera mundur. Tidak ada state React yang ikut berubah.
 */
function FrameFit() {
  const camera = useThree((state) => state.camera);
  const size = useThree((state) => state.size);

  useEffect(() => {
    const aspect = size.width / Math.max(size.height, 1);
    const distance = aspect >= 1.5 ? 9.2 : aspect >= 1.1 ? 11.4 : 14;
    camera.position.set(0.9, aspect >= 1.1 ? 2.2 : 2.6, distance);
    camera.updateProjectionMatrix();
  }, [camera, size]);

  return null;
}

type Props = {
  progress?: MotionValue<number>;
  /** "full" → desktop, "reduced" → tablet (bayangan lebih murah, DPR lebih rendah). */
  quality: "full" | "reduced";
  still?: boolean;
  onReady?: () => void;
};

/**
 * Canvas WebGL untuk hero.
 *
 * Rendering dihentikan total ketika canvas keluar viewport atau tab
 * disembunyikan — tidak ada requestAnimationFrame yang berjalan sia-sia.
 */
export default function ArchitecturalScene({ progress, quality, still = false, onReady }: Props) {
  const host = useRef<HTMLDivElement>(null);
  const pointer = useRef({ x: 0, y: 0 });
  const [active, setActive] = useState(true);

  // Pointer dibaca pada level DOM, bukan lewat state React,
  // supaya tidak memicu render ulang saat kursor bergerak.
  useEffect(() => {
    if (still) return;
    const onMove = (event: PointerEvent) => {
      if (event.pointerType !== "mouse") return;
      pointer.current.x = (event.clientX / window.innerWidth) * 2 - 1;
      pointer.current.y = (event.clientY / window.innerHeight) * 2 - 1;
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, [still]);

  useEffect(() => {
    const node = host.current;
    if (!node) return;

    let visible = true;
    let onScreen = true;
    const sync = () => setActive(visible && onScreen);

    const observer = new IntersectionObserver(
      ([entry]) => {
        onScreen = entry.isIntersecting;
        sync();
      },
      { rootMargin: "120px" },
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

  const full = quality === "full";

  return (
    <div ref={host} className="h-full w-full">
      <Canvas
        frameloop={active ? "always" : "never"}
        dpr={full ? [1, 1.5] : [1, 1.25]}
        shadows={full ? "percentage" : false}
        gl={{ antialias: full, powerPreference: "high-performance", alpha: true }}
        camera={{ position: [0.9, 2.2, 9.2], fov: 30 }}
        onCreated={onReady}
        style={{ pointerEvents: "none" }}
      >
        {/* Pencahayaan studio maket: satu key light lembut, satu fill, satu ambient. */}
        <ambientLight intensity={0.85} color="#f6f2ea" />
        <directionalLight
          position={[4.2, 6.4, 3.6]}
          intensity={2.6}
          color="#fffaf2"
          castShadow={full}
          shadow-mapSize={[1024, 1024]}
          shadow-camera-near={1}
          shadow-camera-far={20}
          shadow-camera-left={-6}
          shadow-camera-right={6}
          shadow-camera-top={6}
          shadow-camera-bottom={-6}
          shadow-bias={-0.0008}
        />
        <directionalLight position={[-5, 2.5, -3]} intensity={0.4} color="#e6e3dc" />

        <FrameFit />
        <ArchitecturalModel pointer={pointer} progress={progress} still={still} />

        {/* Posisi = dasar plinth maket setelah offset & skala (lihat BASE di ArchitecturalModel). */}
        <ContactShadows
          position={[0.93, -0.372, 0]}
          opacity={0.3}
          scale={6.5}
          blur={2.2}
          far={4.5}
          resolution={full ? 512 : 256}
          color="#6c685c"
          frames={still ? 1 : Infinity}
        />
      </Canvas>
    </div>
  );
}
