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
    setType(storageType);
  }, [storageType]);

  const handleChangeEvent = (e) => {
    setStorage({ site: e.target.value });
  };

  const onChangeType = (event) => {
    setStorageType(event.target.value);
  };

  return (
    <div class="py-6 bg-default flex md:flex-col lg:flex-row justify-center sm:py-12">
      <div class="w-full lg:w-1/4">{/* Placeholder for sidebar */}</div>
      <div class="w-full lg:w-1/2">
        <div class="mt-4">
          <span class="text-gray-700">Web Storage Type</span>
          <div class="mt-2" onChange={onChangeType}>
            <label class="inline-flex items-center">
              <input
                type="radio"
                class="form-radio"
                value="localStorage"
                name="storageType"
                defaultChecked={storageType === "localStorage"}
              />
              <span class="ml-2">localStorage</span>
            </label>
            <label class="inline-flex items-center ml-6">
              <input
                type="radio"
                class="form-radio"
                value="sessionStorage"
                name="storageType"
                defaultChecked={storageType === "sessionStorage"}
              />
              <span class="ml-2">sessionStorage</span>
            </label>
          </div>
        </div>
        <label class="block">
          <span class="text-gray-700">Site</span>
          <input
            class="form-input mt-1 block w-full"
            placeholder="Enter value"
            onChange={handleChangeEvent}
            value={storage ? storage.site : ""}
          />
        </label>

        {storage && (
          <pre class="border-blue-100 bg-yellow-50">
            {JSON.stringify(storage, null, 2)}
          </pre>
        )}
      </div>
      <div class="w-full lg:w-1/4">{/* Placeholder for sidebar */}</div>
    </div>
  );
};
