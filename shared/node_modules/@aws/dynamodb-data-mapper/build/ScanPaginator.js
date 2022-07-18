"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var buildScanInput_1 = require("./buildScanInput");
var Paginator_1 = require("./Paginator");
var dynamodb_query_iterator_1 = require("@aws/dynamodb-query-iterator");
/**
 * Iterates over each page of items returned by a DynamoDB scan until no more
 * pages are available.
 */
var ScanPaginator = /** @class */ (function (_super) {
    tslib_1.__extends(ScanPaginator, _super);
    function ScanPaginator(client, itemConstructor, options) {
        if (options === void 0) { options = {}; }
        return _super.call(this, new dynamodb_query_iterator_1.ScanPaginator(client, buildScanInput_1.buildScanInput(itemConstructor, options), options.limit), itemConstructor) || this;
    }
    return ScanPaginator;
}(Paginator_1.Paginator));
exports.ScanPaginator = ScanPaginator;
//# sourceMappingURL=ScanPaginator.js.map