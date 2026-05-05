import { useEffect, useRef, useState } from "react";

export function HeroBackground() {
  const mount = useRef<HTMLDivElement>(null);
  const [ready, setReady] = useState(false);

  // Wait until in view + idle to spin up Three.js
  useEffect(() => {
    const el = mount.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setReady(true);
          io.disconnect();
        }
      },
      { rootMargin: "100px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!ready) return;
    const el = mount.current;
    if (!el) return;

    let cancelled = false;
    let cleanup: (() => void) | undefined;

    (async () => {
      const THREE = await import("three");
      if (cancelled || !el) return;

      const isMobile = window.matchMedia("(max-width: 768px)").matches;
      const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const COUNT = reduceMotion ? 30 : isMobile ? 50 : 120;

      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(60, el.clientWidth / el.clientHeight, 0.1, 100);
      camera.position.z = 14;

      const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: !isMobile, powerPreference: "low-power" });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, isMobile ? 1.25 : 1.75));
      renderer.setSize(el.clientWidth, el.clientHeight);
      renderer.setClearColor(0x000000, 0);
      el.appendChild(renderer.domElement);

      const palette = [new THREE.Color("#aeefff"), new THREE.Color("#d8b4fe"), new THREE.Color("#fbcfe8")];
      const positions = new Float32Array(COUNT * 3);
      const colors = new Float32Array(COUNT * 3);
      const speeds = new Float32Array(COUNT * 3);

      for (let i = 0; i < COUNT; i++) {
        positions[i * 3] = (Math.random() - 0.5) * 28;
        positions[i * 3 + 1] = (Math.random() - 0.5) * 18;
        positions[i * 3 + 2] = (Math.random() - 0.5) * 12;
        const c = palette[i % palette.length];
        colors[i * 3] = c.r;
        colors[i * 3 + 1] = c.g;
        colors[i * 3 + 2] = c.b;
        speeds[i * 3] = (Math.random() - 0.5) * 0.008;
        speeds[i * 3 + 1] = (Math.random() - 0.5) * 0.008;
        speeds[i * 3 + 2] = (Math.random() - 0.5) * 0.004;
      }

      const geom = new THREE.BufferGeometry();
      geom.setAttribute("position", new THREE.BufferAttribute(positions, 3));
      geom.setAttribute("color", new THREE.BufferAttribute(colors, 3));

      const canvas = document.createElement("canvas");
      canvas.width = canvas.height = 64;
      const ctx2 = canvas.getContext("2d")!;
      const grd = ctx2.createRadialGradient(32, 32, 0, 32, 32, 32);
      grd.addColorStop(0, "rgba(255,255,255,1)");
      grd.addColorStop(0.4, "rgba(255,255,255,0.6)");
      grd.addColorStop(1, "rgba(255,255,255,0)");
      ctx2.fillStyle = grd;
      ctx2.fillRect(0, 0, 64, 64);
      const sprite = new THREE.CanvasTexture(canvas);

      const material = new THREE.PointsMaterial({
        size: 0.42,
        vertexColors: true,
        map: sprite,
        transparent: true,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
        sizeAttenuation: true,
        opacity: 0.9,
      });
      const points = new THREE.Points(geom, material);
      scene.add(points);

      const mouse = { x: 0, y: 0 };
      const onMove = (e: MouseEvent) => {
        mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
        mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;
      };
      if (!isMobile) window.addEventListener("mousemove", onMove);

      let raf = 0;
      let visible = true;
      let inView = true;

      const render = () => {
        const arr = geom.attributes.position.array as Float32Array;
        for (let i = 0; i < COUNT; i++) {
          arr[i * 3] += speeds[i * 3];
          arr[i * 3 + 1] += speeds[i * 3 + 1];
          arr[i * 3 + 2] += speeds[i * 3 + 2];
          if (arr[i * 3] > 14) arr[i * 3] = -14;
          if (arr[i * 3] < -14) arr[i * 3] = 14;
          if (arr[i * 3 + 1] > 9) arr[i * 3 + 1] = -9;
          if (arr[i * 3 + 1] < -9) arr[i * 3 + 1] = 9;
        }
        geom.attributes.position.needsUpdate = true;
        points.rotation.y += 0.0004;
        points.rotation.x = mouse.y * 0.08;
        camera.position.x += (mouse.x * 1.2 - camera.position.x) * 0.04;
        camera.lookAt(scene.position);
        renderer.render(scene, camera);
      };

      const loop = () => {
        if (visible && inView) render();
        raf = requestAnimationFrame(loop);
      };
      loop();

      const onVis = () => {
        visible = !document.hidden;
      };
      document.addEventListener("visibilitychange", onVis);

      const io = new IntersectionObserver(
        (entries) => {
          inView = entries[0].isIntersecting;
        },
        { threshold: 0 },
      );
      io.observe(el);

      const onResize = () => {
        if (!el) return;
        camera.aspect = el.clientWidth / el.clientHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(el.clientWidth, el.clientHeight);
      };
      window.addEventListener("resize", onResize);

      cleanup = () => {
        cancelAnimationFrame(raf);
        window.removeEventListener("mousemove", onMove);
        window.removeEventListener("resize", onResize);
        document.removeEventListener("visibilitychange", onVis);
        io.disconnect();
        geom.dispose();
        material.dispose();
        sprite.dispose();
        renderer.dispose();
        if (renderer.domElement.parentNode === el) el.removeChild(renderer.domElement);
      };
    })();

    return () => {
      cancelled = true;
      cleanup?.();
    };
  }, [ready]);

  return <div ref={mount} className="absolute inset-0 -z-10" aria-hidden />;
}
