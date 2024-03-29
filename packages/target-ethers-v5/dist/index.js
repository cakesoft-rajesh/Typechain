"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("fs");
const lodash_1 = require("lodash");
const path_1 = require("path");
const typechain_1 = require("typechain");
const codegen_1 = require("./codegen");
const hardhat_1 = require("./codegen/hardhat");
const common_1 = require("./common");
const DEFAULT_OUT_PATH = './types/ethers-contracts/';
class Ethers extends typechain_1.TypeChainTarget {
    constructor(config) {
        super(config);
        this.name = 'Ethers';
        this.contractCache = {};
        this.bytecodeCache = {};
        const { cwd, outDir, allFiles } = config;
        this.outDirAbs = (0, path_1.resolve)(cwd, outDir || DEFAULT_OUT_PATH);
        this.allContracts = allFiles.map((fp) => (0, typechain_1.normalizeName)((0, typechain_1.getFilename)(fp)));
    }
    transformFile(file) {
        const fileExt = (0, typechain_1.getFileExtension)(file.path);
        // For json files with both ABI and bytecode, both the contract typing and factory can be
        // generated at once. For split files (.abi and .bin) we don't know in which order they will
        // be transformed -- so we temporarily store whichever comes first, and generate the factory
        // only when both ABI and bytecode are present.
        if (fileExt === '.bin') {
            return this.transformBinFile(file);
        }
        return this.transformAbiOrFullJsonFile(file);
    }
    transformBinFile(file) {
        const name = (0, typechain_1.getFilename)(file.path);
        const bytecode = (0, typechain_1.extractBytecode)(file.contents);
        if (!bytecode) {
            return;
        }
        if (this.contractCache[name]) {
            const { contract, abi } = this.contractCache[name];
            delete this.contractCache[name];
            return [this.genContractFactoryFile(contract, abi, bytecode)];
        }
        else {
            this.bytecodeCache[name] = bytecode;
        }
    }
    transformAbiOrFullJsonFile(file) {
        const name = (0, typechain_1.getFilename)(file.path);
        const abi = (0, typechain_1.extractAbi)(file.contents);
        if (abi.length === 0) {
            return;
        }
        const documentation = (0, typechain_1.extractDocumentation)(file.contents);
        const contract = (0, typechain_1.parse)(abi, name, documentation);
        const bytecode = (0, typechain_1.extractBytecode)(file.contents) || this.bytecodeCache[name];
        if (bytecode) {
            return [
                this.genContractTypingsFile(contract, this.cfg.flags),
                this.genContractFactoryFile(contract, abi, bytecode),
            ];
        }
        else {
            this.contractCache[name] = { abi, contract };
            return [this.genContractTypingsFile(contract, this.cfg.flags)];
        }
    }
    genContractTypingsFile(contract, codegenConfig) {
        return {
            path: (0, path_1.join)(this.outDirAbs, `${contract.name}.ts`),
            contents: (0, codegen_1.codegenContractTypings)(contract, codegenConfig),
        };
    }
    genContractFactoryFile(contract, abi, bytecode) {
        return {
            path: (0, path_1.join)(this.outDirAbs, 'factories', `${contract.name}${common_1.FACTORY_POSTFIX}.ts`),
            contents: (0, codegen_1.codegenContractFactory)(contract, abi, bytecode),
        };
    }
    afterRun() {
        // For each contract that doesn't have bytecode (it's either abstract, or only ABI was provided)
        // generate a simplified factory, that allows to interact with deployed contract instances.
        const abstractFactoryFiles = Object.keys(this.contractCache).map((contractName) => {
            const { contract, abi } = this.contractCache[contractName];
            return {
                path: (0, path_1.join)(this.outDirAbs, 'factories', `${contract.name}${common_1.FACTORY_POSTFIX}.ts`),
                contents: (0, codegen_1.codegenAbstractContractFactory)(contract, abi),
            };
        });
        const hardhatHelper = this.cfg.flags.environment === 'hardhat'
            ? { path: (0, path_1.join)(this.outDirAbs, 'hardhat.d.ts'), contents: (0, hardhat_1.generateHardhatHelper)(this.allContracts) }
            : undefined;
        const allFiles = (0, lodash_1.compact)([
            ...abstractFactoryFiles,
            {
                path: (0, path_1.join)(this.outDirAbs, 'common.ts'),
                contents: (0, fs_1.readFileSync)((0, path_1.join)(__dirname, '../static/common.ts'), 'utf-8'),
            },
            {
                path: (0, path_1.join)(this.outDirAbs, 'index.ts'),
                contents: this.genReExports(),
            },
            hardhatHelper,
        ]);
        return allFiles;
    }
    genReExports() {
        const codegen = [];
        const allContractsNoDuplicates = (0, lodash_1.uniqBy)(this.allContracts, (c) => (0, path_1.basename)(c));
        for (const fileName of allContractsNoDuplicates) {
            const desiredSymbol = fileName;
            codegen.push(`export type { ${desiredSymbol} } from './${desiredSymbol}'`);
        }
        codegen.push('\n');
        // then generate reexports for TypeChain generated factories
        for (const fileName of allContractsNoDuplicates) {
            const desiredSymbol = fileName + '__factory';
            codegen.push(`export { ${desiredSymbol} } from './factories/${desiredSymbol}'`);
        }
        return codegen.join('\n');
    }
}
exports.default = Ethers;
//# sourceMappingURL=index.js.map