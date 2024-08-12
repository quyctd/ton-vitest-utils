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
- 📦 **Small Bundle Size**: No jest or chai dependencies, only Vitest
- 🧪 **Type Safe**: Type definitions for TypeScript
- 🚀 **Easy**: Simple setup, just follow the [usage](#usage) instructions

## Installation

```
yarn add vitest ton-vitest-utils -D
```

or

```
npm i --save-dev vitest ton-vitest-utils
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
    environment: 'node',
    globals: true,
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
    "types": ["vitest/globals", "ton-vitest-utils"]
  }
}
```

### ⚠️ Compile Note

To compile contracts in your tests, use our `compile` function instead of `blueprint`'s.

Our `compile` function is a wrapper around `blueprint`'s `compile` that is make it compatible with `vitest` and includes some performance enhancements.

```diff
- import { compile } from '@ton/blueprint';
+ import { compile } from 'ton-vitest-utils';
```

### Transaction matcher notice

The transaction matcher (`.toHaveTransaction`) can only perform matching on transactions with descriptions of type `generic`. When matching an array of transactions, all transactions of other types will be filtered out. When matching a single transaction of non-generic type, an exception will be thrown.

# Benchmarks

Setup: MacBook Pro (16-inch, M2 Pro, 2023).

Performed on various contracts to compare the performance of `@ton/test-utils` and `ton-vitest-utils`.

| Contract                                                                                     | @ton/test-utils | _ton-vitest-utils_ |
| -------------------------------------------------------------------------------------------- | --------------- | ------------------ |
| [Multisig Contract v2](https://github.com/ton-blockchain/multisig-contract-v2)               | 29.071s         | **8.36s**          |
| [Highload Wallet Contract v3](https://github.com/ton-blockchain/highload-wallet-contract-v3) | 9.83s           | **5.30s**          |
| [Tonkeeper Wallet v5 Contract](https://github.com/tonkeeper/w5)                              | 14.06s          | **6.55s**          |
| [Hipo Finance contract](https://github.com/HipoFinance/contract)                             | 53.808s         | **34.80s**         |
| [Ton Raffles - NFT Launchpad contract](https://github.com/Ton-Raffles/nft_launchpad_v1)      | 44.663s         | **28.89s**         |

Overall, this package can perform **2-5x faster** than the `@ton/test-utils` package.

## License

This package is released under the [MIT License](LICENSE).
