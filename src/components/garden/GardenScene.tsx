import { Canvas, useFrame } from "@react-three/fiber";
import { Sparkles, Float } from "@react-three/drei";
import { useRef, useEffect, type ReactNode } from "react";
import * as THREE from "three";

/* ------------------------------------------------------------------ *
 * A single shared "enchanted garden" scene that lives behind the
 * Projects section. Procedural low-poly flowers gently spin and grow,
 * with pearls / petals / stars orbiting each one in true 3D, plus
 * drifting sparkles and a couple of butterflies. Pastel + soft glow.
 * ------------------------------------------------------------------ */

const C = {
  petalPink: "#f6b6cd",
  petalRose: "#ef98b4",
  petalLav: "#cdbbe8",
  center: "#f7d78d",
  pearl: "#fff6fb",
  star: "#ffe6ad",
  wing: "#f7c6d8",
};

/* ---- little decorative bodies ---- */
const Pearl = () => (
  <mesh>
    <sphereGeometry args={[0.12, 16, 16]} />
    <meshStandardMaterial color={C.pearl} roughness={0.12} metalness={0.25} envMapIntensity={1} />
  </mesh>
);

const Star = () => (
  <mesh>
    <octahedronGeometry args={[0.12, 0]} />
    <meshStandardMaterial color={C.star} emissive={C.star} emissiveIntensity={0.7} roughness={0.4} />
  </mesh>
);

const OrbPetal = ({ color }: { color: string }) => (
  <mesh scale={[0.09, 0.2, 0.03]}>
    <sphereGeometry args={[1, 10, 8]} />
    <meshStandardMaterial color={color} roughness={0.5} />
  </mesh>
);

/* ---- one tilted 3D orbit ring ---- */
function Orbit({
  radius,
  count,
  tilt,
  speed,
  phase = 0,
  render,
}: {
  radius: number;
  count: number;
  tilt: number;
  speed: number;
  phase?: number;
  render: (i: number) => ReactNode;
}) {
  const spin = useRef<THREE.Group>(null);
  useFrame((_, dt) => {
    if (spin.current) spin.current.rotation.z += dt * speed;
  });
  return (
    <group rotation={[tilt, 0, 0]}>
      <group ref={spin}>
        {Array.from({ length: count }).map((_, i) => {
          const a = phase + (i / count) * Math.PI * 2;
          return (
            <group key={i} position={[Math.cos(a) * radius, Math.sin(a) * radius, 0]}>
              <Float speed={2} floatIntensity={0.4} rotationIntensity={0.6}>
                {render(i)}
              </Float>
            </group>
          );
        })}
      </group>
    </group>
  );
}

/* ---- procedural low-poly flower that grows in on mount ---- */
function Flower({ color, center = C.center }: { color: string; center?: string }) {
  const g = useRef<THREE.Group>(null);
  const grow = useRef(0.001);
  const petals = 6;
  useFrame((_, dt) => {
    if (!g.current) return;
    g.current.rotation.z += dt * 0.16;
    grow.current = THREE.MathUtils.lerp(grow.current, 1, Math.min(dt * 1.4, 0.1));
    g.current.scale.setScalar(grow.current);
  });
  return (
    <group ref={g} scale={0.001}>
      {Array.from({ length: petals }).map((_, i) => {
        const a = (i / petals) * Math.PI * 2;
        return (
          <mesh
            key={i}
            position={[Math.cos(a) * 0.6, Math.sin(a) * 0.6, 0]}
            rotation={[0, 0, a - Math.PI / 2]}
            scale={[0.27, 0.58, 0.07]}
          >
            <sphereGeometry args={[1, 12, 10]} />
            <meshStandardMaterial color={color} roughness={0.45} metalness={0.03} />
          </mesh>
        );
      })}
      <mesh position={[0, 0, 0.06]}>
        <sphereGeometry args={[0.32, 20, 20]} />
        <meshStandardMaterial color={center} emissive={center} emissiveIntensity={0.3} roughness={0.35} />
      </mesh>
    </group>
  );
}

