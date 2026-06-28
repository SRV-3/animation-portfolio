"use client";

import { useRef, forwardRef, useImperativeHandle } from "react";
import gsap, { ScrollTrigger, SplitText, useGSAP } from "@/libs/gsap";
const TextReveal = forwardRef(
  (
    {
      children,
      className = "",
      trigger = "mount",
      scrollStart = "top 75%",
      splitBy = "lines",
      duration = 0.67,
      stagger = 0.085,
      delay = 0,
      ease = "power3.out",
    },
    ref,
  ) => {
    const wrapperRef = useRef(null);
    const splitRef = useRef(null);
    const tlRef = useRef(null);

    useImperativeHandle(ref, () => ({
      play: () => {
        tlRef.current?.play();
      },
      reset: () => {
        tlRef.current?.pause(0);
      },
      reverse: () => {
        tlRef.current?.reverse();
      },
    }));

    useGSAP(() => {
      splitRef.current = new SplitText(wrapperRef.current, {
        type: splitBy,
        lineThreshold: 0.3,
      });

      const elements = splitRef.current[splitBy];

      gsap.set(elements, {
        yPercent: 110,
      });

      tlRef.current = gsap.timeline({
        paused: true,
        defaults: {
          delay,
        },
      });

      tlRef.current.to(elements, {
        yPercent: 0,
        opacity: 1,
        duration,
        ease,
        stagger: {
          each: stagger,
          from: "start",
        },
      });

      if (trigger === "mount") {
        tlRef.current.play();
      }

      if (trigger === "scroll") {
        ScrollTrigger.create({
          trigger: wrapperRef.current,
          start: scrollStart,
          once: true,
          onEnter: () => {
            tlRef.current?.play();
          },
        });
      }
    });

    return (
      <div ref={wrapperRef} className={`overflow-hidden ${className}`}>
        {children}
      </div>
    );
  },
);

export default TextReveal;
