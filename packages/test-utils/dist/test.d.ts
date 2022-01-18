import { Dictionary } from 'ts-essentials';
/**
 * Asserts values AND types equality.
 * It has some special handling for BigNumber :SHRUG: The reason for this is that I wanted to avoid creating specific functions for bignumbers which would force for me to export BigNumber in types (instead of just having it as generic type) WHICH is always PITA.
 */
export declare function typedAssert<T>(actual: T, expected: T): void;
export declare function isBigNumber(v: any): boolean;
export declare function isBigNumberArray(v: any): v is Array<any>;
export declare function isBigNumberObject(val: any): val is Dictionary<any>;
export declare function q18(n: number): string;
export declare function asyncWithDoneCase(fn: (done: Function) => Promise<any>): (done: Function) => void;
export declare function typeCase(_fn: Function): () => void;
