"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loadContract = void 0;
const fs_1 = require("fs");
const glob_1 = require("glob");
const path_1 = require("path");
const abiDirPath = (0, path_1.join)(__dirname, '../../../contracts/compiled');
function loadContract(contractName) {
    const abiPaths = (0, glob_1.sync)(`${abiDirPath}/**/${contractName}.abi`);
    if (abiPaths.length === 0) {
        throw new Error(`ABI for ${contractName} not found in ${abiDirPath}`);
    }
    else if (abiPaths.length > 1) {
        throw new Error(`Multiple ABIs for ${contractName} found in ${abiDirPath}`);
    }
    const [abiPath] = abiPaths;
    const abi = JSON.parse((0, fs_1.readFileSync)(abiPath, 'utf-8'));
    const bin = (0, fs_1.readFileSync)(abiPath.replace(/\.abi$/, '.bin'), 'utf-8');
    const code = '0x' + bin;
    return { code, abi };
}
exports.loadContract = loadContract;
//# sourceMappingURL=contract.js.map