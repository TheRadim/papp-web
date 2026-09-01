"use client";

import { Environment, OrbitControls, useGLTF } from "@react-three/drei";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import type { ThreeEvent } from "@react-three/fiber";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
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

const copy: Record<Locale, { eyebrow: string; title: string; intro: string; note: string[]; steps: SensorStep[] }> = {
  en: {
    eyebrow: "Sensor Hardware",
    title: "A parking sensor designed as part of the full data chain.",
    intro:
      "The sensor is the physical starting point: a compact unit that can sit in a parking space, collect occupancy signals and feed them into Papp Insights.",
    note: [
      "Developed in-house, the sensor measures occupancy reliably at individual parking spaces. It is especially strong when a smaller area needs precise coverage, or when specific bays need to be followed closely over time.",
      "Where cameras give a broader view of movement, sensors provide spot-level confidence directly from the parking surface."
    ],
    steps: [
      {
        part: "lid",
        title: "Lid",
        body:
          "The lid works with the base to create a watertight seal, protects the electronics and is built to handle even heavy vehicles."
      },
      {
        part: "core",
        title: "Core",
        body:
          "The core hides the technical work: mobile-network transmission, remote updates, LoRaWAN support, optimised battery drain and energy-efficient vehicle detection."
      },
      {
        part: "base",
        title: "Base",
        body: "The base holds the whole sensor in place, designed to be sturdy yet flexible through daily pressure, weather and installation conditions."
      }
    ]
  },
  da: {
    eyebrow: "Sensorhardware",
    title: "En parkeringssensor designet som del af hele datakæden.",
    intro:
      "Sensoren er det fysiske udgangspunkt: en kompakt enhed, der kan sidde i en parkeringsplads, indsamle belægningssignaler og sende dem videre til Papp Insights.",
    note: [
      "Sensoren er udviklet internt til at måle belægning stabilt på den enkelte parkeringsplads. Den er særligt velegnet, når et mindre område skal dækkes præcist, eller når udvalgte pladser skal følges tæt over tid.",
      "Hvor kameraer giver et bredere billede af bevægelse, giver sensorer punktpræcis sikkerhed direkte fra parkeringsfladen."
    ],
    steps: [
      {
        part: "lid",
        title: "Låg",
        body: "Låget arbejder sammen med basen for at skabe en vandtæt forsegling, beskytte elektronikken og håndtere selv tunge køretøjer."
      },
      {
        part: "core",
        title: "Kerne",
        body:
          "Kernen rummer teknikken: mobilnetværk, fjernopdateringer, LoRaWAN-support, optimeret batteriforbrug og energieffektiv bilregistrering."
      },
      {
        part: "base",
        title: "Base",
        body: "Basen holder hele sensoren på plads og er designet til at være robust, men fleksibel under daglig belastning, vejr og installation."
      }
    ]
  }
};

