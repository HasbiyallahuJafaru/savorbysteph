"use client";

import { Suspense, useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Canvas, useFrame, type ThreeEvent } from "@react-three/fiber";
import { useTexture } from "@react-three/drei";
import * as THREE from "three";

export type HeroPlate = { slug: string; image: string; name: string };

type Props = {
  center: HeroPlate;
  orbit: HeroPlate[];
  onReady: () => void;
};

const easeOutBack = (t: number) => {
  const c1 = 1.4;
  const c3 = c1 + 1;
  return 1 + c3 * Math.pow(t - 1, 3) + c1 * Math.pow(t - 1, 2);
};

// Radial blob used as a fake contact shadow under each plate.
function useShadowTexture() {
  return useMemo(() => {
    const size = 128;
    const canvas = document.createElement("canvas");
    canvas.width = canvas.height = size;
    const ctx = canvas.getContext("2d")!;
    const g = ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2);
    g.addColorStop(0, "rgba(90,40,10,0.42)");
    g.addColorStop(0.55, "rgba(90,40,10,0.14)");
    g.addColorStop(1, "rgba(90,40,10,0)");
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, size, size);
    const tex = new THREE.CanvasTexture(canvas);
    tex.colorSpace = THREE.SRGBColorSpace;
    return tex;
  }, []);
}

function Plate({
  texture,
  radius,
  delay,
  shadow,
  spin,
  onSelect,
  label,
}: {
  texture: THREE.Texture;
  radius: number;
  delay: number;
  shadow: THREE.Texture;
  spin: number;
  onSelect: () => void;
  label: string;
}) {
  const root = useRef<THREE.Group>(null);
  const food = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);

  useFrame((state, dt) => {
    if (!root.current || !food.current) return;
    const t = state.clock.elapsedTime;
    const intro = THREE.MathUtils.clamp((t - delay) / 1.1, 0, 1);
    const target = (intro > 0 ? easeOutBack(intro) : 0) * (hovered ? 1.07 : 1);
    const s = THREE.MathUtils.damp(root.current.scale.x, target, 10, dt);
    root.current.scale.setScalar(Math.max(s, 0.0001));
    food.current.rotation.z += dt * spin;
  });

  const over = (e: ThreeEvent<PointerEvent>) => {
    e.stopPropagation();
    setHovered(true);
    document.body.style.cursor = "pointer";
  };
  const out = () => {
    setHovered(false);
    document.body.style.cursor = "";
  };

  return (
    <group ref={root} scale={0.0001}>
      <mesh position={[radius * 0.18, -radius * 0.26, -0.25]} renderOrder={-1}>
        <planeGeometry args={[radius * 3.1, radius * 3.1]} />
        <meshBasicMaterial map={shadow} transparent depthWrite={false} />
      </mesh>
      <group onPointerOver={over} onPointerOut={out} onClick={onSelect} name={label}>
        <mesh rotation-x={Math.PI / 2}>
          <cylinderGeometry args={[radius * 1.2, radius * 1.08, radius * 0.12, 48]} />
          <meshStandardMaterial color="#ffffff" roughness={0.28} metalness={0} />
        </mesh>
        <mesh position-z={radius * 0.065}>
          <torusGeometry args={[radius * 1.1, radius * 0.045, 12, 64]} />
          <meshStandardMaterial color="#f7f5f2" roughness={0.22} />
        </mesh>
        <mesh ref={food} position-z={radius * 0.066}>
          <circleGeometry args={[radius, 48]} />
          <meshStandardMaterial map={texture} roughness={0.75} toneMapped={false} />
        </mesh>
      </group>
    </group>
  );
}

