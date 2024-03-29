"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.codegenForEventsOnceFns = exports.codegenForEvents = exports.codegenForEventsDeclarations = void 0;
const lodash_1 = require("lodash");
const typechain_1 = require("typechain");
const types_1 = require("./types");
function codegenForEventsDeclarations(events) {
    return (0, lodash_1.values)(events)
        .map((e) => {
        if (e.length === 1) {
            return codegenEventDeclaration(e[0]);
        }
        else {
            return codegenEventDeclarationWithOverloads(e);
        }
    })
        .join('\n');
}
exports.codegenForEventsDeclarations = codegenForEventsDeclarations;
function codegenForEvents(events) {
    return (0, lodash_1.values)(events)
        .filter((e) => !e[0].isAnonymous)
        .map((events) => {
        if (events.length === 1) {
            return codegenForSingleEvent(events[0]);
        }
        else {
            return codegenForOverloadedEvent(events);
        }
    })
        .join('\n');
}
exports.codegenForEvents = codegenForEvents;
function codegenForEventsOnceFns(events) {
    return (0, lodash_1.values)(events)
        .filter((e) => e.length === 1) // ignore overloaded events as it seems like Web3v1 doesnt support them in this context
        .map((e) => e[0])
        .filter((e) => !e.isAnonymous)
        .map((e) => `
    once(event: '${e.name}', cb: Callback<${e.name}>): void;
    once(event: '${e.name}', options: EventOptions, cb: Callback<${e.name}>): void;
    `)
        .join('\n');
}
exports.codegenForEventsOnceFns = codegenForEventsOnceFns;
function codegenForOverloadedEvent(events) {
    return events
        .map((e) => codegenForSingleEvent(e, `"${(0, typechain_1.getFullSignatureForEvent)(e)}"`, (0, typechain_1.getFullSignatureAsSymbolForEvent)(e)))
        .join('\n');
}
function codegenForSingleEvent(event, overloadedName, overloadedTypeName) {
    return `
    ${overloadedName !== null && overloadedName !== void 0 ? overloadedName : event.name}(cb?: Callback<${overloadedTypeName !== null && overloadedTypeName !== void 0 ? overloadedTypeName : event.name}>): EventEmitter;
    ${overloadedName !== null && overloadedName !== void 0 ? overloadedName : event.name}(options?: EventOptions, cb?: Callback<${overloadedTypeName !== null && overloadedTypeName !== void 0 ? overloadedTypeName : event.name}>): EventEmitter;
  `;
}
function codegenEventDeclarationWithOverloads(events) {
    return events.map((e) => codegenEventDeclaration(e, (0, typechain_1.getFullSignatureAsSymbolForEvent)(e))).join('\n');
}
function codegenEventDeclaration(event, overloadedName) {
    return `export type ${overloadedName !== null && overloadedName !== void 0 ? overloadedName : event.name} = ContractEventLog<${codegenOutputTypesForEvents(event.inputs)}>`;
}
function codegenOutputTypesForEvents(outputs) {
    return `{
    ${outputs.map((t) => t.name && `${t.name}: ${(0, types_1.codegenOutputType)(t.type)}, `).join('')}
    ${outputs.map((t, i) => `${i}: ${(0, types_1.codegenOutputType)(t.type)}`).join(', ')}
  }`;
}
//# sourceMappingURL=events.js.map