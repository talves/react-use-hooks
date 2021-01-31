<div align="center">
<h1>@talves/use-web-storage</h1>
<p>React hook (useWebStorage)</p>
</div>

<hr />

See [reference][reference] to get aquainted with the Web Storage API

The two mechanisms within Web Storage are as follows:

- `Window.sessionStorage`
- `Window.localStorage`

## Installation

This module is distributed via [npm][npm] which is bundled with [node][node] and
should be installed as one of your project's `dependencies`:

```
npm install --save @talves/use-web-storage
```

OR

```
yarn add @talves/use-web-storage
```

## Usage

```javascript
import { useWebStorage } from "@talves/use-web-storage";

export default (props) => {
  const [storage, setStorage] = useWebStorage(
    "test-data",
    { site: "tony.alves.dev" }
    // { type: "sessionStorage" } // default is "localStorage"
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
```

NOTE: This is a `module` package library for react with jsx. The choice is to resolve the export of main to `src/index.js`. There is a commonjs version in `dist/cjs/index.js` if someone needed.

**IMPORTANT** [(Must Read)][storageevent]: Tracking Changes from other pages/settings.

- `window.addEventListener('storage', function(e) {})` does not track changes on the same page. The reason you use the hook for page state.
- `StorageEvent` is fired whenever a change is made to the Storage object only for `localStorage` changes on different pages of the same domain. (Note that this event is not fired for `sessionStorage` changes)

[reference]: https://developer.mozilla.org/en-US/docs/Web/API/Web_Storage_API/Using_the_Web_Storage_API
[storageevent]: https://developer.mozilla.org/en-US/docs/Web/API/Web_Storage_API/Using_the_Web_Storage_API#responding_to_storage_changes_with_the_storageevent
[mdn-example]: https://github.com/mdn/dom-examples/tree/master/web-storage
[npm]: https://www.npmjs.com/
[node]: https://nodejs.org/
