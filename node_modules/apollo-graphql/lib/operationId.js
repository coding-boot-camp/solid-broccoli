"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.operationHash = exports.defaultOperationRegistrySignature = exports.operationRegistrySignature = exports.defaultUsageReportingSignature = void 0;
const transforms_1 = require("./transforms");
const createHash_1 = require("./utilities/createHash");
function defaultUsageReportingSignature(ast, operationName) {
    return (0, transforms_1.printWithReducedWhitespace)((0, transforms_1.sortAST)((0, transforms_1.removeAliases)((0, transforms_1.hideLiterals)((0, transforms_1.dropUnusedDefinitions)(ast, operationName)))));
}
exports.defaultUsageReportingSignature = defaultUsageReportingSignature;
function operationRegistrySignature(ast, operationName, options = {
    preserveStringAndNumericLiterals: false,
}) {
    const withoutUnusedDefs = (0, transforms_1.dropUnusedDefinitions)(ast, operationName);
    const maybeWithLiterals = options.preserveStringAndNumericLiterals
        ? withoutUnusedDefs
        : (0, transforms_1.hideStringAndNumericLiterals)(withoutUnusedDefs);
    return (0, transforms_1.printWithReducedWhitespace)((0, transforms_1.sortAST)(maybeWithLiterals));
}
exports.operationRegistrySignature = operationRegistrySignature;
function defaultOperationRegistrySignature(ast, operationName) {
    return operationRegistrySignature(ast, operationName, {
        preserveStringAndNumericLiterals: false,
    });
}
exports.defaultOperationRegistrySignature = defaultOperationRegistrySignature;
function operationHash(operation) {
    return (0, createHash_1.createHash)("sha256").update(operation).digest("hex");
}
exports.operationHash = operationHash;
//# sourceMappingURL=operationId.js.map