export function SensorAssemblySection({ locale }: { locale: Locale }) {
  const text = copy[locale];
  const sectionRef = useRef<HTMLElement>(null);
  const layoutRef = useRef<HTMLDivElement>(null);
  const clearHoverFrame = useRef<number | null>(null);
  const [progress, setProgress] = useState(0);
  const [highlightedPart, setHighlightedPart] = useState<SensorPartName | null>(null);
  const highlightedStep = highlightedPart ? text.steps.findIndex((step) => step.part === highlightedPart) : -1;
  const activeStep = highlightedStep;

  useEffect(() => {
    let frame = 0;

    function updateProgress() {
      frame = 0;
      const element = layoutRef.current ?? sectionRef.current;
      if (!element) return;

      const rect = element.getBoundingClientRect();
      const viewportHeight = window.innerHeight || 1;
      const entered = Math.min(1, Math.max(0, (viewportHeight - rect.top) / viewportHeight));
      const opening = smoothstep(0.4, 0.48, entered);
      const closing = 1 - smoothstep(0.6, 0.68, entered);
      const nextProgress = Math.min(opening, closing);
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

  const setSensorHighlight = useCallback((part: SensorPartName | null) => {
    if (clearHoverFrame.current) {
      window.clearTimeout(clearHoverFrame.current);
      clearHoverFrame.current = null;
    }

    if (part) {
      setHighlightedPart(part);
      return;
    }

    clearHoverFrame.current = window.setTimeout(() => {
      setHighlightedPart(null);
      clearHoverFrame.current = null;
    }, 140);
  }, []);

  useEffect(
    () => () => {
      if (clearHoverFrame.current) window.clearTimeout(clearHoverFrame.current);
    },
    []
  );

  return (
    <section className="sensor-product-lab papp-section" ref={sectionRef}>
      <div className="container">
        <div className="sensor-product-lab__heading section-heading section-heading--start">
          <p className="eyebrow">{text.eyebrow}</p>
          <h2>{text.title}</h2>
          <p>{text.intro}</p>
        </div>
        <div className="sensor-product-lab__layout" ref={layoutRef}>
          <div
            className="sensor-product-lab__stage"
            aria-label={locale === "da" ? "3D-model af Papp sensor" : "3D model of Papp sensor"}
          >
            <Canvas
              className="sensor-product-lab__canvas"
              camera={{ position: [3.2, 2.35, 4.4], fov: 38 }}
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
              <SensorModel activePart={highlightedPart} progress={progress} onPartHover={setSensorHighlight} />
              <Environment preset="city" environmentIntensity={0.24} />
              <OrbitControls
                enableDamping
                enablePan={false}
                enableZoom={false}
                dampingFactor={0.08}
                rotateSpeed={0.5}
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
                    onBlur={() => setSensorHighlight(null)}
                    onClick={() => setSensorHighlight(step.part)}
                    onFocus={() => setSensorHighlight(step.part)}
                    onPointerEnter={() => setSensorHighlight(step.part)}
                    onPointerLeave={() => setSensorHighlight(null)}
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
            <div className="sensor-product-lab__note">
              {text.note.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function smoothstep(start: number, end: number, value: number) {
  if (start === end) return value >= end ? 1 : 0;
  const amount = Math.min(1, Math.max(0, (value - start) / (end - start)));
  return amount * amount * (3 - 2 * amount);
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
      const transparent = opacity < 0.98;
      const depthWrite = opacity > 0.18;

      if (Math.abs((standard.opacity ?? 1) - opacity) < 0.004 && standard.transparent === transparent && standard.depthWrite === depthWrite) {
        return;
      }

      standard.transparent = transparent;
      standard.opacity = opacity;
      standard.depthWrite = depthWrite;
      standard.needsUpdate = true;
    });
  });
}

function getSensorPartFromObject(object: Object3D): SensorPartName | null {
  let current: Object3D | null = object;

  while (current) {
    const name = current.name.toLowerCase();

    if (name.includes("base")) return "base";
    if (name.includes("lid")) return "lid";
    if (name.includes("perry") || name.includes("core")) return "core";

    current = current.parent;
  }

  return null;
}

function SensorModel({
  activePart,
  progress,
  onPartHover
}: {
  activePart: SensorPartName | null;
  progress: number;
  onPartHover: (part: SensorPartName | null) => void;
}) {
  const gltf = useGLTF(withBasePath("/models/sensor/parking-sensor.glb"));
  const groupRef = useRef<Group>(null);
  const parts = useRef<Partial<Record<SensorPartName, Object3D>>>({});
  const partOpacities = useRef<Record<SensorPartName, number>>({ base: 1, core: 1, lid: 1 });
  const snapshots = useRef(new Map<Object3D, PartSnapshot>());
  const smoothedOpen = useRef(0);
  const hoveredModelPart = useRef<SensorPartName | null>(null);

  const scene = useMemo(() => {
    const clone = gltf.scene.clone(true) as Group;
    const box = new Box3().setFromObject(clone);
    const center = box.getCenter(new Vector3());
    const size = box.getSize(new Vector3());
    const maxAxis = Math.max(size.x, size.y, size.z) || 1;
    const normalized = new Group();

    clone.position.sub(center);
    normalized.add(clone);
    normalized.scale.setScalar(1.8 / maxAxis);
    normalized.rotation.set(0, -0.58, 0.03);

    normalized.traverse((object) => {
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

    return normalized;
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

    (["base", "core", "lid"] as SensorPartName[]).forEach((partName) => {
      partOpacities.current[partName] = 1;
      setObjectOpacity(nextParts[partName], 1);
    });
  }, [scene]);

  useFrame((_, delta) => {
    const targetOpen = Math.min(1, Math.max(0, progress * 1.08));
    smoothedOpen.current += (targetOpen - smoothedOpen.current) * Math.min(1, delta * 5);
    const eased = smoothedOpen.current * smoothedOpen.current * (3 - 2 * smoothedOpen.current);
    const lid = parts.current.lid;
    const core = parts.current.core;

    if (lid) {
      const snapshot = snapshots.current.get(lid);
      if (snapshot) {
        lid.position.y = snapshot.position.y;
        lid.position.z = snapshot.position.z - eased * 0.22;
      }
    }

    if (core) {
      const snapshot = snapshots.current.get(core);
      if (snapshot) {
        core.position.y = snapshot.position.y;
        core.position.z = snapshot.position.z - eased * 0.11;
      }
    }

    (["base", "core", "lid"] as SensorPartName[]).forEach((partName) => {
      const targetOpacity = !activePart || partName === activePart ? 1 : 0.1;
      const currentOpacity = partOpacities.current[partName] ?? 1;
      const nextOpacity = currentOpacity + (targetOpacity - currentOpacity) * Math.min(1, delta * 5.5);
      const settledOpacity = Math.abs(nextOpacity - targetOpacity) < 0.01 ? targetOpacity : nextOpacity;
      partOpacities.current[partName] = settledOpacity;
      setObjectOpacity(parts.current[partName], settledOpacity);
    });
  });

  function handlePointerOver(event: ThreeEvent<PointerEvent>) {
    const part = getSensorPartFromObject(event.object);

    if (!part) {
      return;
    }

    event.stopPropagation();
    if (hoveredModelPart.current !== part) {
      hoveredModelPart.current = part;
      onPartHover(part);
    }
  }

  function handlePointerOut(event: ThreeEvent<PointerEvent>) {
    if (!getSensorPartFromObject(event.object)) {
      return;
    }

    const stillOverSensorPart = event.intersections.some((hit) => hit.object !== event.object && getSensorPartFromObject(hit.object));

    if (stillOverSensorPart) {
      return;
    }

    event.stopPropagation();
    hoveredModelPart.current = null;
    onPartHover(null);
  }

  return (
    <group ref={groupRef} position={[0, -1.14, 0]} onPointerOver={handlePointerOver} onPointerOut={handlePointerOut}>
      <primitive object={scene} />
    </group>
  );
}

useGLTF.preload(withBasePath("/models/sensor/parking-sensor.glb"));
