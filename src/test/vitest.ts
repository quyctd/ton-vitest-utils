import { expect } from 'vitest';

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

expect.extend({
  toHaveTransaction,
  transaction: toHaveTransaction,
  toEqualCell,
  equalCell: toEqualCell,
  toEqualAddress,
  equalAddress: toEqualAddress,
  toEqualSlice,
  equalSlice: toEqualSlice,
});
