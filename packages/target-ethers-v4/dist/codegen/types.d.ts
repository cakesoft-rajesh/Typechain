import { AbiOutputParameter, AbiParameter, EvmOutputType, EvmType, TupleType } from 'typechain';
export declare function generateInputTypes(input: Array<AbiParameter>): string;
export declare function generateOutputTypes(outputs: Array<AbiOutputParameter>): string;
export declare function generateInputType(evmType: EvmType): string;
export declare function generateOutputType(evmType: EvmOutputType): string;
export declare function generateTupleType(tuple: TupleType, generator: (evmType: EvmType) => string): string;
/**
 * always return an array type; if there are named outputs, merge them to that type
 * this generates slightly better typings fixing: https://github.com/ethereum-ts/TypeChain/issues/232
 **/
export declare function generateOutputComplexType(components: AbiOutputParameter[]): string;
