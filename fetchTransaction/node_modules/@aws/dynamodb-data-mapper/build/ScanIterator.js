"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var Iterator_1 = require("./Iterator");
var ScanPaginator_1 = require("./ScanPaginator");
/**
 * Iterates over each item returned by a DynamoDB scan until no more pages are
 * available.
 */
var ScanIterator = /** @class */ (function (_super) {
    tslib_1.__extends(ScanIterator, _super);
    function ScanIterator(client, valueConstructor, options) {
        return _super.call(this, new ScanPaginator_1.ScanPaginator(client, valueConstructor, options)) || this;
    }
    return ScanIterator;
}(Iterator_1.Iterator));
exports.ScanIterator = ScanIterator;
//# sourceMappingURL=ScanIterator.js.map