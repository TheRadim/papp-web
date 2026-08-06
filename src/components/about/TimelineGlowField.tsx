"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

const vertexShader = `
  void main() {
    gl_Position = vec4(position, 1.0);
  }
`;

const fragmentShader = `
  uniform vec2 u_resolution;
  uniform vec2 u_mouse;
  uniform float u_time;
  uniform sampler2D u_noise;
  uniform sampler2D u_buffer;
  uniform bool u_renderpass;

  const float blurMultiplier = 0.95;
  const float circleSize = .25;
  const float blurStrength = .98;
  const float threshold = .5;
  const float scale = 4.;

  #define PI 3.141592653589793
  #define pow2(x) (x * x)

  const int samples = 8;
  const float sigma = float(samples) * 0.25;

  float gaussian(vec2 i) {
    return 1.0 / (2.0 * PI * pow2(sigma)) * exp(-((pow2(i.x) + pow2(i.y)) / (2.0 * pow2(sigma))));
  }

  vec3 hash33(vec3 p) {
    float n = sin(dot(p, vec3(7, 157, 113)));
    return fract(vec3(2097152, 262144, 32768) * n);
  }

  vec3 blur(sampler2D sp, vec2 uv, vec2 blurScale) {
    vec3 col = vec3(0.0);
    float accum = 0.0;
    float weight;
    vec2 offset;

    for (int x = -samples / 2; x < samples / 2; ++x) {
      for (int y = -samples / 2; y < samples / 2; ++y) {
        offset = vec2(x, y);
        weight = gaussian(offset);
        col += texture2D(sp, uv + blurScale * offset).rgb * weight;
        accum += weight;
      }
    }

    return col / accum;
  }

  void main() {
    vec2 uv = (gl_FragCoord.xy - 0.5 * u_resolution.xy) / u_resolution.y;
    uv *= scale;
    vec2 mouse = u_mouse * scale;

    vec2 ps = vec2(1.0) / u_resolution.xy;
    vec2 bufferUv = gl_FragCoord.xy / u_resolution.xy;
    vec2 o = mouse * .2 + vec2(.65, .5);
    float d = .98;
    bufferUv = d * (bufferUv - o);
    bufferUv += o;
    bufferUv += vec2(sin((u_time + uv.y * .5) * 10.) * .001, -.00);

    vec3 fragcolour;
    vec4 tex;
    if (u_renderpass) {
      tex = vec4(blur(u_buffer, bufferUv, ps * blurStrength) * blurMultiplier, 1.);
      float df = length(mouse - uv);
      fragcolour = vec3(0.64, 0.87, 1.0) * smoothstep(circleSize, 0., df);
    } else {
      tex = texture2D(u_buffer, bufferUv, 2.) * .98;
      tex = vec4(
        smoothstep(0.0, threshold - fwidth(tex.x), tex.x),
        smoothstep(0.2, threshold - fwidth(tex.y) + .2, tex.y),
        smoothstep(-0.05, threshold - fwidth(tex.z) - .2, tex.z),
        1.);
      vec3 n = hash33(vec3(uv, u_time * .1));
      tex.rgb += n * .12 - .06;
      tex.rgb = mix(vec3(1.0), vec3(0.72, 0.9, 1.0), tex.rgb * 0.65);
    }

    gl_FragColor = vec4(fragcolour, 1.0);
    gl_FragColor += tex;
    gl_FragColor.a = .38;
  }
`;

function createNoiseTexture() {
  const size = 256;
  const data = new Uint8Array(size * size * 4);

  for (let index = 0; index < data.length; index += 4) {
    data[index] = Math.random() * 255;
    data[index + 1] = Math.random() * 255;
    data[index + 2] = Math.random() * 255;
    data[index + 3] = 255;
  }

  const texture = new THREE.DataTexture(data, size, size, THREE.RGBAFormat);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.minFilter = THREE.LinearFilter;
  texture.magFilter = THREE.LinearFilter;
  texture.needsUpdate = true;

  return texture;
}

