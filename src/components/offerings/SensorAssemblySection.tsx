"use client";

import { Environment, ContactShadows, OrbitControls, useGLTF } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { useEffect, useMemo, useRef, useState } from "react";
import { Box3, Group, Mesh, MeshStandardMaterial, Object3D, Vector3 } from "three";
import type { Locale } from "@/content/types";
import { withBasePath } from "@/lib/site/basePath";

type SensorPartName = "base" | "lid" | "core";

interface PartSnapshot {
  position: Vector3;
  rotation: { x: number; y: number; z: number };
}

const copy = {
  en: {
    eyebrow: "Sensor hardware",
    title: "A parking sensor designed as part of the full data chain.",
    intro:
      "The sensor is the physical starting point: a compact unit that can sit in a parking space, collect occupancy signals and feed them into Papp Insights.",
    steps: [
      {
        title: "Outer casing",
        body: "The casing protects the electronics from daily parking-area use while keeping the installation discreet."
      },
      {
        title: "Sensor core",
        body: "The inner sensing layer is built to detect real occupancy events and support long-term measurement programmes."
      },
      {
        title: "Connected data",
        body: "Each detected event becomes part of a wider data picture that can be reviewed, analysed and turned into recommendations."
      }
    ]
  },
  da: {
    eyebrow: "Sensorhardware",
    title: "En parkeringssensor designet som del af hele datakæden.",
    intro:
      "Sensoren er det fysiske udgangspunkt: en kompakt enhed, der kan placeres på en parkeringsplads, indsamle belægningssignaler og sende dem videre til Papp Insights.",
    steps: [
      {
        title: "Ydre kabinet",
        body: "Kabinettet beskytter elektronikken i daglig brug og holder installationen diskret."
      },
      {
        title: "Sensorkerne",
        body: "Den indre sensor måler faktiske belægningshændelser og understøtter længere måleprogrammer."
      },
      {
        title: "Forbundet data",
        body: "Hver registrering bliver en del af et større databillede, der kan analyseres og omsættes til anbefalinger."
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
    <section className="sensor-product-lab papp-section papp-section--soft" ref={sectionRef}>
      <div className="container">
        <div className="sensor-product-lab__layout">
          <div className="sensor-product-lab__stage" aria-label={locale === "da" ? "3D-model af Papp sensor" : "3D model of Papp sensor"}>
            <Canvas
              camera={{ position: [3.2, 2.35, 4.4], fov: 32 }}
              dpr={[1, 1.6]}
              gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
              shadows
            >
              <ambientLight intensity={0.55} />
              <hemisphereLight args={["#ffffff", "#dce8ef", 1.1]} />
              <directionalLight
                castShadow
                position={[3, 5, 4]}
                intensity={2}
                shadow-mapSize-width={1024}
                shadow-mapSize-height={1024}
                shadow-bias={-0.0002}
              />
              <SensorModel progress={progress} activeStep={activeStep} />
              <ContactShadows position={[0, -0.78, 0]} opacity={0.22} scale={4} blur={2.4} far={2.5} resolution={384} frames={1} />
              <Environment preset="city" environmentIntensity={0.28} />
              <OrbitControls
                enableDamping
                enablePan={false}
                enableZoom={false}
                dampingFactor={0.08}
                rotateSpeed={0.45}
                minPolarAngle={0.85}
                maxPolarAngle={1.72}
              />
            </Canvas>
          </div>
          <div className="sensor-product-lab__copy">
            <p className="eyebrow">{text.eyebrow}</p>
            <h2>{text.title}</h2>
            <p>{text.intro}</p>
            <ol role="list">
              {text.steps.map((step, index) => (
                <li className={activeStep === index ? "is-active" : ""} key={step.title}>
                  <button type="button" onClick={() => setSelectedStep(index)} onFocus={() => setSelectedStep(index)}>
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

function SensorModel({ progress, activeStep }: { progress: number; activeStep: number }) {
  const gltf = useGLTF(withBasePath("/models/sensor/sensor.gltf"));
  const groupRef = useRef<Group>(null);
  const parts = useRef<Partial<Record<SensorPartName, Object3D>>>({});
  const snapshots = useRef(new Map<Object3D, PartSnapshot>());
  const smoothedOpen = useRef(0);
  const stepOpen = [0.16, 0.58, 0.94][activeStep] ?? Math.sin(progress * Math.PI);

  const scene = useMemo(() => {
    const clone = gltf.scene.clone(true) as Group;
    const box = new Box3().setFromObject(clone);
    const center = box.getCenter(new Vector3());
    const size = box.getSize(new Vector3());
    const maxAxis = Math.max(size.x, size.y, size.z) || 1;

    clone.position.sub(center);
    clone.scale.setScalar(1.58 / maxAxis);
    clone.rotation.set(Math.PI / 2, -0.58, 0.03);

    clone.traverse((object) => {
      if (object instanceof Mesh) {
        object.castShadow = true;
        object.receiveShadow = true;

        if (object.material instanceof MeshStandardMaterial) {
          object.material = object.material.clone();
          object.material.roughness = Math.max(object.material.roughness, 0.58);
          object.material.metalness *= 0.4;
        }
      }
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
      if (name.includes("perry")) nextParts.core = object;
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

  useFrame(() => {
    smoothedOpen.current += (stepOpen - smoothedOpen.current) * 0.08;
    const openAmount = smoothedOpen.current;
    const eased = openAmount * openAmount * (3 - 2 * openAmount);
    const lid = parts.current.lid;
    const core = parts.current.core;

    if (lid) {
      const snapshot = snapshots.current.get(lid);
      if (snapshot) {
        lid.position.y = snapshot.position.y + eased * 0.42;
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

    if (groupRef.current) {
      groupRef.current.rotation.y += 0.0008;
    }
  });

  return (
    <group ref={groupRef}>
      <primitive object={scene} />
    </group>
  );
}

useGLTF.preload(withBasePath("/models/sensor/sensor.gltf"));
