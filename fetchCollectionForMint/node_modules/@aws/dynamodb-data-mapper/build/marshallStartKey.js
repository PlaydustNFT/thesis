"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var dynamodb_data_marshaller_1 = require("@aws/dynamodb-data-marshaller");
/**
 * @internal
 */
function marshallStartKey(schema, startKey) {
    var e_1, _a;
    var key = {};
    try {
        for (var _b = tslib_1.__values(Object.keys(startKey)), _c = _b.next(); !_c.done; _c = _b.next()) {
            var propertyName = _c.value;
            var propSchema = schema[propertyName];
            var _d = propSchema.attributeName, attributeName = _d === void 0 ? propertyName : _d;
            if (propSchema) {
                key[attributeName] = dynamodb_data_marshaller_1.marshallValue(propSchema, startKey[propertyName]);
            }
        }
    }
    catch (e_1_1) { e_1 = { error: e_1_1 }; }
    finally {
        try {
            if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
        }
        finally { if (e_1) throw e_1.error; }
    }
    return key;
}
exports.marshallStartKey = marshallStartKey;
//# sourceMappingURL=marshallStartKey.js.map