"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateHardhatHelper = void 0;
const common_1 = require("../common");
function generateHardhatHelper(contracts) {
    return `

import { ethers } from '@alayanetwork/ethers-providers/packages/ethers/src.ts'
import { FactoryOptions, HardhatEthersHelpers as  HardhatEthersHelpersBase} from "@nomiclabs/hardhat-ethers/types";

import * as Contracts from "."

declare module "hardhat/types/runtime" {
  interface HardhatEthersHelpers extends HardhatEthersHelpersBase {
  ${contracts
        .map((n) => `getContractFactory(name: '${n}', signerOrOptions?: ethers.Signer | FactoryOptions): Promise<Contracts.${n + common_1.FACTORY_POSTFIX}>`)
        .join('\n')}

  ${contracts
        .map((n) => `getContractAt(name: '${n}', address: string, signer?: ethers.Signer): Promise<Contracts.${n}>`)
        .join('\n')}

    // default types
    getContractFactory(
      name: string,
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<ethers.ContractFactory>;
    getContractFactory(
      abi: any[],
      bytecode: ethers.utils.BytesLike,
      signer?: ethers.Signer
    ): Promise<ethers.ContractFactory>;
    getContractAt(
      nameOrAbi: string | any[],
      address: string,
      signer?: ethers.Signer
    ): Promise<ethers.Contract>;
  }
}
  `;
}
exports.generateHardhatHelper = generateHardhatHelper;
//# sourceMappingURL=hardhat.js.map