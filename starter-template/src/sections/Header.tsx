"use client";
import { useEffect, useState } from "react";
export const Header = () => {
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    const sectionIds = ["home", "projects", "about", "contact"];
    const observers: IntersectionObserver[] = [];
    sectionIds.forEach((id) => {
      const section = document.getElementById(id);
      if (!section) return;
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setActiveSection(id);
          }
        },
        {
          threshold: 0.1, // triggers when 50% of section is visible
        }
      );
      observer.observe(section);
      observers.push(observer);
    });
    return () => {
      observers.forEach((observer) => observer.disconnect());
    };
  }, []);

  const getNavItemClasses = (id: string) => {
    const base = "nav-item";
    const active =
      "bg-white text-gray-900 hover:bg-white/70 hover:text-gray-900";
    return `${base} ${activeSection === id ? active : ""}`;
  };

  return (
    <div className="flex justify-center items-center fixed top-3 w-full z-10">
      <nav className="flex gap-1 p-0.5 border border-white/15 rounded-full bg-white/10 backdrop-blur">
        <a href="#" className={getNavItemClasses("home")}>
          Home
        </a>
        <a href="#projects" className={getNavItemClasses("projects")}>
          Projects
        </a>
        <a href="#about" className={getNavItemClasses("about")}>
          About
        </a>
        <a href="#contact" className={getNavItemClasses("contact")}>
          Contact
        </a>
      </nav>
    </div>
  );
};
