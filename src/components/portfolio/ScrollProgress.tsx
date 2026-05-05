import { useEffect, useState } from "react";

export function ScrollProgress() {
  const [p, setP] = useState(0);
  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement;
      const max = h.scrollHeight - h.clientHeight;
      setP(max > 0 ? (h.scrollTop || document.body.scrollTop) / max : 0);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <div className="fixed left-0 top-0 z-[100] h-[3px] w-full bg-transparent">
      <div
        className="h-full origin-left bg-gradient-to-r from-[#aeefff] via-[#d8b4fe] to-[#fbcfe8] transition-[width] duration-100"
        style={{ width: `${p * 100}%` }}
      />
    </div>
  );
}
