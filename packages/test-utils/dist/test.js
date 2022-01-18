"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.typeCase = exports.asyncWithDoneCase = exports.q18 = exports.isBigNumberObject = exports.isBigNumberArray = exports.isBigNumber = exports.typedAssert = void 0;
const bignumber_js_1 = __importDefault(require("bignumber.js"));
const earljs_1 = require("earljs");
const lodash_1 = require("lodash");
/**
 * Asserts values AND types equality.
 * It has some special handling for BigNumber :SHRUG: The reason for this is that I wanted to avoid creating specific functions for bignumbers which would force for me to export BigNumber in types (instead of just having it as generic type) WHICH is always PITA.
 */
function typedAssert(actual, expected) {
    if (isBigNumber(actual) && isBigNumber(expected)) {
        (0, earljs_1.expect)(actual.toString()).toEqual(expected.toString());
        return;
    }
    if (isBigNumberArray(actual) && isBigNumberArray(expected)) {
        (0, earljs_1.expect)(actual.map((a) => a.toString())).toEqual(expected.map((a) => a.toString()));
        return;
    }
    if (isBigNumberObject(actual) && isBigNumberObject(expected)) {
        const actualFiltered = (0, lodash_1.omitBy)(actual, (v, k) => k.startsWith('__'));
        (0, earljs_1.expect)((0, lodash_1.mapValues)(actualFiltered, (a) => a.toString())).toEqual((0, lodash_1.mapValues)(expected, (a) => a.toString()));
        return;
    }
    (0, earljs_1.expect)(actual).toLooseEqual(expected);
}
exports.typedAssert = typedAssert;
function isBigNumber(v) {
    return v.constructor.name === 'BigNumber' || v.constructor.name === 'BN';
}
exports.isBigNumber = isBigNumber;
function isBigNumberArray(v) {
    return (v instanceof Array &&
        isBigNumber(v[0]) &&
        // ethers returns array with additional properties on them. We dont wat to treat those as arrays
        Object.keys(v).length === v.length);
}
exports.isBigNumberArray = isBigNumberArray;
function isBigNumberObject(val) {
    if (!(val instanceof Object) || !val) {
        return false;
    }
    for (const [k, v] of Object.entries(val)) {
        // filter out dummy properties Web3js (truffle v5) in it
        if ((0, lodash_1.isString)(k) && k.startsWith('__')) {
            continue;
        }
        if (!isBigNumber(v)) {
            return false;
        }
    }
    return true;
}
exports.isBigNumberObject = isBigNumberObject;
function q18(n) {
    return new bignumber_js_1.default(n).multipliedBy(new bignumber_js_1.default(10).pow(new bignumber_js_1.default(18))).toString();
}
exports.q18 = q18;
// async mocha test case both with done and promise
function asyncWithDoneCase(fn) {
    return (done) => {
        fn(done).catch((e) => {
            done(e);
        });
    };
}
exports.asyncWithDoneCase = asyncWithDoneCase;
// ignore mocha test case as it should only test types
function typeCase(_fn) {
    return () => { };
}
exports.typeCase = typeCase;
//# sourceMappingURL=test.js.map