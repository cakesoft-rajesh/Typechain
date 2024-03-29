# @typechain/ethers-v4

## 7.0.0

### Patch Changes

- f22f962: Events with multiple positional parameters no longer get "undefined" as argument in `contract.filters`.

  https://github.com/dethcrypto/TypeChain/issues/575

- Updated dependencies [92939ea]
- Updated dependencies [d244e41]
  - typechain@7.0.0

## 6.0.0

### Patch Changes

- Updated dependencies [0ac4921]
- Updated dependencies [95517e9]
- Updated dependencies [33ee803]
  - typechain@6.0.0

## 5.1.0

### Minor Changes

- b3c94a1: Adds overrides introduced by EIP-1559.

## 5.0.0

### Patch Changes

- Updated dependencies [d60a343]
- Updated dependencies [5a60d00]
- Updated dependencies [d60a343]
  - typechain@5.0.0

## 4.0.0

### Major Changes

- 0d4b293: Changed return type of functions from a object with number indexes, to an array merged with object containing
  named outputs.

  Before, solidity function like this:

  ```
  function x() public pure returns (uint256)
  ```

  Generated such method signature:

  ```typescript
  x(overrides?: CallOverrides): Promise<{0: BigNumber}>;
  ```

  New output is:

  ```typescript
  x(overrides?: CallOverrides): Promise<[BigNumber]>;
  ```

  The difference is that now you can use standard array destructuring while working with output types.

### Patch Changes

- db5baa5: Do not generate typings in contract type itself for reserved keywords that would collide with ethers
  internals
