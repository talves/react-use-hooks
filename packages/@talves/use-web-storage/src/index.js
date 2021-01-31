import { useState, useEffect } from "react";

function storageAvailable(type) {
  if (typeof window === "undefined") return false;
  /* types: ["sessionStorage ", "localStorage "] */
  const types = ["sessionStorage ", "localStorage "];
  if (!types.includes(type)) return false;
  /* Taken from Mozilla example. See readme for ref */
  let storage;
  try {
    storage = window[type];
    const x = "__storage_test__";
    storage.setItem(x, x);
    storage.removeItem(x);
    return true;
  } catch (e) {
    return (
      e instanceof DOMException &&
      // everything except Firefox
      (e.code === 22 ||
        // Firefox
        e.code === 1014 ||
        // test name field too, because code might not be present
        // everything except Firefox
        e.name === "QuotaExceededError" ||
        // Firefox
        e.name === "NS_ERROR_DOM_QUOTA_REACHED") &&
      // acknowledge QuotaExceededError only if there's something already stored
      storage &&
      storage.length !== 0
    );
  }
}

const hasLocalStorage = storageAvailable("localStorage");
const hasSessionStorage = storageAvailable("sessionStorage");

const useWebStorage = (
  key,
  initialValue,
  options = { type: "localStorage" }
) => {
  /* options are optional, so default to 'localStorage' */
  const { type } = options;
  const hasStorage = storageAvailable(type);
  const [storage, setStorage] = useState(hasStorage ? window[type] : null);

  const [storedValue, setStoredValue] = useState(() => {
    if (!hasStorage) return initialValue;
    try {
      const storedItem = storage.getItem(key);
      return storedItem ? JSON.parse(storedItem) : initialValue;
    } catch (error) {
      console.error(error);
      return initialValue;
    }
  });

  /* value can be string || Function */
  const setValue = (value) => {
    try {
      const valueToStore =
        typeof value === "function" ? value(storedValue) : value;
      setStoredValue(valueToStore);
      storage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.error(error);
    }
  };

  const handleStorageEvent = (event) => {
    const { key, oldValue, newValue, url, storageArea } = event;
    console.log(`new storage [${type}]:`, event);
  };

  useEffect(() => {
    if (!hasStorage) return;
    window.addEventListener("storage", handleStorageEvent);
    return window.removeEventListener("storage", handleStorageEvent);
  }, []);

  return [storedValue, setValue];
};

export { useWebStorage, hasLocalStorage, hasSessionStorage };
