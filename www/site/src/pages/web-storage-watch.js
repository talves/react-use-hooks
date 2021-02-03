import { h } from "preact";
import { useState, useEffect } from "preact/compat";
import { useWebStorage } from "@talves/use-web-storage";

export default (props) => {
  const [storage, setStorage, storageType, setStorageType] = useWebStorage(
    "test-data",
    { site: "tony.alves.dev" },
    { type: "sessionStorage" }
  );

  useEffect(() => {
    console.log(storage);
  }, [storage]);

  const handleChangeEvent = (event) => {
    console.log(event.target.value, storage.site);
    if (event.target.value !== storage.site) {
      setStorage({ site: event.target.value });
    }
  };

  const onChangeType = (event) => {
    console.log(event.target.value);
    setStorageType(event.target.value);
  };

  return (
    <div className="App">
      <h1>useWebStorage</h1>
      <h2>Start editing to see some magic happen!</h2>
      <div onChange={onChangeType}>
        <label>
          <input
            type="radio"
            value="localStorage"
            name="storageType"
            defaultChecked={storageType === "localStorage"}
          />
          <span>localStorage</span>
        </label>
        <label>
          <input
            type="radio"
            value="sessionStorage"
            name="storageType"
            defaultChecked={storageType === "sessionStorage"}
          />
          <span>sessionStorage</span>
        </label>
      </div>
      <label>
        <span class="text-gray-700">Site </span>
        <input
          placeholder={`Enter value for ${storageType}`}
          onChange={handleChangeEvent}
          value={storage.site}
        />
      </label>
      {storage && (
        <pre className="storage">{JSON.stringify(storage, null, 2)}</pre>
      )}
    </div>
  );
};
