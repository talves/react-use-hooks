import { useState } from "react";
import { renderHook, act } from "@testing-library/react-hooks/native";
import { useWebStorage } from "./src/index";

test("should return undefined initial value and previous set value", () => {
  const { result, rerender } = renderHook(() => {
    const [storage, setStorage] = useWebStorage("__test__", 0);
    return {
      storage,
      setStorage,
    };
  });
  expect(result.current.storage).toBe(0);

  act(() => {
    result.current.setStorage(result.current.storage + 1);
  });
  expect(result.current.storage).toBe(1);

  act(() => {
    result.current.setStorage(22);
  });
  expect(result.current.storage).toBe(22);
});
