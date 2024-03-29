"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addPreambleOutputTransformer = void 0;
const addPreambleOutputTransformer = (output, _services, cfg) => {
    return [
        '/* Autogenerated file. Do not edit manually. */',
        cfg.flags.tsNocheck && '// @ts-nocheck',
        '/* tslint:disable */',
        '/* eslint-disable */',
        output,
    ]
        .filter(Boolean)
        .join('\n');
};
exports.addPreambleOutputTransformer = addPreambleOutputTransformer;
//# sourceMappingURL=preamble.js.map