function Scene({ center, orbit, onReady, compact }: Props & { compact: boolean }) {
  const router = useRouter();
  const all = useMemo(() => [center, ...orbit], [center, orbit]);
  const textures = useTexture(all.map((p) => p.image));
  const shadow = useShadowTexture();
  const rig = useRef<THREE.Group>(null);
  const ring = useRef<THREE.Group>(null);
  const floaters = useRef<(THREE.Group | null)[]>([]);

  useEffect(() => {
    textures.forEach((t) => {
      t.colorSpace = THREE.SRGBColorSpace;
      t.anisotropy = 8;
    });
    onReady();
  }, [textures, onReady]);

  const ringRadius = compact ? 2.5 : 2.7;
  const orbitRadius = compact ? 0.6 : 0.64;

  useFrame((state, dt) => {
    const t = state.clock.elapsedTime;
    if (rig.current) {
      rig.current.rotation.y = THREE.MathUtils.damp(rig.current.rotation.y, state.pointer.x * 0.28, 3, dt);
      rig.current.rotation.x = THREE.MathUtils.damp(rig.current.rotation.x, -state.pointer.y * 0.18, 3, dt);
    }
    if (ring.current) ring.current.rotation.z = t * 0.07;
    floaters.current.forEach((g, i) => {
      if (!g) return;
      // Counter-rotate so each plate stays upright while the ring turns, then bob gently.
      g.rotation.z = -(ring.current?.rotation.z ?? 0);
      g.position.z = Math.sin(t * 0.9 + i * 1.3) * 0.18;
    });
  });

  return (
    <group ref={rig}>
      <group rotation={[-0.18, 0.12, 0]}>
        <Plate
          texture={textures[0]}
          radius={compact ? 1.35 : 1.5}
          delay={0.15}
          shadow={shadow}
          spin={0.05}
          label={center.name}
          onSelect={() => router.push(`/menu/${center.slug}`)}
        />
      </group>
      <group ref={ring}>
        {orbit.map((p, i) => {
          const a = (i / orbit.length) * Math.PI * 2 + 0.4;
          return (
            <group key={p.slug} position={[Math.cos(a) * ringRadius, Math.sin(a) * ringRadius * 0.82, 0.4]}>
              <group ref={(el) => { floaters.current[i] = el; }} rotation={[-0.12, 0.1, 0]}>
                <Plate
                  texture={textures[i + 1]}
                  radius={orbitRadius}
                  delay={0.45 + i * 0.12}
                  shadow={shadow}
                  spin={i % 2 ? -0.12 : 0.1}
                  label={p.name}
                  onSelect={() => router.push(`/menu/${p.slug}`)}
                />
              </group>
            </group>
          );
        })}
      </group>
    </group>
  );
}

export default function HeroScene({ center, orbit, onReady }: Props) {
  const wrap = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(true);
  const [compact, setCompact] = useState(false);

  useEffect(() => {
    setCompact(window.matchMedia("(max-width: 767px)").matches);
    const io = new IntersectionObserver(([e]) => setVisible(e.isIntersecting), { rootMargin: "80px" });
    if (wrap.current) io.observe(wrap.current);
    // Stop rendering as soon as a page change starts so the router gets the main thread.
    const onNavigate = (e: MouseEvent) => {
      if ((e.target as Element).closest?.("a[href^='/']")) setVisible(false);
    };
    document.addEventListener("click", onNavigate, true);
    return () => {
      io.disconnect();
      document.removeEventListener("click", onNavigate, true);
      document.body.style.cursor = "";
    };
  }, []);

  const plates = compact ? orbit.slice(0, 5) : orbit;

  return (
    <div ref={wrap} className="absolute inset-0">
      <Canvas
        frameloop={visible ? "always" : "never"}
        dpr={[1, 1.5]}
        camera={{ position: [0, 0, 11], fov: 38 }}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
        aria-hidden
      >
        <ambientLight intensity={1.35} />
        <directionalLight position={[-4, 6, 8]} intensity={1.6} />
        <directionalLight position={[5, -3, 4]} intensity={0.35} color="#ffd9b8" />
        <Suspense fallback={null}>
          <Scene center={center} orbit={plates} onReady={onReady} compact={compact} />
        </Suspense>
      </Canvas>
    </div>
  );
}