/* ---- a flower plus its orbiting decorations ---- */
function FlowerWorld({
  position,
  color,
  scale = 1,
}: {
  position: [number, number, number];
  color: string;
  scale?: number;
}) {
  return (
    <Float speed={1.2} floatIntensity={0.8} rotationIntensity={0.15}>
      <group position={position} scale={scale}>
        <Flower color={color} />
        <Orbit radius={1.45} count={7} tilt={0.5} speed={0.45} render={() => <OrbPetal color={color} />} />
        <Orbit radius={1.05} count={6} tilt={-0.7} speed={-0.75} phase={0.5} render={() => <Pearl />} />
        <Orbit radius={1.85} count={5} tilt={1.15} speed={0.35} phase={1.1} render={() => <Star />} />
      </group>
    </Float>
  );
}

/* ---- butterfly drifting across on a soft lissajous path ---- */
function Butterfly({ seed = 0, color = C.wing }: { seed?: number; color?: string }) {
  const g = useRef<THREE.Group>(null);
  const wl = useRef<THREE.Mesh>(null);
  const wr = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    const t = state.clock.elapsedTime * 0.25 + seed * 3;
    if (g.current) {
      g.current.position.set(Math.sin(t) * 5.5, Math.sin(t * 1.3 + seed) * 2.6 + 0.5, Math.cos(t * 0.8) * 2);
      g.current.rotation.y = Math.cos(t) * 0.6;
      g.current.rotation.z = Math.sin(t * 2) * 0.15;
    }
    const flap = Math.sin(state.clock.elapsedTime * 12 + seed) * 0.6 + 0.3;
    if (wl.current) wl.current.rotation.y = flap;
    if (wr.current) wr.current.rotation.y = -flap;
  });
  return (
    <group ref={g} scale={0.5}>
      <mesh ref={wl} position={[-0.02, 0, 0]}>
        <planeGeometry args={[0.5, 0.6]} />
        <meshStandardMaterial color={color} side={THREE.DoubleSide} roughness={0.5} transparent opacity={0.92} />
      </mesh>
      <mesh ref={wr} position={[0.02, 0, 0]}>
        <planeGeometry args={[0.5, 0.6]} />
        <meshStandardMaterial color={color} side={THREE.DoubleSide} roughness={0.5} transparent opacity={0.92} />
      </mesh>
    </group>
  );
}

/* ---- cursor parallax rig ---- */
function Rig({ children }: { children: ReactNode }) {
  const g = useRef<THREE.Group>(null);
  useFrame((state) => {
    if (!g.current) return;
    g.current.rotation.y += (state.pointer.x * 0.22 - g.current.rotation.y) * 0.04;
    g.current.rotation.x += (-state.pointer.y * 0.14 - g.current.rotation.x) * 0.04;
  });
  return <group ref={g}>{children}</group>;
}

export default function GardenScene({ active }: { active: boolean }) {
  // R3F can miss its first measure when mounted inside a lazily-revealed,
  // absolutely-positioned container. Nudge a resize so the canvas fills it.
  useEffect(() => {
    const fire = () => window.dispatchEvent(new Event("resize"));
    const raf = requestAnimationFrame(() => requestAnimationFrame(fire));
    const t = setTimeout(fire, 150);
    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(t);
    };
  }, []);

  return (
    <Canvas
      frameloop={active ? "always" : "demand"}
      resize={{ offsetSize: true }}
      flat
      dpr={[1, 1.6]}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      camera={{ position: [0, 0, 9], fov: 45 }}
      style={{ pointerEvents: "none" }}
    >
      <ambientLight intensity={1.5} color="#fff2f7" />
      <directionalLight position={[3, 5, 4]} intensity={1.6} color="#fff4f8" />
      <pointLight position={[-4, -1, 3]} intensity={6} distance={16} color="#ffc6dd" />

      <Rig>
        <FlowerWorld position={[-3.4, 0.7, -0.5]} color={C.petalPink} />
        <FlowerWorld position={[3.1, -0.6, -1.2]} color={C.petalLav} scale={0.92} />
        <FlowerWorld position={[0.3, 2.4, -2.4]} color={C.petalRose} scale={0.78} />

        <Butterfly seed={0} />
        <Butterfly seed={1.6} color="#e7c6ec" />

        <Sparkles count={70} scale={[13, 8, 6]} size={2.6} speed={0.3} color="#ffdcea" opacity={0.6} />
      </Rig>
    </Canvas>
  );
}
