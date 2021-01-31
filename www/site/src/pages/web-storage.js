import { h } from "preact";
import { useWebStorage } from "@talves/use-web-storage";

export default (props) => {
  const [storage, setStorage] = useWebStorage(
    "test-data",
    { site: "tony.alves.dev" }
    // { type: "sessionStorage" }
  );

  const handleChangeEvent = (e) => {
    setStorage({ site: e.target.value });
  };

  return (
    <div>
      <input
        onChange={handleChangeEvent}
        defaultValue={storage ? storage.site : ""}
      />
      {storage && <pre>{JSON.stringify(storage, null, 2)}</pre>}
    </div>
  );
};
