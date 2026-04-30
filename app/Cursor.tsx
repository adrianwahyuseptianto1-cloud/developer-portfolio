"use client";

import { useEffect, useRef } from "react";

export default function Cursor() {
  const cursorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    if (!cursor || window.matchMedia("(pointer: coarse)").matches) return;

    document.body.classList.add("has-custom-cursor");
    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let cursorX = mouseX;
    let cursorY = mouseY;
    let frame = 0;

    const move = (event: MouseEvent) => {
      mouseX = event.clientX;
      mouseY = event.clientY;
    };

    const isHoverTarget = (target: EventTarget | null) =>
      target instanceof Element && Boolean(target.closest("a, button, [data-hover]"));
    const pointerOver = (event: PointerEvent) => {
      if (isHoverTarget(event.target)) cursor.classList.add("is-hovering");
    };
    const pointerOut = (event: PointerEvent) => {
      if (isHoverTarget(event.target)) cursor.classList.remove("is-hovering");
    };

    const render = () => {
      cursorX += (mouseX - cursorX) * 0.22;
      cursorY += (mouseY - cursorY) * 0.22;
      cursor.style.transform = `translate3d(${cursorX}px, ${cursorY}px, 0) translate(-50%, -50%)`;
      frame = window.requestAnimationFrame(render);
    };

    window.addEventListener("mousemove", move);
    document.addEventListener("pointerover", pointerOver);
    document.addEventListener("pointerout", pointerOut);
    render();

    return () => {
      document.body.classList.remove("has-custom-cursor");
      window.removeEventListener("mousemove", move);
      document.removeEventListener("pointerover", pointerOver);
      document.removeEventListener("pointerout", pointerOut);
      window.cancelAnimationFrame(frame);
    };
  }, []);

  return <div className="cursor-dot" ref={cursorRef} aria-hidden="true" />;
}
