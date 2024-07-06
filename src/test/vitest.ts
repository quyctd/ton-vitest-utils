import { compareTransactionForTest } from './transaction';
import type { CompareResult } from './interface';
import { compareAddressForTest, compareCellForTest, compareSliceForTest } from './comparisons';

interface MatcherResult {
  pass: boolean;
  message: () => string;
  actual?: unknown;
  expected?: unknown;
}

const wrapComparer = <T>(comparer: (subject: any, cmp: T) => CompareResult) => {
  return function (got: any, want: T): MatcherResult {
    const result = comparer(got, want);
    return {
      pass: result.pass,
      message: () => (result.pass ? result.negMessage() : result.posMessage()),
    };
  };
};

const toHaveTransaction = wrapComparer(compareTransactionForTest);
const toEqualCell = wrapComparer(compareCellForTest);
const toEqualAddress = wrapComparer(compareAddressForTest);
const toEqualSlice = wrapComparer(compareSliceForTest);

try {
  const vitest = require('vitest');

  if (vitest)
    vitest.expect.extend({
      toHaveTransaction,
      transaction: toHaveTransaction,
      toEqualCell,
      equalCell: toEqualCell,
      toEqualAddress,
      equalAddress: toEqualAddress,
      toEqualSlice,
      equalSlice: toEqualSlice,
    });
} catch (e) {}

declare global {
  export namespace vitest {
    interface CustomMatchers<R = unknown> {
      toHaveTransaction: () => R;
      transaction: () => R;
      toEqualCell: () => R;
      equalCell: () => R;
      toEqualAddress: () => R;
      equalAddress: () => R;
      toEqualSlice: () => R;
      equalSlice: () => R;
    }

    type Assertion<T = any> = CustomMatchers<T>;
    interface AsymmetricMatchersContaining extends CustomMatchers {}
  }
}
