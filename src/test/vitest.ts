import { Address, Cell, Slice } from '@ton/core';

import { compareTransactionForTest } from './transaction';
import type { CompareResult } from './interface';
import { compareAddressForTest, compareCellForTest, compareSliceForTest } from './comparisons';
import { FlatTransactionComparable } from './transaction';

function wrapComparer<T>(comparer: (subject: any, cmp: T) => CompareResult) {
  return function (this: any, cmp: T) {
    const result = comparer(this._obj, cmp);
    this.assert(result.pass, result.posMessage(), result.negMessage());
  };
}

const toHaveTransaction = wrapComparer(compareTransactionForTest);
const toEqualCell = wrapComparer(compareCellForTest);
const toEqualAddress = wrapComparer(compareAddressForTest);
const toEqualSlice = wrapComparer(compareSliceForTest);

try {
  const chai = require('chai');

  if (chai)
    chai.use((chai: Chai.ChaiStatic) => {
      const Assertion = chai.Assertion;
      Assertion.addMethod('toHaveTransaction', toHaveTransaction);
      Assertion.addMethod('toEqualCell', toEqualCell);
      Assertion.addMethod('toEqualAddress', toEqualAddress);
      Assertion.addMethod('toEqualSlice', toEqualSlice);
      Assertion.addMethod('transaction', toHaveTransaction);
      Assertion.addMethod('equalCell', toEqualCell);
      Assertion.addMethod('equalAddress', toEqualAddress);
      Assertion.addMethod('equalSlice', toEqualSlice);
    });
} catch (e) {}

declare global {
  export namespace Chai {
    interface Assertion {
      toHaveTransaction: (cmp: FlatTransactionComparable) => void;
      toEqualCell: (cell: Cell) => void;
      toEqualAddress: (address: Address) => void;
      toEqualSlice: (slice: Slice) => void;
      transaction(cmp: FlatTransactionComparable): void;
      equalCell(cell: Cell): void;
      equalAddress(address: Address): void;
      equalSlice(slice: Slice): void;
    }
  }
}
