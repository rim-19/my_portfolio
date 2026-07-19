import { Canvas, useFrame } from "@react-three/fiber";
import { Billboard, Sparkles, Float, useTexture, AdaptiveDpr, PerformanceMonitor } from "@react-three/drei";
import { Suspense, useEffect, useMemo, useRef, type ReactNode } from "react";
import * as THREE from "three";
import {
  siReact,
  siTypescript,
  siJavascript,
  siNodedotjs,
  siNextdotjs,
  siPython,
  siTailwindcss,
  siPostgresql,
  siPrisma,
  siStripe,
  siExpress,
  siVite,
  siFramer,
  siHuggingface,
  siGooglegemini,
  siSupabase,
  siLangchain,
  siMysql,
  siGithub,
} from "simple-icons";

/* ------------------------------------------------------------------ *
 * Tech stack as a garden of glossy iridescent HEART bubbles. Each
 * logo floats inside a puffy 3D heart and orbits in true 3D. Same
 * float / grow-in / cursor parallax / sparkles as before.
 * ------------------------------------------------------------------ */

const TINTS = ["#e98aa8", "#c9b6e4", "#b892c9", "#e6b98a", "#f2a9c2"];

const ICONS = [
  siReact, siTypescript, siNodedotjs, siNextdotjs, siPython, siTailwindcss,
  siPostgresql, siPrisma, siStripe, siExpress, siVite, siFramer,
  siHuggingface, siGooglegemini, siSupabase, siLangchain, siJavascript, siMysql, siGithub,
];

function toDataUri(pathD: string, color: string) {
  const svg =
    `<svg xmlns="http://www.w3.org/2000/svg" width="128" height="128" viewBox="0 0 24 24">` +
    `<path fill="${color}" d="${pathD}"/></svg>`;
  return "data:image/svg+xml;charset=utf-8," + encodeURIComponent(svg);
}

// pure white logos so they read brightly in front of the tinted heart
const LOGO_URIS = ICONS.map((ic) => toDataUri(ic.path, "#ffffff"));

/* ---- a puffy, beveled 3D heart, shared across all instances ---- */
const HEART_GEO = (() => {
  const s = new THREE.Shape();
  s.moveTo(0, -0.55);
  s.bezierCurveTo(0.35, -0.3, 0.55, 0.0, 0.55, 0.25);
  s.bezierCurveTo(0.55, 0.55, 0.3, 0.72, 0.0, 0.5);
  s.bezierCurveTo(-0.3, 0.72, -0.55, 0.55, -0.55, 0.25);
  s.bezierCurveTo(-0.55, 0.0, -0.35, -0.3, 0.0, -0.55);
  const geo = new THREE.ExtrudeGeometry(s, {
    depth: 0.2,
    bevelEnabled: true,
    bevelSegments: 2,
    bevelSize: 0.07,
    bevelThickness: 0.07,
    curveSegments: 12,
  });
  geo.center();
  geo.computeVertexNormals();
  return geo;
})();

/* ---- one logo inside a glossy heart ---- */
function HeartLogo({ texture, tint, scale = 0.62 }: { texture: THREE.Texture; tint: string; scale?: number }) {
  return (
    <Billboard>
      <group scale={scale}>
        {/* the heart bubble */}
        <mesh geometry={HEART_GEO}>
          <meshStandardMaterial
            color={tint}
            transparent
            opacity={0.46}
            roughness={0.18}
            metalness={0.25}
            depthWrite={false}
          />
        </mesh>

        {/* bright logo, floating just in front */}
        <mesh position={[0, 0.02, 0.34]} scale={0.52} renderOrder={2}>
          <planeGeometry args={[1, 1]} />
          <meshBasicMaterial map={texture} transparent alphaTest={0.08} depthWrite={false} toneMapped={false} />
        </mesh>

        {/* glossy highlight glint */}
        <mesh position={[-0.16, 0.24, 0.4]} renderOrder={3}>
          <circleGeometry args={[0.07, 20]} />
          <meshBasicMaterial color="#ffffff" transparent opacity={0.55} depthWrite={false} toneMapped={false} />
        </mesh>
      </group>
    </Billboard>
  );
}

/* ---- one tilted 3D orbit ring of hearts ---- */
function Ring({
  radius,
  tilt,
  speed,
  phase = 0,
  textures,
}: {
  radius: number;
  tilt: number;
  speed: number;
  phase?: number;
  textures: THREE.Texture[];
}) {
  const spin = useRef<THREE.Group>(null);
  useFrame((_, dt) => {
    if (spin.current) spin.current.rotation.z += dt * speed;
  });
  const count = textures.length;
  return (
    <group rotation={[tilt, 0, 0]}>
      <group ref={spin}>
        {textures.map((t, i) => {
          const a = phase + (i / count) * Math.PI * 2;
          const tint = TINTS[i % TINTS.length];
          return (
            <group key={i} position={[Math.cos(a) * radius, Math.sin(a) * radius, 0]}>
              <Float speed={1.6} floatIntensity={0.5} rotationIntensity={0}>
                <HeartLogo texture={t} tint={tint} />
              </Float>
            </group>
          );
        })}
      </group>
    </group>
  );
}

/* ---- all hearts, grown in on mount, across 3 orbits ---- */
function LogoGarden() {
  const uris = useMemo(() => LOGO_URIS, []);
  const loaded = useTexture(uris);
  const textures = Array.isArray(loaded) ? loaded : [loaded];

  const g = useRef<THREE.Group>(null);
  const grow = useRef(0.001);
  useFrame((_, dt) => {
    if (!g.current) return;
    grow.current = THREE.MathUtils.lerp(grow.current, 1, Math.min(dt * 1.2, 0.08));
    g.current.scale.setScalar(grow.current);
  });

  const r1 = textures.slice(0, 7);
  const r2 = textures.slice(7, 13);
  const r3 = textures.slice(13);

  return (
    <group ref={g} scale={0.001}>
      <Ring radius={2.0} tilt={0.4} speed={0.16} textures={r1} />
      <Ring radius={2.85} tilt={-0.5} speed={-0.12} phase={0.4} textures={r2} />
      <Ring radius={3.6} tilt={0.95} speed={0.1} phase={0.9} textures={r3} />
    </group>
  );
}

/* ---- cursor parallax rig ---- */
function Rig({ children }: { children: ReactNode }) {
  const g = useRef<THREE.Group>(null);
  useFrame((state) => {
    if (!g.current) return;
    g.current.rotation.y += (state.pointer.x * 0.2 - g.current.rotation.y) * 0.04;
    g.current.rotation.x += (-state.pointer.y * 0.12 - g.current.rotation.x) * 0.04;
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
      dpr={[1, 1.25]}
      gl={{ antialias: false, alpha: true, powerPreference: "high-performance" }}
      camera={{ position: [0, 0, 9], fov: 45 }}
      style={{ pointerEvents: "none" }}
    >
      <PerformanceMonitor />
      <AdaptiveDpr pixelated={false} />
      <ambientLight intensity={1.35} color="#fff2f7" />
      <directionalLight position={[3, 5, 4]} intensity={1.7} color="#ffffff" />
      <pointLight position={[-4, 2, 4]} intensity={5} distance={20} color="#ffd0e2" />
      <Suspense fallback={null}>
        <Rig>
          <LogoGarden />
          <Sparkles count={28} scale={[13, 8, 6]} size={2.2} speed={0.25} color="#ffdcea" opacity={0.5} />
        </Rig>
      </Suspense>
    </Canvas>
  );
}
