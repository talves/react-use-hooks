import { useState, useLayoutEffect } from "react";

function getWindowSize() {
  const width = typeof window !== "undefined" ? window.innerWidth : 0;
  const height = typeof window !== "undefined" ? window.innerHeight : 0;
  return { width, height };
}

function useWindowSize() {
  const [size, setSize] = useState(getWindowSize());
  const handleResize = () => setSize(getWindowSize());

  useLayoutEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return size;
}

export { useWindowSize };
