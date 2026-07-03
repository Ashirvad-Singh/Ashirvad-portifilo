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
    <div className="fixed bottom-8 left-1/2 z-[100] w-full -translate-x-1/2 px-4 md:w-auto md:px-0 pointer-events-auto">
      {/* 
        For mobile, we use position absolute inside a fixed container so it expands upwards.
        We adjust the container width to be 100% on mobile so the button can be placed on the right,
        but on desktop it auto-sizes.
      */}
      <FloatingDock items={links} desktopClassName="shadow-[0_20px_60px_-15px_rgba(0,0,0,0.3)]" />
    </div>
  );
}
