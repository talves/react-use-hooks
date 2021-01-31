<div align="center">
<h1>@talves/use-previous</h1>
<p>React hook (usePrevious)</p>
</div>

<hr />

## Installation

This module is distributed via [npm][npm] which is bundled with [node][node] and
should be installed as one of your project's `dependencies`:

```
npm install --save @talves/use-previous
```

OR

```
yarn add @talves/use-previous
```

## Usage

```js
/* using react ^17.0.1 */
import { useEffect } form 'react'
import { usePrevious } from '@talves/use-previous'

function ourFunctionalComponent({ value = 0 }) {
  const [state, setState] = React.useState({ count: value })
  const previousValue = usePrevious(value)

  useEffect(() => {
    setState({ count: value })
  }, [value])

  // prevousState is now the last value
  ...
}
```

NOTE: This is a `module` package library for react with jsx. The choice is to resolve the export of main to `src/index.js`. There is a commonjs version in `dist/cjs/index.js` if someone needed.

## Other Solutions

Plenty of other usePrevious hooks out there.

[npm]: https://www.npmjs.com/
[node]: https://nodejs.org/
