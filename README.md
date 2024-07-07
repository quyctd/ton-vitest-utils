<p align="center">
  <img src="public/ton-vitest.svg" alt="TON-vitest-utils" width="200" />
</p>

<h1 align="center">
  ⚡️ TON Vitest Utils ⚡️
</h1>

This package is a fork of [test-utils](https://github.com/ton-community/test-utils) with support for [Vitest](https://vitest.dev/).
It contains all the same functionality as the original package, such as `randomAddress`. But, a lot faster ⚡️

## Installation

```
yarn add ton-vitest-utils -D
```

or

```
npm i --save-dev ton-vitest-utils
```

## Usage

Import the matchers from `ton-vitest-utils` once (perferably in your [tests setup file](https://vitest.dev/config/#setupfiles)), then pass them to Vitest's `expect.extend` method:

```typescript
// tests/vitest.setup.ts
import { tonTestUtilsMatchers } from 'ton-vitest-utils';
import { expect } from 'vitest';

expect.extend(tonTestUtilsMatchers);
```

In `vitest.config.ts` or `vite.config.ts`, add the setup file to the `setupFiles` array:

```typescript
// vitest.config.ts
export default defineConfig({
  test: {
    // ...
    setupFiles: ['tests/vitest.setup.ts'],
  },
});
```

Now all the matchers are available to use in your tests without any additional imports:

```typescript
test('should pass', () => {
  expect(1).toHaveTransaction(1);
});
```

## With TypeScript

If you're using TypeScript, import our type definitions into `tsconfig.json` to get autocomplete and type checking:

```json
{
  "compilerOptions": {
    "types": ["ton-vitest-utils"]
  }
}
```

### ⚠️ Compile Note

To compile contracts in your tests, use our `compile` function instead of `blueprint`'s. It is a wrapper of `blueprint`'s `compile` to work with `vitest`.

```diff
- import { compile } from '@ton/blueprint';
+ import { compile } from 'ton-vitest-utils';
```

### Transaction matcher notice

The transaction matcher (`.toHaveTransaction`) can only perform matching on transactions with descriptions of type `generic`. When matching an array of transactions, all transactions of other types will be filtered out. When matching a single transaction of non-generic type, an exception will be thrown.

## License

This package is released under the [MIT License](LICENSE).
