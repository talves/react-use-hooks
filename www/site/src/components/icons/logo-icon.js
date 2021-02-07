import { h } from "preact";

const LogoIcon = (props) => {
  const {
    sx,
    rotate = 0,
    secondaryColor = "#000000",
    primaryColor = "#405567",
  } = props;
  const rotateDeg = `rotate(${parseInt(rotate)})`;

  return (
    <svg
      style={sx}
      focusable="false"
      viewBox="0 0 800 800"
      transform={rotateDeg}
      ariaHidden="true"
    >
      <path
        id="top"
        fill={secondaryColor}
        fillRule="evenodd"
        d="M221,95c29.197,46.469,55.102,96.232,84,143C234.042,351.045,165.076,466.07,92,577 C134.588,415.917,177.843,255.513,221,95z"
      />
      <path
        id="bottom"
        fill={secondaryColor}
        fillRule="evenodd"
        d="M93,578c132.156-5.176,265.554-9.114,398-14c29.498,46.835,57.094,95.573,84,145 C415.544,665.454,93.113,579.22,93,578z"
      />
      <path
        id="dart"
        fill={primaryColor}
        fillRule="evenodd"
        d="M711,218c-37,69.188-89.557,159.473-120,212c-166.559,49.111-334.391,96.936-499,148 c120.591-116.712,252.584-241.273,378-360C544.432,218.543,626.884,218.389,711,218z"
      />
    </svg>
  );
};

export default LogoIcon;
