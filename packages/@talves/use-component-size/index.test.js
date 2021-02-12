import React, { useState, forwardRef, createRef } from "react";
import { render } from "@testing-library/react";
import { renderHook, act } from "@testing-library/react-hooks";
import "@testing-library/jest-dom/extend-expect";
import { useComponentSize } from "./dist/use-component-size.modern";

const RenderItem = forwardRef(({ ...props }, ref) => {
  // console.log(`props: ${JSON.stringify(props, null, 2)}`)
  return (
    <div data-testid="item" ref={ref} {...props}>
      {props.children}
    </div>
  );
});

test("should return size of component", () => {
  const itemRef = createRef();
  const api = render(
    <RenderItem ref={itemRef} style={{ width: 500 }}>
      This is just a test
    </RenderItem>
  );
  const {
    getByTestId,
    rerender: componentRerender,
    unmount: componentUnmount,
  } = api;
  // console.log(`api: ${''}`,api)

  const { result, rerender, unmount } = renderHook((ref) =>
    useComponentSize(ref)
  );
  act(() => {
    // Change the viewport to 500px.
    window.innerWidth = 500;
    window.innerHeight = 500;

    // Trigger the window resize event.
    window.dispatchEvent(new Event("resize"));
  });
  rerender(itemRef);

  expect(result.current.width).toBe(0);
  expect(result.current.height).toBe(0);
  expect(result.current.scrollWidth).toBe(0);
  expect(result.current.scrollHeight).toBe(0);

  expect(getByTestId("item")).toHaveTextContent("This is just a test");
  act(() => {
    // Change the viewport to 500px.
    window.innerWidth = 500;
    window.innerHeight = 500;

    // Trigger the window resize event.
    window.dispatchEvent(new Event("resize"));
  });

  componentRerender();
  rerender(itemRef);

  // console.log(`result: ${JSON.stringify(result.current, null, 2)}`)
  expect(result.current.width).toBe(0);
  expect(result.current.height).toBe(0);
  expect(result.current.scrollWidth).toBe(0);
  expect(result.current.scrollHeight).toBe(0);

  componentUnmount();
  expect(itemRef.current).toBe(null);
  unmount();
});
