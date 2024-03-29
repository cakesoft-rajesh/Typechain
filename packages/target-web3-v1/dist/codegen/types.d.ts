import { AbiOutputParameter, AbiParameter, EvmOutputType, EvmType, TupleType } from 'typechain';
export declare function codegenInputTypes(input: AbiParameter[]): string;
export declare function codegenOutputTypes(outputs: AbiOutputParameter[]): string;
export declare function codegenInputType(evmType: EvmType): string;
export declare function codegenOutputType(evmType: EvmOutputType): string;
export declare function codegenTupleType(tuple: TupleType, generator: (evmType: EvmType) => string): string;
