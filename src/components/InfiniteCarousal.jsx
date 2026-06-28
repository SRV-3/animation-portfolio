import { useEffect, useRef } from "react";
import CarousalCard from "./CarousalCard";
import gsap from "@/libs/gsap";

const CARD_H = 420;
const CARD_W = 300;
const SCALE = 1.2;
const CARD_GAP = 27;

const DURATION = 20;

const TRACK_H = CARD_H * SCALE;

const InfiniteCarousal = ({ projects }) => {
  const trackRef = useRef(null);
  const tweenRef = useRef(null);
  const singleWidth = projects.length * (CARD_W + CARD_GAP);

  useEffect(() => {
    // const singleWidth = trackRef.current.scrollWidth / 2;
    // console.log(singleWidth);

    gsap.set(trackRef.current, {
      x: 0,
    });

    tweenRef.current = gsap.to(trackRef.current, {
      x: -singleWidth,
      repeat: -1,
      duration: DURATION,
      ease: "none",
    });

    return () => {
      tweenRef.current?.kill();
    };
  }, [projects]);

  const double = [...projects, ...projects];

  return (
    <div
      style={{
        padding: `${TRACK_H * 0.2}px 0 ${TRACK_H * 0.2}px 0`,
      }}
      className="overflow-hidden"
    >
      <div
        ref={trackRef}
        style={{
          gap: `${CARD_GAP}px`,
          width: `${singleWidth}px`,
          height: `${TRACK_H}px`,
        }}
        className="track flex items-center"
      >
        {double.map((project, i) => (
          <CarousalCard
            key={i}
            project={project}
            onStart={() => {
              tweenRef.current?.pause();
            }}
            onEnd={() => {
              tweenRef.current?.play();
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default InfiniteCarousal;
