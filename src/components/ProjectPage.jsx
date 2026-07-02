"use client";

import { useRef } from "react";
import TextReveal from "./TextReveal";
import gsap, { useGSAP, ScrollTrigger } from "@/libs/gsap";
import useViewTransition from "@/hooks/useViewTransition";

const ProjectPage = ({ project, nextProject }) => {
  const containerRef = useRef(null);
  const imgRef = useRef(null);
  const footerContainerRef = useRef(null);
  const footerRef = useRef(null);
  const buttonRef = useRef(null);
  const upRef = useRef(null);
  const downRef = useRef(null);
  const navigateTo = useViewTransition();

  useGSAP(
    () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: footerContainerRef.current,
          start: "top top",
          end: "center top",
          scrub: true,
          pin: true,
          pinSpacing: false,
        },
      });
      const sections = gsap.utils.toArray("section");

      gsap.to(imgRef.current, {
        clipPath: "inset(0 0 0% 0)",
        duration: 1.2,
        ease: "expo.out",
        delay: 0.5,
        scale: 1,
      });

      sections.forEach((section, idx) => {
        const container = section.children[0];

        gsap.to(container, {
          rotate: 0,
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top bottom",
            end: "top 20%",
            scrub: true,
          },
        });

        if (idx === sections.length - 1) return;

        ScrollTrigger.create({
          trigger: section,
          start: "bottom bottom",
          end: "bottom top",
          pin: true,
          pinSpacing: false,
        });
      });
      gsap.set(buttonRef.current, {
        opacity: 0,
        y: 40,
      });
      tl.to(footerRef.current, {
        clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
      });
      tl.to(
        buttonRef.current,
        {
          opacity: 1,
          y: 0,
          ease: "power3.out",
        },
        ">-0.2",
      );
    },
    { scope: containerRef },
  );

  const handleEnter = () => {
    gsap.to(upRef.current, {
      yPercent: -120,
      duration: 0.5,
      ease: "power3.out",
    });
    gsap.to(downRef.current, {
      yPercent: -100,
      duration: 0.5,
      ease: "power3.out",
    });
  };

  const handleExit = () => {
    gsap.to(upRef.current, {
      yPercent: 0,
      duration: 0.5,
      ease: "power3.out",
    });
    gsap.to(downRef.current, {
      yPercent: 0,
      duration: 0.5,
      ease: "power3.out",
    });
  };

  const handleClick = () => {
    navigateTo.navigateTo(`/project/${nextProject.slug}`);
  };
  return (
    <>
      <main ref={containerRef}>
        <section className="h-screen w-full">
          <div className="sectionContainer h-full w-full flex pt-[7rem] pb-[4rem] px-[3rem] ">
            <div className="firstSegment  w-[10%] h-full ">
              <TextReveal delay=".2" splitBy="chars">
                <h3 className="text-[2rem]">{project.number}</h3>
              </TextReveal>
            </div>
            <div className="secondSegment h-[90%] w-[30%]">
              <div className="imgDiv overflow-hidden h-full w-full">
                <img
                  ref={imgRef}
                  style={{
                    clipPath: "inset(0 0 100% 0)",
                  }}
                  className="h-full w-full object-cover scale-[1.7]"
                  src={project.coverImage}
                  alt={project.title}
                />
              </div>
            </div>
            <div className="thirdSegment pl-[8rem] h-[90%] w-[60%] flex flex-col justify-end">
              <div className="heading">
                <TextReveal delay=".68" splitBy="chars" ease="power4.out">
                  <h1 className="text-[5rem] leading-[1.2]">{project.title}</h1>
                </TextReveal>
              </div>
              <div className="subHeading flex gap-14">
                <TextReveal delay=".82" splitBy="words">
                  <h1 className="text-[2rem]">{project.subtitle}</h1>
                </TextReveal>
                <TextReveal delay=".82" splitBy="chars">
                  <h1 className="text-[2rem]">{project.year}</h1>
                </TextReveal>
              </div>
              <div className="description mt-[2rem] w-[70%] ">
                <TextReveal delay=".82" splitBy="lines">
                  <p>{project.description}</p>
                </TextReveal>
              </div>
            </div>
          </div>
        </section>
        {project.gallery.map((elem, idx) => {
          return (
            <section key={idx} className="h-screen w-full ">
              <div
                style={{ transformOrigin: "bottom left" }}
                className="sectionContainer rotate-[30deg] h-full w-full"
              >
                <img className="h-full w-full object-cover" src={elem} alt="" />
              </div>
            </section>
          );
        })}
        <footer
          ref={footerContainerRef}
          className="relative h-[175vh] w-full  relative"
        >
          <div
            ref={footerRef}
            className=" w-[80%] h-[20rem] bg-[#101010] absolute top-[50vh] left-1/2 -translate-x-1/2 -translate-y-1/2 flex justify-center items-center"
            style={{
              clipPath: "polygon(18% 72%, 80% 72%, 100% 100%, 0% 100%)",
            }}
          >
            <div
              onMouseEnter={handleEnter}
              onMouseLeave={handleExit}
              onClick={handleClick}
              ref={buttonRef}
              className="nextButton cursor-default h-[2.8rem] w-[5rem] border-0 bg-white overflow-hidden flex flex-col justify-center items-center"
            >
              <div
                ref={upRef}
                className="absolute inset-0  flex justify-center items-center"
              >
                <TextReveal splitBy="chars">
                  <h3>NEXT</h3>
                </TextReveal>
              </div>

              <div
                ref={downRef}
                className="absolute inset-0 translate-y-full flex justify-center items-center"
              >
                <TextReveal ref={downRef} splitBy="chars">
                  <h3>NEXT</h3>
                </TextReveal>
              </div>
            </div>
          </div>
        </footer>
        ;
      </main>
    </>
  );
};

export default ProjectPage;
