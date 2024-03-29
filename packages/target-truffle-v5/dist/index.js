"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("fs");
const path_1 = require("path");
const typechain_1 = require("typechain");
const codegen_1 = require("./codegen");
const contracts_1 = require("./codegen/contracts");
const DEFAULT_OUT_PATH = './types/truffle-contracts/';
class Truffle extends typechain_1.TypeChainTarget {
    constructor(config) {
        super(config);
        this.name = 'Truffle';
        this.contracts = [];
        const { cwd, outDir } = config;
        this.outDirAbs = (0, path_1.resolve)(cwd, outDir || DEFAULT_OUT_PATH);
    }
    transformFile(file) {
        const abi = (0, typechain_1.extractAbi)(file.contents);
        const isEmptyAbi = abi.length === 0;
        if (isEmptyAbi) {
            return;
        }
        const name = (0, typechain_1.getFilename)(file.path);
        const documentation = (0, typechain_1.extractDocumentation)(file.contents);
        const contract = (0, typechain_1.parse)(abi, name, documentation);
        this.contracts.push(contract);
        return {
            path: (0, path_1.join)(this.outDirAbs, `${contract.name}.d.ts`),
            contents: (0, contracts_1.codegenContract)(contract),
        };
    }
    afterRun() {
        return [
            {
                path: (0, path_1.join)(this.outDirAbs, 'index.d.ts'),
                contents: (0, codegen_1.codegenArtifactHeaders)(this.contracts),
            },
            {
                path: (0, path_1.join)(this.outDirAbs, 'types.d.ts'),
                contents: (0, fs_1.readFileSync)((0, path_1.join)(__dirname, '../static/types.d.ts'), 'utf-8'),
            },
        ];
    }
}
exports.default = Truffle;
//# sourceMappingURL=index.js.map