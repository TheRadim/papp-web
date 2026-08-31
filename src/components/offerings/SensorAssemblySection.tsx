"use client";

import { Environment, OrbitControls, useGLTF } from "@react-three/drei";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useEffect, useMemo, useRef, useState } from "react";
import { Box3, Group, Material, Mesh, MeshStandardMaterial, Object3D, Vector3 } from "three";
import type { Locale } from "@/content/types";
import { withBasePath } from "@/lib/site/basePath";

type SensorPartName = "base" | "lid" | "core";

interface SensorStep {
  part: SensorPartName;
  title: string;
  body: string;
}

interface PartSnapshot {
  position: Vector3;
  rotation: { x: number; y: number; z: number };
}

const copy: Record<Locale, { eyebrow: string; title: string; intro: string; steps: SensorStep[] }> = {
  en: {
    eyebrow: "Sensor Hardware",
    title: "A parking sensor designed as part of the full data chain.",
    intro:
      "The sensor is the physical starting point: a compact unit that can sit in a parking space, collect occupancy signals and feed them into Papp Insights.",
    steps: [
      {
        part: "core",
        title: "Sensor core",
        body:
          "The core hides the technical work: mobile-network transmission, remote updates, LoRaWAN support, optimised battery drain and energy-efficient vehicle detection."
      },
      {
        part: "base",
        title: "Base",
        body: "The base holds the whole sensor in place, designed to be sturdy yet flexible through daily pressure, weather and installation conditions."
      },
      {
        part: "lid",
        title: "Lid",
        body:
          "The lid works with the base to create a watertight seal, protects the electronics and is built to handle even heavy vehicles."
      }
    ]
  },
  da: {
    eyebrow: "Sensorhardware",
    title: "En parkeringssensor designet som del af hele datakæden.",
    intro:
      "Sensoren er det fysiske udgangspunkt: en kompakt enhed, der kan sidde i en parkeringsplads, indsamle belægningssignaler og sende dem videre til Papp Insights.",
    steps: [
      {
        part: "core",
        title: "Sensorkerne",
        body:
          "Kernen rummer teknikken: mobilnetværk, fjernopdateringer, LoRaWAN-support, optimeret batteriforbrug og energieffektiv bilregistrering."
      },
      {
        part: "base",
        title: "Base",
        body: "Basen holder hele sensoren på plads og er designet til at være robust, men fleksibel under daglig belastning, vejr og installation."
      },
      {
        part: "lid",
        title: "Låg",
        body: "Låget arbejder sammen med basen for at skabe en vandtæt forsegling, beskytte elektronikken og håndtere selv tunge køretøjer."
      }
    ]
  }
};

