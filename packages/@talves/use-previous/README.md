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
import usePrevious from '@talves/use-previous'

function ourFunctionalComponent({ value = 0 }) {
  const [state, setState] = React.useState({ count: value })
  const previousValue = usePrevious(value)

  React.useEffect(() => {
    setState({ count: value })
  }, [value])

  // prevousState is now the last value
  ...
}
```

## Other Solutions

Plenty of other usePrevious hooks out there.
