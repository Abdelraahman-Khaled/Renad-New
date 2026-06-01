"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/*
  Site-wide scroll animations. Mounted once in the root layout.
  Auto-animates section headings and card grids as they enter the viewport —
  no per-component markup required. Respects prefers-reduced-motion and
  re-initializes on route changes.
*/
export default function ScrollAnimations() {
  const pathname = usePathname();

  useEffect(() => {
    if (
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return;
    }

    const ctx = gsap.context(() => {
      // Headings + eyebrows + lead paragraphs (skip the hero, it has its own motion)
      const headings = gsap.utils
        .toArray("main h1, main h2")
        .filter((el) => !el.closest("#top"));

      headings.forEach((el) => {
        const block = el.parentElement || el;
        gsap.from(block.children.length <= 4 ? block.children : el, {
          opacity: 0,
          y: 28,
          duration: 0.7,
          ease: "power3.out",
          stagger: 0.08,
          scrollTrigger: { trigger: el, start: "top 88%", once: true },
        });
      });

      // Card grids — stagger their children in
      gsap.utils.toArray("main .grid").forEach((grid) => {
        if (grid.closest("#top")) return; // skip hero
        const items = Array.from(grid.children);
        if (items.length < 2 || items.length > 14) return;
        gsap.from(items, {
          opacity: 0,
          y: 32,
          duration: 0.6,
          ease: "power2.out",
          stagger: 0.09,
          scrollTrigger: { trigger: grid, start: "top 85%", once: true },
        });
      });
    });

    // Recalculate trigger positions once images/fonts settle
    const t = setTimeout(() => ScrollTrigger.refresh(), 400);
    window.addEventListener("load", () => ScrollTrigger.refresh());

    return () => {
      clearTimeout(t);
      ctx.revert();
    };
  }, [pathname]);

  return null;
}
