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
      const COUNT_NEAR = reduceMotion ? 28 : isMobile ? 70 : 160;
      const COUNT_FAR = reduceMotion ? 12 : isMobile ? 26 : 70;

      const scene = new THREE.Scene();
      scene.fog = new THREE.Fog(new THREE.Color("#ffffff"), 10, 40);
      const camera = new THREE.PerspectiveCamera(60, el.clientWidth / el.clientHeight, 0.1, 100);
      camera.position.z = 14;

      const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: !isMobile, powerPreference: "low-power" });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, isMobile ? 1.25 : 1.75));
      renderer.setSize(el.clientWidth, el.clientHeight);
      renderer.setClearColor(0x000000, 0);
      el.appendChild(renderer.domElement);

      const palette = [new THREE.Color("#aeefff"), new THREE.Color("#d8b4fe"), new THREE.Color("#fbcfe8"), new THREE.Color("#c6f6d5")];
      const createField = (count: number, spread: { x: number; y: number; z: number }, speedScale: number) => {
        const positions = new Float32Array(count * 3);
        const colors = new Float32Array(count * 3);
        const speeds = new Float32Array(count * 3);
        const sizes = new Float32Array(count);

        for (let i = 0; i < count; i++) {
          positions[i * 3] = (Math.random() - 0.5) * spread.x;
          positions[i * 3 + 1] = (Math.random() - 0.5) * spread.y;
          positions[i * 3 + 2] = (Math.random() - 0.5) * spread.z;

          const c = palette[(i + Math.floor(Math.random() * palette.length)) % palette.length];
          colors[i * 3] = c.r;
          colors[i * 3 + 1] = c.g;
          colors[i * 3 + 2] = c.b;

          // Slightly bias movement to feel "cinematic" instead of noisy.
          speeds[i * 3] = ((Math.random() - 0.5) * 0.008 + 0.0015) * speedScale;
          speeds[i * 3 + 1] = (Math.random() - 0.5) * 0.007 * speedScale;
          speeds[i * 3 + 2] = (Math.random() - 0.5) * 0.004 * speedScale;

          sizes[i] = 0.22 + Math.random() * 0.55;
        }

        const geom = new THREE.BufferGeometry();
        geom.setAttribute("position", new THREE.BufferAttribute(positions, 3));
        geom.setAttribute("color", new THREE.BufferAttribute(colors, 3));
        geom.setAttribute("size", new THREE.BufferAttribute(sizes, 1));

        return { geom, speeds, spread, count };
      };

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

      const near = createField(COUNT_NEAR, { x: 30, y: 20, z: 16 }, reduceMotion ? 0.25 : 1);
      const far = createField(COUNT_FAR, { x: 52, y: 34, z: 42 }, reduceMotion ? 0.18 : 0.55);

      const materialNear = new THREE.PointsMaterial({
        size: 0.44,
        vertexColors: true,
        map: sprite,
        transparent: true,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
        sizeAttenuation: true,
        opacity: 0.92,
      });
      const materialFar = new THREE.PointsMaterial({
        size: 0.7,
        vertexColors: true,
        map: sprite,
        transparent: true,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
        sizeAttenuation: true,
        opacity: 0.35,
      });

      const pointsNear = new THREE.Points(near.geom, materialNear);
      const pointsFar = new THREE.Points(far.geom, materialFar);
      pointsFar.position.z = -6;
      scene.add(pointsFar);
      scene.add(pointsNear);

      const mouse = { x: 0, y: 0 };
      const onMove = (e: MouseEvent) => {
        mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
        mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;
      };
      const allowPointerParallax = !isMobile && !reduceMotion;
      if (allowPointerParallax) window.addEventListener("mousemove", onMove);

      let raf = 0;
      let visible = true;
      let inView = true;
      let last = 0;
      const minFrameMs = reduceMotion ? 1000 / 18 : 1000 / 60;

      const render = () => {
        const tickField = (field: typeof near) => {
          const arr = field.geom.attributes.position.array as Float32Array;
          for (let i = 0; i < field.count; i++) {
            arr[i * 3] += field.speeds[i * 3];
            arr[i * 3 + 1] += field.speeds[i * 3 + 1];
            arr[i * 3 + 2] += field.speeds[i * 3 + 2];

            const bx = field.spread.x / 2;
            const by = field.spread.y / 2;
            const bz = field.spread.z / 2;
            if (arr[i * 3] > bx) arr[i * 3] = -bx;
            if (arr[i * 3] < -bx) arr[i * 3] = bx;
            if (arr[i * 3 + 1] > by) arr[i * 3 + 1] = -by;
            if (arr[i * 3 + 1] < -by) arr[i * 3 + 1] = by;
            if (arr[i * 3 + 2] > bz) arr[i * 3 + 2] = -bz;
            if (arr[i * 3 + 2] < -bz) arr[i * 3 + 2] = bz;
          }
          field.geom.attributes.position.needsUpdate = true;
        };

        tickField(near);
        tickField(far);

        if (!reduceMotion) {
          pointsNear.rotation.y += 0.00045;
          pointsFar.rotation.y -= 0.0002;
        }

        const targetX = allowPointerParallax ? mouse.x * 1.15 : 0;
        const targetY = allowPointerParallax ? mouse.y * 0.7 : 0;
        camera.position.x += (targetX - camera.position.x) * 0.03;
        camera.position.y += (targetY - camera.position.y) * 0.03;
        camera.lookAt(0, 0, 0);

        renderer.render(scene, camera);
      };

      const loop = (t: number) => {
        if (visible && inView && t - last >= minFrameMs) {
          last = t;
          render();
        }
        raf = requestAnimationFrame(loop);
      };
      loop(performance.now());

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
        near.geom.dispose();
        far.geom.dispose();
        materialNear.dispose();
        materialFar.dispose();
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
