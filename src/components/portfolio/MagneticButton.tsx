import { useRef, type ButtonHTMLAttributes, type ReactNode } from "react";
import { gsap } from "gsap";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: "primary" | "ghost";
}

export function MagneticButton({ children, variant = "primary", className = "", ...rest }: Props) {
  const ref = useRef<HTMLButtonElement>(null);

  const onMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const x = e.clientX - (r.left + r.width / 2);
    const y = e.clientY - (r.top + r.height / 2);
    gsap.to(el, { x: x * 0.3, y: y * 0.3, duration: 0.4, ease: "power3.out" });
  };
  const onLeave = () => {
    gsap.to(ref.current, { x: 0, y: 0, duration: 0.6, ease: "elastic.out(1,0.4)" });
  };

  const styles =
    variant === "primary"
      ? "bg-foreground text-background hover:shadow-[0_20px_50px_-15px_rgba(0,0,0,0.4)]"
      : "glass-strong text-foreground hover:bg-white/80";

  return (
    <button
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      data-cursor="hover"
      className={`group relative inline-flex items-center justify-center gap-2 rounded-full px-7 py-3.5 text-sm font-medium transition-shadow ${styles} ${className}`}
      {...rest}
    >
      {children}
    </button>
  );
}
