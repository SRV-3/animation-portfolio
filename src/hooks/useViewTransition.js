"use client";

import gsap from "@/libs/gsap";
import { useRouter } from "next/navigation";
import { useCallback } from "react";

const stripCount = 5;

const createStrip = () => {
  const overlay = document.createElement("div");
  overlay.id = "page-overlay";
  overlay.style.cssText = `
    position:fixed;
    z-index:999;
    inset:0;
    display:flex;
  `;
  for (let i = 0; i < stripCount; i++) {
    const strip = document.createElement("div");
    strip.classList.add("page-strip");
    strip.style.cssText = `
      flex:1;
      background-color: #010101;
      height:100%;
      transform:scaleY(0);
      transform-origin:bottom;
    `;
    overlay.appendChild(strip);
  }

  document.body.appendChild(overlay);
  return overlay;
};

const removeOverlay = () => {
  if (typeof document === "undefined") return;
  const el = document.getElementById("page-overlay");
  if (el) el.remove();
};

const useViewTransition = () => {
  removeOverlay();
  const router = useRouter();

  const navigateTo = useCallback(
    (href) => {
      const overlay = createStrip();
      const strips = Array.from(overlay.children);

      gsap.to(strips, {
        scaleY: 1,
        duration: 0.58,
        ease: "power3.inOut",
        stagger: {
          each: 0.06,
          from: "start",
        },
        onComplete: () => {
          (console.log("start"), router.push(href));
          gsap.to(strips, {
            scaleY: 0,
            duration: 0.59,
            ease: "power3.inOut",
            delay: 0.1,
            stagger: {
              each: 0.06,
              from: "start",
            },
            transformOrigin: "bottom",
            onComplete: removeOverlay,
          });
        },
      });
    },
    [router],
  );
  return { navigateTo };
};

export default useViewTransition;