export function SensorAssemblySection({ locale }: { locale: Locale }) {
  const text = copy[locale];
  const sectionRef = useRef<HTMLElement>(null);
  const [progress, setProgress] = useState(0);
  const [selectedStep, setSelectedStep] = useState<number | null>(null);
  const scrollStep = Math.min(text.steps.length - 1, Math.max(0, Math.floor(progress * text.steps.length)));
  const activeStep = selectedStep ?? scrollStep;
  const activePart = text.steps[activeStep]?.part ?? "core";

  useEffect(() => {
    let frame = 0;

    function updateProgress() {
      frame = 0;
      const element = sectionRef.current;
      if (!element) return;

      const rect = element.getBoundingClientRect();
      const travel = Math.max(1, rect.height - window.innerHeight);
      const nextProgress = Math.min(1, Math.max(0, (window.innerHeight * 0.45 - rect.top) / travel));
      setProgress(nextProgress);
    }

    function requestUpdate() {
      if (frame) return;
      frame = window.requestAnimationFrame(updateProgress);
    }

    updateProgress();
    window.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", requestUpdate);

    return () => {
      if (frame) window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", requestUpdate);
      window.removeEventListener("resize", requestUpdate);
    };
  }, []);

  return (
    <section className="sensor-product-lab papp-section" ref={sectionRef}>
      <div className="container">
        <div className="sensor-product-lab__heading section-heading section-heading--start">
          <p className="eyebrow">{text.eyebrow}</p>
          <h2>{text.title}</h2>
          <p>{text.intro}</p>
        </div>
        <div className="sensor-product-lab__layout">
          <div className="sensor-product-lab__stage" aria-label={locale === "da" ? "3D-model af Papp sensor" : "3D model of Papp sensor"}>
            <Canvas
              className="sensor-product-lab__canvas"
              camera={{ position: [3.2, 2.35, 4.4], fov: 30 }}
              dpr={[1, 1.6]}
              gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
              shadows
            >
              <ambientLight intensity={0.58} />
              <hemisphereLight args={["#ffffff", "#dce8ef", 1.05]} />
              <directionalLight
                castShadow
                position={[3, 5, 4]}
                intensity={1.8}
                shadow-mapSize-width={1024}
                shadow-mapSize-height={1024}
                shadow-bias={-0.0002}
              />
              <SensorCameraSetup />
              <SensorModel activePart={activePart} progress={progress} />
              <Environment preset="city" environmentIntensity={0.24} />
              <OrbitControls
                enableDamping
                enablePan={false}
                enableZoom
                dampingFactor={0.08}
                rotateSpeed={0.5}
                zoomSpeed={0.6}
                minDistance={2.1}
                maxDistance={6.5}
                minPolarAngle={0}
                maxPolarAngle={Math.PI}
              />
            </Canvas>
          </div>
          <div className="sensor-product-lab__copy">
            <ol role="list">
              {text.steps.map((step, index) => (
                <li className={activeStep === index ? "is-active" : ""} key={step.title}>
                  <button
                    type="button"
                    onClick={() => setSelectedStep(index)}
                    onFocus={() => setSelectedStep(index)}
                    onPointerEnter={() => setSelectedStep(index)}
                  >
                    <span>{String(index + 1).padStart(2, "0")}</span>
                    <div>
                      <h3>{step.title}</h3>
                      <p>{step.body}</p>
                    </div>
                  </button>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}

function SensorCameraSetup() {
  const { camera } = useThree();

  useEffect(() => {
    camera.lookAt(0, 0, 0);
    camera.updateProjectionMatrix();
  }, [camera]);

  return null;
}

function cloneMaterial(material: Material | Material[]) {
  return Array.isArray(material) ? material.map((item) => item.clone()) : material.clone();
}

function eachMaterial(material: Material | Material[], callback: (material: Material) => void) {
  if (Array.isArray(material)) {
    material.forEach(callback);
    return;
  }

  callback(material);
}

function setObjectOpacity(object: Object3D | null | undefined, opacity: number) {
  object?.traverse((child) => {
    if (!(child instanceof Mesh)) return;

    eachMaterial(child.material, (material) => {
      const standard = material as MeshStandardMaterial;
      standard.transparent = opacity < 0.98;
      standard.opacity = opacity;
      standard.depthWrite = opacity > 0.18;
      standard.needsUpdate = true;
    });
  });
}

function SensorModel({ activePart, progress }: { activePart: SensorPartName; progress: number }) {
  const gltf = useGLTF(withBasePath("/models/sensor/sensor.gltf"));
  const groupRef = useRef<Group>(null);
  const parts = useRef<Partial<Record<SensorPartName, Object3D>>>({});
  const snapshots = useRef(new Map<Object3D, PartSnapshot>());
  const smoothedOpen = useRef(0);

  const scene = useMemo(() => {
    const clone = gltf.scene.clone(true) as Group;
    const box = new Box3().setFromObject(clone);
    const center = box.getCenter(new Vector3());
    const size = box.getSize(new Vector3());
    const maxAxis = Math.max(size.x, size.y, size.z) || 1;

    clone.position.sub(center);
    clone.scale.setScalar(1.8 / maxAxis);
    clone.rotation.set(Math.PI / 2, -0.58, 0.03);

    clone.traverse((object) => {
      if (!(object instanceof Mesh)) return;

      object.material = cloneMaterial(object.material);
      object.castShadow = true;
      object.receiveShadow = true;

      eachMaterial(object.material, (material) => {
        const standard = material as MeshStandardMaterial;
        if (standard.roughness !== undefined) {
          standard.roughness = Math.max(standard.roughness, 0.58);
          standard.metalness *= 0.4;
        }
      });
    });

    return clone;
  }, [gltf.scene]);

  useEffect(() => {
    const nextParts: Partial<Record<SensorPartName, Object3D>> = {};
    const nextSnapshots = new Map<Object3D, PartSnapshot>();

    scene.traverse((object) => {
      const name = object.name.toLowerCase();

      if (name.includes("base")) nextParts.base = object;
      if (name.includes("lid")) nextParts.lid = object;
      if (name.includes("perry") || name.includes("core")) nextParts.core = object;
    });

    Object.values(nextParts).forEach((part) => {
      if (!part) return;
      nextSnapshots.set(part, {
        position: part.position.clone(),
        rotation: { x: part.rotation.x, y: part.rotation.y, z: part.rotation.z }
      });
    });

    parts.current = nextParts;
    snapshots.current = nextSnapshots;
  }, [scene]);

  useEffect(() => {
    (["base", "core", "lid"] as SensorPartName[]).forEach((partName) => {
      setObjectOpacity(parts.current[partName], partName === activePart ? 1 : 0.12);
    });
  }, [activePart, scene]);

  useFrame((_, delta) => {
    const targetOpen = Math.min(1, Math.max(0.18, progress * 1.2));
    smoothedOpen.current += (targetOpen - smoothedOpen.current) * Math.min(1, delta * 5);
    const eased = smoothedOpen.current * smoothedOpen.current * (3 - 2 * smoothedOpen.current);
    const lid = parts.current.lid;
    const core = parts.current.core;
    const base = parts.current.base;

    if (lid) {
      const snapshot = snapshots.current.get(lid);
      if (snapshot) {
        lid.position.y = snapshot.position.y + eased * 0.52;
        lid.position.x = snapshot.position.x + eased * 0.03;
        lid.rotation.z = snapshot.rotation.z + eased * 0.07;
      }
    }

    if (core) {
      const snapshot = snapshots.current.get(core);
      if (snapshot) {
        core.position.y = snapshot.position.y + eased * 0.22;
        core.rotation.y = snapshot.rotation.y - eased * 0.08;
      }
    }

    if (base) {
      const snapshot = snapshots.current.get(base);
      if (snapshot) {
        base.position.y = snapshot.position.y - eased * 0.14;
      }
    }

    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.045;
    }
  });

  return (
    <group ref={groupRef}>
      <primitive object={scene} />
    </group>
  );
}

useGLTF.preload(withBasePath("/models/sensor/sensor.gltf"));
