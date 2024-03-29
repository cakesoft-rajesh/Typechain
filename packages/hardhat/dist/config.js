"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDefaultTypechainConfig = void 0;
function getDefaultTypechainConfig(config) {
    const defaultConfig = {
        outDir: 'typechain-types',
        target: 'ethers-v5',
        alwaysGenerateOverloads: false,
        tsNocheck: false,
    };
    return {
        ...defaultConfig,
        ...config.typechain,
    };
}
exports.getDefaultTypechainConfig = getDefaultTypechainConfig;
//# sourceMappingURL=config.js.map