export function TimelineGlowField() {
  const hostRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const host = hostRef.current;

    if (!host) {
      return;
    }

    const hostElement = host;
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: false, powerPreference: "low-power" });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.4));
    renderer.setClearColor(0xffffff, 0);
    hostElement.appendChild(renderer.domElement);

    const camera = new THREE.Camera();
    camera.position.z = 1;
    const scene = new THREE.Scene();
    const geometry = new THREE.PlaneGeometry(2, 2);
    const noiseTexture = createNoiseTexture();
    let rtTexture = new THREE.WebGLRenderTarget(1, 1);
    let rtTexture2 = new THREE.WebGLRenderTarget(1, 1);
    const mouse = { x: 0, y: 0 };

    const uniforms = {
      u_time: { value: 1 },
      u_resolution: { value: new THREE.Vector2(1, 1) },
      u_noise: { value: noiseTexture },
      u_buffer: { value: rtTexture.texture },
      u_mouse: { value: new THREE.Vector2(0, 0) },
      u_renderpass: { value: false }
    };

    const material = new THREE.ShaderMaterial({
      uniforms,
      vertexShader,
      fragmentShader,
      transparent: true
    });
    (material as unknown as { extensions: { derivatives: boolean } }).extensions.derivatives = true;

    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    function resize() {
      const rect = hostElement.getBoundingClientRect();
      const width = Math.max(1, Math.floor(rect.width));
      const height = Math.max(1, Math.floor(rect.height));
      const targetWidth = Math.max(1, Math.floor(width * 0.22));
      const targetHeight = Math.max(1, Math.floor(height * 0.22));

      renderer.setSize(width, height, false);
      uniforms.u_resolution.value.set(renderer.domElement.width, renderer.domElement.height);
      rtTexture.dispose();
      rtTexture2.dispose();
      rtTexture = new THREE.WebGLRenderTarget(targetWidth, targetHeight);
      rtTexture2 = new THREE.WebGLRenderTarget(targetWidth, targetHeight);
      uniforms.u_buffer.value = rtTexture.texture;
    }

    function onPointerMove(event: PointerEvent) {
      const rect = hostElement.getBoundingClientRect();
      const ratio = rect.height / Math.max(rect.width, 1);

      mouse.x = (event.clientX - rect.left - rect.width / 2) / Math.max(rect.width, 1) / Math.max(ratio, 0.1);
      mouse.y = (event.clientY - rect.top - rect.height / 2) / Math.max(rect.height, 1) * -1;
    }

    let frame = 0;
    let lastRender = 0;
    let isVisible = true;

    function renderTexture() {
      const originalResolution = uniforms.u_resolution.value.clone();
      uniforms.u_resolution.value.set(rtTexture.width, rtTexture.height);
      uniforms.u_buffer.value = rtTexture2.texture;
      uniforms.u_renderpass.value = true;

      renderer.setRenderTarget(rtTexture);
      renderer.render(scene, camera);
      renderer.setRenderTarget(null);

      const buffer = rtTexture;
      rtTexture = rtTexture2;
      rtTexture2 = buffer;

      uniforms.u_buffer.value = rtTexture.texture;
      uniforms.u_resolution.value.copy(originalResolution);
      uniforms.u_renderpass.value = false;
    }

    function animate(timestamp: number) {
      if (!isVisible) {
        frame = window.requestAnimationFrame(animate);
        return;
      }

      if (timestamp - lastRender < 33) {
        frame = window.requestAnimationFrame(animate);
        return;
      }

      lastRender = timestamp;
      uniforms.u_mouse.value.x += (mouse.x - uniforms.u_mouse.value.x) * 0.1;
      uniforms.u_mouse.value.y += (mouse.y - uniforms.u_mouse.value.y) * 0.1;
      uniforms.u_time.value = timestamp * 0.0005;
      renderer.render(scene, camera);
      renderTexture();
      frame = window.requestAnimationFrame(animate);
    }

    resize();
    const observer = new IntersectionObserver(([entry]) => {
      isVisible = entry?.isIntersecting ?? true;
    }, { rootMargin: "240px" });

    observer.observe(hostElement);
    frame = window.requestAnimationFrame(animate);
    window.addEventListener("resize", resize);
    hostElement.addEventListener("pointermove", onPointerMove, { passive: true });

    return () => {
      window.cancelAnimationFrame(frame);
      observer.disconnect();
      window.removeEventListener("resize", resize);
      hostElement.removeEventListener("pointermove", onPointerMove);
      geometry.dispose();
      material.dispose();
      noiseTexture.dispose();
      rtTexture.dispose();
      rtTexture2.dispose();
      renderer.dispose();
      renderer.domElement.remove();
    };
  }, []);

  return <div className="timeline-glow-field" ref={hostRef} aria-hidden="true" />;
}
