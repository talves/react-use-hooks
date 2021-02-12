import { useState } from "react";
import { renderHook, act } from "@testing-library/react-hooks/native";
import { usePrevious } from "@talves/use-previous";

test("should return undefined initial value and previous set value", () => {
  const { result, rerender } = renderHook(() => {
    const [value, setValue] = useState(0);
    return {
      value,
      setValue,
      prevValue: usePrevious(value),
    };
  });
  expect(result.current.prevValue).toBe(undefined);

  act(() => {
    result.current.setValue(result.current.value + 1);
  });
  expect(result.current.prevValue).toBe(0);
  expect(result.current.value).toBe(1);

  act(() => {
    result.current.setValue(22);
  });
  expect(result.current.prevValue).toBe(1);
  expect(result.current.value).toBe(22);
});
