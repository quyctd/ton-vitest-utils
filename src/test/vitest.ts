import { Address, Cell, Slice } from '@ton/core';
import { compareTransactionForTest } from './transaction';
import type { CompareResult } from './interface';
import { compareAddressForTest, compareCellForTest, compareSliceForTest } from './comparisons';
import { FlatTransactionComparable } from './transaction';
import { ExpectStatic, afterAll as vitestAfterAll } from 'vitest';

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

export const setUpTonTestUtils = (expect: ExpectStatic) => {
  expect.extend(tonTestUtilsMatchers);
};

export const tonTestUtilsMatchers = {
  toHaveTransaction,
  transaction: toHaveTransaction,
  toEqualCell,
  equalCell: toEqualCell,
  toEqualAddress,
  equalAddress: toEqualAddress,
  toEqualSlice,
  equalSlice: toEqualSlice,
};

export interface TonTestUtilsMatchers<R = unknown> {
  toHaveTransaction: (cmp: FlatTransactionComparable) => R;
  toEqualCell: (cell: Cell) => R;
  toEqualAddress: (address: Address) => R;
  toEqualSlice: (slice: Slice) => R;
  transaction: (cmp: FlatTransactionComparable) => R;
  equalCell: (cell: Cell) => R;
  equalAddress: (address: Address) => R;
  equalSlice: (slice: Slice) => R;
}
