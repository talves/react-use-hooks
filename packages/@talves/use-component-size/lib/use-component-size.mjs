import { useState, useCallback, useLayoutEffect } from "react";
import ResizeObserver from "resize-observer-polyfill";

function getSize(el) {
  const size = {
    width: 0,
    height: 0,
    scrollWidth: 0,
    scrollHeight: 0,
  };
  if (el) {
    size.width = el.offsetWidth;
    size.height = el.offsetHeight;
    size.scrollHeight = el.scrollHeight;
    size.scrollWidth = el.scrollWidth;
  }
  return size;
}

function useComponentSize(ref) {
  const [componentSize, setComponentSize] = useState(
    getSize(ref && ref.current)
  );

  const handleResize = useCallback(
    function handleResize() {
      if (ref) {
        setComponentSize(getSize(ref.current));
      }
    },
    [ref]
  );

  useLayoutEffect(() => {
    const currentRef = ref && ref.current;
    let resizeObserver = null;
    handleResize(); // setInitial size; usually (0,0)

    if (currentRef) {
      resizeObserver = new ResizeObserver(() => handleResize());
      resizeObserver.observe(currentRef);
    }
    return function cleanup() {
      if (currentRef) {
        resizeObserver.disconnect(currentRef);
        resizeObserver = null;
      }
    };
  }, [ref, handleResize]);

  return componentSize;
}

export default useComponentSize;
