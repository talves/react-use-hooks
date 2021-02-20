import { renderHook, act } from "@testing-library/react-hooks";
import { useWindowSize } from "@talves/use-window-size";

test("should return new size of window", () => {
  const { result, unmount } = renderHook(() => useWindowSize());

  expect(result.current.width).toBe(1024);
  expect(result.current.height).toBe(768);

  act(() => {
    // Change the viewport to 500px.
    window.innerWidth = 500;
    window.innerHeight = 500;

    // Trigger the window resize event.
    window.dispatchEvent(new Event("resize"));
  });
  // React testing library should be able to use the following, but it errors
  // so we wrap window.dispatchEvent with act as seen above.
  // https://github.com/testing-library/react-testing-library/issues/463
  // import { fireEvent } from '@testing-library/react'
  // fireEvent(window, new Event('resize'))

  // console.log(`result: ${JSON.stringify(result.current, null, 2)}`)
  expect(result.current.width).toBe(500);
  expect(result.current.height).toBe(500);

  // Unmount to force the cleanup (removes listener)
  unmount();
});
