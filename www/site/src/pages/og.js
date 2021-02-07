import { h } from "preact";
import queryString from "query-string";
import { Box } from "../components/Box.js";
import LogoIcon from "../components/icons/logo-icon.js";

// http://localhost:3000/og?title=Hello%20this%20is%20just%20a%20title&name=Tony%20Alves%20(@talves)&slug=/use-web-storage&tag=react-hooks&tag=react

const location =
  typeof window !== "undefined" && window.location ? window.location : null;

function getFontSize(length) {
  if (length > 55) {
    return `text-6xl`;
  }
  if (length > 32) {
    return `text-7xl`;
  }
  return `text-8xl`;
}

export default (props) => {
  if (!location || !location.search) return null;
  const data = queryString.parse(location.search);
  console.log(location.search);
  const {
    name = "Tony Alves",
    id = "og-image",
    title = "No Title Yet!",
    tag = ["none", "yet"],
    mode = "default",
    width = 1200, // 1024
    height = 630, // 512
    borderWidth = 16,
    slug = "",
  } = data;

  const textColor = `primary`;
  const tags = typeof tag === "string" ? [tag] : tag;

  return (
    <Box id={id} style={{ width: parseInt(width), height: parseInt(height) }}>
      <div
        className="relative flex flex-col justify-between px-8 pt-16 pb-8 space-y-8 bg-gray-100 border-primary-300 shadow-md"
        style={{
          width: parseInt(width),
          height: parseInt(height),
          borderWidth: parseInt(borderWidth),
        }}
      >
        <div className="absolute top-0 right-0 mt-6 mr-6">
          <LogoIcon
            primaryColor={"#1E2E34"}
            secondaryColor={"#527b8e"}
            sx={{ width: "100px" }}
          />
        </div>
        <div className="max-w-screen-lg">
          <heading
            noMargin
            className={`${getFontSize(title.length)} text-indigo-800`}
          >
            {title}
          </heading>
        </div>
        <div className="flex justify-between">
          <div className="flex items-center space-x-6">
            <img
              src="https://pbs.twimg.com/profile_images/458694078817792000/Xq83C8iN_400x400.png"
              alt={name}
              className="flex-none w-32 h-32 rounded-full shadow-md handsome"
            />
            <div className="flex flex-col text-primary-700">
              <p className="text-2xl font-open-sans">
                <span className="path">{name}</span>
              </p>
              <p className="text-4xl font-semibold font-open-sans">
                use-hooks.alves.dev
              </p>
              <p className="text-2xl font-open-sans">
                <span className="path">{slug}</span>
              </p>
            </div>
          </div>
          <Box className="relative">
            <Box
              as="ul"
              className="absolute bottom-0 right-0 text-primary-900 ml-2 flex list-none"
            >
              {tags &&
                tags.map((tag) => (
                  <li
                    key={tag}
                    class="font-semibold mx-1 relative border-primary-300 p-1 border-2 rounded-md bg-gray-500"
                  >
                    <span class="whitespace-nowrap">{tag}</span>
                  </li>
                ))}
            </Box>
          </Box>
        </div>
      </div>
    </Box>
  );
};
