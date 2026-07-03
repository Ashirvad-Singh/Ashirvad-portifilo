import { FloatingDock } from "@/components/ui/floating-dock";
import {
  IconHome,
  IconBriefcase,
  IconUser,
  IconTools,
  IconMail,
  IconBrandGithub,
  IconCode,
} from "@tabler/icons-react";

export function FloatingNav() {
  const links = [
    {
      title: "Home",
      icon: <IconHome className="h-full w-full" />,
      href: "#top",
    },
    {
      title: "Projects",
      icon: <IconCode className="h-full w-full" />,
      href: "#projects",
    },
    {
      title: "Experience",
      icon: <IconBriefcase className="h-full w-full" />,
      href: "#experience",
    },
    {
      title: "About",
      icon: <IconUser className="h-full w-full" />,
      href: "#about",
    },
    {
      title: "Skills",
      icon: <IconTools className="h-full w-full" />,
      href: "#skills",
    },
    {
      title: "Contact",
      icon: <IconMail className="h-full w-full" />,
      href: "#contact",
    },
    {
      title: "GitHub",
      icon: <IconBrandGithub className="h-full w-full" />,
      href: "https://github.com/",
    },
  ];

  return (
    <div className="fixed bottom-6 right-6 z-[100] md:bottom-8 md:left-1/2 md:right-auto md:-translate-x-1/2 md:px-0 pointer-events-auto">
      {/* 
        For mobile, it is positioned bottom-right.
        For desktop, it is centered at the bottom.
      */}
      <FloatingDock items={links} desktopClassName="shadow-[0_20px_60px_-15px_rgba(0,0,0,0.3)]" />
    </div>
  );
}
