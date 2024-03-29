"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.codegenTupleType = exports.codegenOutputType = exports.codegenInputType = exports.codegenOutputTypes = exports.codegenInputTypes = void 0;
function codegenInputTypes(input) {
    if (input.length === 0) {
        return '';
    }
    return (input.map((input, index) => `${input.name || `arg${index}`}: ${codegenInputType(input.type)}`).join(', ') + ', ');
}
exports.codegenInputTypes = codegenInputTypes;
function codegenOutputTypes(outputs) {
    if (outputs.length === 1) {
        return codegenOutputType(outputs[0].type);
    }
    else {
        return `{
      ${outputs.map((t) => t.name && `${t.name}: ${codegenOutputType(t.type)}, `).join('')}
      ${outputs.map((t, i) => `${i}: ${codegenOutputType(t.type)}`).join(', ')}
    }`;
    }
}
exports.codegenOutputTypes = codegenOutputTypes;
function codegenInputType(evmType) {
    switch (evmType.type) {
        case 'integer':
        case 'uinteger':
            return 'number | string | BN';
        case 'address':
            return 'string';
        case 'bytes':
        case 'dynamic-bytes':
            return 'string | number[]';
        case 'array':
            return `(${codegenInputType(evmType.itemType)})[]`;
        case 'boolean':
            return 'boolean';
        case 'string':
            return 'string';
        case 'tuple':
            return codegenTupleType(evmType, codegenInputType);
        case 'unknown':
            return 'any';
    }
}
exports.codegenInputType = codegenInputType;
function codegenOutputType(evmType) {
    switch (evmType.type) {
        case 'integer':
            return 'string';
        case 'uinteger':
            return 'string';
        case 'address':
            return 'string';
        case 'void':
            return 'void';
        case 'bytes':
        case 'dynamic-bytes':
            return 'string';
        case 'array':
            return `(${codegenOutputType(evmType.itemType)})[]`;
        case 'boolean':
            return 'boolean';
        case 'string':
            return 'string';
        case 'tuple':
            return codegenTupleType(evmType, codegenOutputType);
        case 'unknown':
            return 'any';
    }
}
exports.codegenOutputType = codegenOutputType;
function codegenTupleType(tuple, generator) {
    return '[' + tuple.components.map((component) => generator(component.type)).join(', ') + ']';
}
exports.codegenTupleType = codegenTupleType;
//# sourceMappingURL=types.js.map