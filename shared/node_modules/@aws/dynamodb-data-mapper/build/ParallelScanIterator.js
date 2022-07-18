"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var Iterator_1 = require("./Iterator");
var ParallelScanPaginator_1 = require("./ParallelScanPaginator");
/**
 * Iterates over each item returned by a parallel DynamoDB scan until no more
 * pages are available.
 */
var ParallelScanIterator = /** @class */ (function (_super) {
    tslib_1.__extends(ParallelScanIterator, _super);
    function ParallelScanIterator(client, itemConstructor, segments, options) {
        if (options === void 0) { options = {}; }
        return _super.call(this, new ParallelScanPaginator_1.ParallelScanPaginator(client, itemConstructor, segments, options)) || this;
    }
    return ParallelScanIterator;
}(Iterator_1.Iterator));
exports.ParallelScanIterator = ParallelScanIterator;
//# sourceMappingURL=ParallelScanIterator.js.map