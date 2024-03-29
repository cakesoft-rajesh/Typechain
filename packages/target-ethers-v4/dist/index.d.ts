import { BytecodeWithLinkReferences, Config, Contract, FileDescription, TypeChainTarget } from 'typechain';
export interface IEthersCfg {
    outDir?: string;
}
export default class Ethers extends TypeChainTarget {
    name: string;
    private readonly outDirAbs;
    private readonly contractCache;
    private readonly bytecodeCache;
    constructor(config: Config);
    transformFile(file: FileDescription): FileDescription[] | void;
    transformBinFile(file: FileDescription): FileDescription[] | void;
    transformAbiOrFullJsonFile(file: FileDescription): FileDescription[] | void;
    genContractTypingsFile(contract: Contract): FileDescription;
    genContractFactoryFile(contract: Contract, abi: any, bytecode?: BytecodeWithLinkReferences): {
        path: string;
        contents: string;
    };
    afterRun(): FileDescription[];
}
