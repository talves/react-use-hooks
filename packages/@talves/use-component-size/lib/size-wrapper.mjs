import { useEffect, useRef, createElement } from "react";
import { default as useComponentSize } from "./use-component-size.mjs";

const SizeWrapper = ({ children, onSizeChange, ...props }) => {
  const wrapperRef = useRef(null);
  const componentSize = useComponentSize(wrapperRef); // A custom Hook

  useEffect(() => {
    if (typeof onSizeChange === "function") {
      onSizeChange(componentSize);
    }
  }, [componentSize]);

  // Removing jsx allows us to NOT have to transform our module
  // microbundle lib/size-wrapper.mjs -o dist -f esm --jsx createElement --no-compress --no-sourcemap
  // return (
  //   <div ref={wrapperRef} {...props}>
  //     {children}
  //   </div>
  // );

  return createElement(
    "div",
    {
      ref: wrapperRef,
      ...props,
    },
    children
  );
};

export default SizeWrapper;
