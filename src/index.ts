export {
  FlatTransaction,
  FlatTransactionComparable,
  compareTransaction,
  flattenTransaction,
  findTransaction,
  findTransactionRequired,
  filterTransactions,
} from './test/transaction';
export { tonTestUtilsMatchers, setUpTonTestUtils } from './test/vitest';
export { randomAddress } from './utils/randomAddress';
export { compile } from './utils/compile';
export { executeTill, executeFrom } from './utils/stepByStep';

import { type TonTestUtilsMatchers } from './test/vitest';
import { Assertion } from 'vitest';

declare module '@vitest/expect' {
  interface Assertion<T = any> extends TonTestUtilsMatchers<T> {}
  interface AsymmetricMatchersContaining extends TonTestUtilsMatchers {}
}
