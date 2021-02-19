<div align="center">
<h1>@talves/use-component-size</h1>
<p>React hook (usePrevious)</p>
</div>

<hr />

## Installation

This module is distributed via [npm][npm] which is bundled with [node][node] and
should be installed as one of your project's `dependencies`:

```
npm install --save @talves/use-component-size
```

OR

```
yarn add @talves/use-component-size
```

## Usage

```js
/* using react ^17.0.1 */
// Creates a component that runs onSizeChange of the component
// only when the component size changed, give current and previous
import { useRef, useCallback, useEffect } from "react";
import { useComponentSize } from "@talves/use-component-size";
import { usePrevious } from "@talves/use-previous";

function sizeEqual(a, b) {
  return JSON.stringify(a) === JSON.stringify(b);
}

const SizeWrapper = ({ children, onSizeChange, ...props }) => {
  const wrapperRef = useRef(null);
  const componentSize = useComponentSize(wrapperRef); // A custom Hook
  const previousSize = usePrevious(componentSize);

  const handleSizeChange = useCallback(
    (size) => {
      if (typeof onSizeChange === "function") {
        onSizeChange(size);
      }
    },
    [onSizeChange]
  );
  useEffect(() => {
    const notEqual = !sizeEqual(componentSize, previousSize);
    if (notEqual) {
      handleSizeChange({
        current: componentSize,
        previous: previousSize,
      });
    }
  }, [componentSize, previousSize, handleSizeChange]);

  return (
    <div ref={wrapperRef} {...props}>
      {children}
    </div>
  );
};

export default SizeWrapper;
```

NOTE: This is a `module` package library for react with jsx. The choice is to resolve the export of main to `src/index.js`. There is a commonjs version in `dist/cjs/index.js` if someone needed.

## Other Solutions

Plenty of other usePrevious hooks out there.

[npm]: https://www.npmjs.com/
[node]: https://nodejs.org/
