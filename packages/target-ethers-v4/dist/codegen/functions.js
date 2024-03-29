"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.codegenForOverloadedFunctions = exports.codegenFunctions = void 0;
const typechain_1 = require("typechain");
const types_1 = require("./types");
function codegenFunctions(options, fns) {
    if (fns.length === 1) {
        return `${generateFunction(options, fns[0])}${codegenForOverloadedFunctions(options, fns)}`;
    }
    return `${generateFunction(options, fns[0])}${codegenForOverloadedFunctions(options, fns)}`;
}
exports.codegenFunctions = codegenFunctions;
function codegenForOverloadedFunctions(options, fns) {
    return fns.map((fn) => generateFunction(options, fn, `"${(0, typechain_1.getSignatureForFn)(fn)}"`)).join('\n');
}
exports.codegenForOverloadedFunctions = codegenForOverloadedFunctions;
function generateFunction(options, fn, overloadedName) {
    return `
  ${generateFunctionDocumentation(fn.documentation)}
  ${overloadedName !== null && overloadedName !== void 0 ? overloadedName : fn.name}(${(0, types_1.generateInputTypes)(fn.inputs)} overrides?: UnsignedTransaction): ${options.overrideOutput
        ? options.overrideOutput
        : `Promise<${fn.stateMutability === 'pure' || fn.stateMutability === 'view'
            ? (0, types_1.generateOutputTypes)(fn.outputs)
            : 'ContractTransaction'}>`};
`;
}
function generateFunctionDocumentation(doc) {
    if (!doc)
        return '';
    let docString = '/**';
    if (doc.details)
        docString += `\n * ${doc.details}`;
    if (doc.notice)
        docString += `\n * ${doc.notice}`;
    const params = Object.entries(doc.params || {});
    if (params.length) {
        params.forEach(([key, value]) => {
            docString += `\n * @param ${key} ${value}`;
        });
    }
    if (doc.return)
        docString += `\n * @returns ${doc.return}`;
    docString += '\n */';
    return docString;
}
//# sourceMappingURL=functions.js.map