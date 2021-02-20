<div align="center">
<h1>@talves/use-window-size</h1>
<p>React hook (usePrevious)</p>
</div>

<hr />

## Installation

This module is distributed via [npm][npm] which is bundled with [node][node] and
should be installed as one of your project's `dependencies`:

```
npm install --save @talves/use-window-size
```

OR

```
yarn add @talves/use-window-size
```

## Usage

```js
/* using react ^17.0.1 */
import { useEffect } form 'react'
import { useWindowSize } from '@talves/use-window-size'

import useWindowSize from '@talves/use-window-size'

function ourFunctionalComponent({ ...props }) {
  const size = useWindowSize()

  React.useEffect(() => {
    // Do something with the size
  }, [size])

  ...
}
```

NOTE: This is a `module` package library for react using window. The choice is to resolve the import to `lib/index.mjs`. There is a commonjs version in `dist/lib/use-window-size.js` if someone needed.

## Other Solutions

Plenty of other hooks out there.

[npm]: https://www.npmjs.com/
[node]: https://nodejs.org/
