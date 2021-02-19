import { useState, useEffect, useCallback } from "react";

const WebStorageTypes = ["sessionStorage", "localStorage"];

function storageAvailable(storageType) {
  if (typeof window === "undefined") return false;
  if (!WebStorageTypes.includes(storageType)) return false;
  /* Taken from Mozilla example. See readme for ref */
  let webStorage;
  try {
    webStorage = window[storageType];
    const x = "__storage_test__";
    webStorage.setItem(x, x);
    webStorage.removeItem(x);
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
      webStorage &&
      webStorage.length !== 0
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
  const [storageType, setStorageType] = useState(
    options && WebStorageTypes.includes(options.type)
      ? options.type
      : "localStorage"
  );
  const [hasStorage, setHasStorage] = useState(storageAvailable(storageType));

  const getValue = useCallback(() => {
    if (!hasStorage) return initialValue;
    const webStorage = window[storageType];
    try {
      let storedItem = webStorage.getItem(key);
      // console.log(
      //   `Checking for stored value from ${storageType} [${key}]:`,
      //   storedItem
      // );
      /* Set the initial value in webStorage if it wasn't set prior */
      if (storedItem === null) {
        storedItem = JSON.stringify(initialValue);
        webStorage.setItem(key, storedItem);
      }
      return JSON.parse(storedItem);
    } catch (error) {
      console.error(error);
      return initialValue;
    }
  }, [key, initialValue, hasStorage, storageType]);

  const [storedValue, setStoredValue] = useState(getValue);

  /* value can be string || Function */
  const setValue = useCallback(
    (value) => {
      try {
        const webStorage = window[storageType];
        const valueToStore =
          typeof value === "function" ? value(storedValue) : value;
        setStoredValue(valueToStore);
        if (hasStorage) webStorage.setItem(key, JSON.stringify(valueToStore));
      } catch (error) {
        console.error(error);
      }
    },
    [storageType, hasStorage]
  );

  const setType = (newType) => {
    if (newType === storageType) return;
    if (WebStorageTypes.includes(newType)) {
      setStorageType(newType);
    }
  };

  /* Set up listener for WebStorage on this hook instance */
  useEffect(() => {
    // only setup for localStorage, sessionStorage doesn't change accross instances
    if (!hasStorage || storageType === "sessionStorage") return;
    function handleStorageEvent(event) {
      const {
        key: eventKey,
        newValue /* oldValue, url, storageArea */,
      } = event;
      /* if this key is the same, set the useState */
      if (eventKey === key) setStoredValue(JSON.parse(newValue));
    }
    window.addEventListener("storage", handleStorageEvent);
    return () => window.removeEventListener("storage", handleStorageEvent);
  }, [key, storageType]);

  useEffect(() => {
    if (!storageType) return;
    const available = storageAvailable(storageType);
    setHasStorage(available);
    setStoredValue(getValue());
  }, [storageType]);

  return [storedValue, setValue, storageType, setType];
};

export { useWebStorage, hasLocalStorage, hasSessionStorage };
