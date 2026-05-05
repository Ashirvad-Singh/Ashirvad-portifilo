import { Home, Briefcase, Sparkles, Mail } from "lucide-react";

const items = [
  { href: "#top", icon: Home, label: "Home" },
  { href: "#work", icon: Briefcase, label: "Work" },
  { href: "#skills", icon: Sparkles, label: "Skills" },
  { href: "#contact", icon: Mail, label: "Contact" },
];

export function MobileNav() {
  return (
    <nav className="fixed bottom-4 left-1/2 z-50 flex -translate-x-1/2 items-center gap-1 rounded-full glass-strong px-2 py-2 md:hidden">
      {items.map((it) => (
        <a
          key={it.href}
          href={it.href}
          className="flex flex-col items-center gap-0.5 rounded-full px-4 py-2 text-[10px] font-medium text-foreground/70 transition-colors hover:bg-white/60 hover:text-foreground"
        >
          <it.icon className="h-4 w-4" />
          {it.label}
        </a>
      ))}
    </nav>
  );
}
