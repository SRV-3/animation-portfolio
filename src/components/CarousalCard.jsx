import { useRef } from "react";
import TextReveal from "./TextReveal";
import gsap from "@/libs/gsap";

const CARD_H = 420;
const CARD_W = 300;
const SCALE = 1.2;

const CarousalCard = ({ project, onStart, onEnd }) => {
  const cardRef = useRef(null);
  const imgRef = useRef(null);

  const titleRef = useRef(null);
  const numRef = useRef(null);

  const onEnter = () => {
    onStart();

    gsap.to(cardRef.current, {
      width: CARD_W * SCALE,
      height: CARD_H * SCALE,
      duration: 0.4,
      ease: "power3.out",
      overwrite: "auto",
    });

    gsap.to(imgRef.current, {
      scale: 1,
      duration: 0.5,
      ease: "power3.out",
    });

    numRef.current?.play();
    titleRef.current?.play();
  };
  const onLeave = () => {
    onEnd();

    gsap.to(cardRef.current, {
      width: CARD_W,
      height: CARD_H,
      duration: 0.17,
      ease: "power3.out",
      overwrite: "auto",
    });

    gsap.to(imgRef.current, {
      scale: 1.3,
      duration: 0.5,
      ease: "power3.out",
    });

    numRef.current?.reverse();
    titleRef.current?.reverse();
  };
  return (
    <div
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      ref={cardRef}
      style={{
        height: CARD_H,
        width: CARD_W,
        flexShrink: 0,
        overflow: "visible",
        cursor: "pointer",
      }}
      className="relative bg-amber-500"
    >
      {/* title panel */}
      <div
        style={{ bottom: "calc(100% + 1.5rem)" }}
        className="titlePanel absolute left-0 pointer-events-none flex flex-col gap-[.8rem]"
      >
        <TextReveal
          ref={numRef}
          trigger="manual"
          splitBy="chars"
          duration=".25"
        >
          <h3 className="text-[1.2rem] text-[#010101] font-bold">
            {project.number}
          </h3>
        </TextReveal>
        <TextReveal
          ref={titleRef}
          trigger="manual"
          splitBy="words"
          duration=".25"
        >
          <h3 className="text-[1.2rem] text-[#010101] font-medium">
            {project.title}
          </h3>
        </TextReveal>
      </div>
      <div className="imgDiv absolute h-full w-full overflow-hidden">
        <img
          ref={imgRef}
          style={{ transformOrigin: "center center", userSelect: "none" }}
          className="h-full scale-[1.3] w-full object-cover"
          src={project.coverImage}
          alt="title"
        />
      </div>
    </div>
  );
};

export default CarousalCard;
