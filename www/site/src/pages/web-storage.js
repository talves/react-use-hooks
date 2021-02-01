import { h } from "preact";
import { useState, useEffect } from "preact/compat";
import { useWebStorage } from "@talves/use-web-storage";

export default (props) => {
  const [storageType, setStorageType] = useState("sessionStorage");
  const [storage, setStorage, setType] = useWebStorage(
    "test-data",
    { site: "tony.alves.dev" },
    { type: storageType }
  );

  useEffect(() => {
    console.log(`type: ${storageType}`);
    setType(storageType);
  }, [storageType]);

  const handleChangeEvent = (e) => {
    setStorage({ site: e.target.value });
  };

  const onChangeType = (event) => {
    console.log(event.target.value);
    setStorageType(event.target.value);
  };

  return (
    <div>
      <div onChange={onChangeType}>
        <input
          type="radio"
          value="localStorage"
          name="storageType"
          checked={storageType === "localStorage"}
        />
        {" localStorage"}
        <input
          type="radio"
          value="sessionStorage"
          name="storageType"
          checked={storageType === "sessionStorage"}
        />
        {" sessionStorage"}
      </div>
      <input onChange={handleChangeEvent} value={storage ? storage.site : ""} />
      {storage && <pre>{JSON.stringify(storage, null, 2)}</pre>}
    </div>
  );
};
