"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var attribute_1 = require("./attribute");
function rangeKey(parameters) {
    if (parameters === void 0) { parameters = {}; }
    return attribute_1.attribute(tslib_1.__assign({}, parameters, { keyType: 'RANGE' }));
}
exports.rangeKey = rangeKey;
//# sourceMappingURL=rangeKey.js.map