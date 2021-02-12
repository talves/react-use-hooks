import { useState } from "react";
import { renderHook, act } from "@testing-library/react-hooks/native";
import {
  useWebStorage,
  hasLocalStorage,
  hasSessionStorage,
} from "@talves/use-web-storage";

test("should return sessionStorage as default (no options)", () => {
  const { result, rerender } = renderHook(() => {
    const [storage, setStorage] = useWebStorage("__test__", 0);
    return {
      storage,
      setStorage,
      hasLocalStorage,
      hasSessionStorage,
    };
  });
  expect(result.current.hasLocalStorage).toBe(true);
  expect(result.current.hasSessionStorage).toBe(true);
  /* defaults to localStorage */
  expect(window.sessionStorage.getItem("__test__")).toBe(null);
  expect(window.localStorage.getItem("__test__")).toBe("0");
  expect(result.current.storage).toBe(0);

  act(() => {
    result.current.setStorage(result.current.storage + 1);
  });
  expect(result.current.storage).toBe(1);

  act(() => {
    result.current.setStorage(99);
  });
  expect(result.current.storage).toBe(99);
});

test("should return value based on options.type (defaults localStorage)", () => {
  const { result, rerender } = renderHook(() => {
    const [options, setOptions] = useState(null);
    const [storage, setStorage, storageType, setStorageType] = useWebStorage(
      "__test__",
      0,
      options
    );
    return {
      storage,
      setStorage,
      hasLocalStorage,
      hasSessionStorage,
    };
  });
  expect(result.current.hasLocalStorage).toBe(true);
  expect(result.current.hasSessionStorage).toBe(true);
  /* defaults to localStorage */
  expect(window.sessionStorage.getItem("__test__")).toBe(null);
  /* gets the value set in last test from local storage */
  expect(window.localStorage.getItem("__test__")).toBe("99");
  expect(result.current.storage).toBe(99);
  expect(window.localStorage.getItem("__test__")).toBe("99");

  act(() => {
    result.current.setStorage(result.current.storage + 1);
  });
  expect(result.current.storage).toBe(100);
  expect(window.localStorage.getItem("__test__")).toBe("100");

  act(() => {
    result.current.setStorage(999);
  });
  expect(result.current.storage).toBe(999);
});
