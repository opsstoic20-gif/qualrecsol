"use client";
/* Reveal — fade-up on scroll into view, once. Respects reduced-motion.
   Ported from the Claude Design system (reveal.jsx). */
import React from "react";

const reduced =
  typeof window !== "undefined" &&
  window.matchMedia &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

export const REDUCED = reduced;

export function Reveal({ children, delay = 0, y = 16, as = "div", style = {}, className = "", ...rest }) {
  const ref = React.useRef(null);
  const [shown, setShown] = React.useState(false);

  React.useEffect(() => {
    if (reduced) {
      setShown(true);
      return;
    }
    const node = ref.current;
    if (!node) return;
    const failsafe = setTimeout(() => setShown(true), 1600);
    let io;
    if ("IntersectionObserver" in window) {
      io = new IntersectionObserver(
        ([e]) => {
          if (e.isIntersecting) {
            setShown(true);
            io.disconnect();
          }
        },
        { threshold: 0.15, rootMargin: "0px 0px -8% 0px" }
      );
      io.observe(node);
    } else {
      setShown(true);
    }
    return () => {
      clearTimeout(failsafe);
      if (io) io.disconnect();
    };
  }, []);

  const Tag = as;
  return React.createElement(
    Tag,
    {
      ref,
      className,
      style: {
        opacity: shown ? 1 : 0,
        transform: shown ? "translateY(0)" : `translateY(${y}px)`,
        transition: `opacity 0.5s cubic-bezier(0.16,1,0.3,1) ${delay}ms, transform 0.5s cubic-bezier(0.16,1,0.3,1) ${delay}ms`,
        willChange: "opacity, transform",
        ...style,
      },
      ...rest,
    },
    children
  );
}

export function useInView(threshold = 0.3) {
  const ref = React.useRef(null);
  const [inView, setInView] = React.useState(false);
  React.useEffect(() => {
    if (reduced) {
      setInView(true);
      return;
    }
    const node = ref.current;
    if (!node) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setInView(true);
          io.disconnect();
        }
      },
      { threshold }
    );
    io.observe(node);
    return () => io.disconnect();
  }, []);
  return [ref, inView];
}

export default Reveal;
