"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.codegen = void 0;
const events_1 = require("./events");
const functions_1 = require("./functions");
function codegen(contract) {
    const template = `
  import BN from "bn.js";
  import { ContractOptions } from "web3-eth-contract";
  import { EventLog } from "web3-core";
  import { EventEmitter } from "events";
  import { Callback, PayableTransactionObject, NonPayableTransactionObject, BlockType, ContractEventLog, BaseContract } from "./types";

  export interface EventOptions {
    filter?: object;
    fromBlock?: BlockType;
    topics?: string[];
  }

  ${(0, events_1.codegenForEventsDeclarations)(contract.events)}

  export interface ${contract.name} extends BaseContract {
    constructor(jsonInterface: any[], address?: string, options?: ContractOptions): ${contract.name};
    clone(): ${contract.name};
    methods: {
      ${(0, functions_1.codegenForFunctions)(contract.functions)}
    };
    events: {
      ${(0, events_1.codegenForEvents)(contract.events)}
      allEvents(options?: EventOptions, cb?: Callback<EventLog>): EventEmitter;
    };
    ${(0, events_1.codegenForEventsOnceFns)(contract.events)}
  }
  `;
    return template;
}
exports.codegen = codegen;
//# sourceMappingURL=index.js.map