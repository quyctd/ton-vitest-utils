export {};

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

declare module 'vitest' {
  type Assertion<T = any> = CustomMatchers<T>;
  interface AsymmetricMatchersContaining extends CustomMatchers {}
}
