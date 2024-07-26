<p align="center">
  <img src="public/ton-vitest.svg" alt="TON-vitest-utils" width="200" />
</p>

<h1 align="center">
  ⚡️ TON Vitest Utils ⚡️
</h1>

This package is a fork of [test-utils](https://github.com/ton-community/test-utils) with support for [Vitest](https://vitest.dev/).
It contains all the same functionality as the original package, such as `randomAddress`. But, a lot faster ⚡️

## Features

- ⚡️ **Performance**: Native [Vite](https://vitejs.dev/) & [Vitest](https://vitest.dev/) support
- 🛠️ **Lightning Compilation**: Extended caching layer on top of blueprint compilation for better performance
- 💪 **Multithread**: Even faster compilation with multithreading support by default
- 📦 **Small Bundle Size**: No jest or chai dependencies, only Vitest
- 🧪 **Test**: Type definitions for TypeScript
- 🚀 **Easy**: Simple setup, just follow the [usage](#usage) instructions

## Installation

```
yarn add ton-vitest-utils -D
```

or

```
npm i --save-dev ton-vitest-utils
```

## Usage

Import the setup function from `ton-vitest-utils` (in your [tests setup file](https://vitest.dev/config/#setupfiles)), then pass Vitest's `expect` method into that function to init the matchers:

```typescript
// tests/vitest.setup.ts
import { setUpTonTestUtils } from 'ton-vitest-utils';
import { expect } from 'vitest';

setUpTonTestUtils(expect);
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

Now all the matchers are available to use in your tests:

```typescript
test('should pass', () => {
  expect(1).toHaveTransaction(1);
  expect(1).toEqualAddress(1);
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

To compile contracts in your tests, use our `compile` function instead of `blueprint`'s.

Our `compile` function is a wrapper around `blueprint`'s `compile` that is optimized for `vitest` and includes some performance enhancements.

```diff
- import { compile } from '@ton/blueprint';
+ import { compile } from 'ton-vitest-utils';
```

### Transaction matcher notice

The transaction matcher (`.toHaveTransaction`) can only perform matching on transactions with descriptions of type `generic`. When matching an array of transactions, all transactions of other types will be filtered out. When matching a single transaction of non-generic type, an exception will be thrown.

# Benchmarks

Setup: MacBook Pro (16-inch, M2 Pro, 2023). Perform on 192 test cases of our internal contracts.

| Package                     | Time      |
| --------------------------- | --------- |
| @ton/test-utils             | 93s       |
| ton-vitest-utils (no cache) | **20.8s** |
| ton-vitest-utils (caching)  | **7.62s** |

Overall, this package can perform **3-10x faster** than the `@ton/test-utils` package.

## License

This package is released under the [MIT License](LICENSE).
