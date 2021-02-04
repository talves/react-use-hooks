import { h } from "preact";
import { useEffect } from "preact/compat";
import { useWebStorage } from "@talves/use-web-storage";

export default (props) => {
  const [bgColor, setBgColor] = useWebStorage("background-color", "#FFE000");

  useEffect(() => {
    console.log(bgColor);
  }, [bgColor]);

  const handleColorChange = (event) => {
    setBgColor(event.target.value);
  };

  return (
    <div class="py-6 bg-default flex md:flex-col lg:flex-row justify-center sm:py-12">
      <div class="w-full lg:w-1/4">{/* Placeholder for sidebar */}</div>
      <div class="w-full lg:w-1/2">
        <div class="mt-4">
          <h2 class="text-3xl mb-4">useWebStorage</h2>
          <span class="text-2xl text-gray-700">Color Change</span>
        </div>
        <label class="block">
          <span class="text-gray-700">Color</span>
          <input
            class="form-input mt-1 block w-full"
            placeholder="Enter value"
            onChange={handleColorChange}
            value={bgColor}
          />
        </label>
        <pre
          class="border-blue-100 border-2 p-4"
          style={{ backgroundColor: bgColor }}
        >
          {JSON.stringify(bgColor, null, 2)}
        </pre>
      </div>
      <div class="w-full lg:w-1/4">{/* Placeholder for sidebar */}</div>
    </div>
  );
};
