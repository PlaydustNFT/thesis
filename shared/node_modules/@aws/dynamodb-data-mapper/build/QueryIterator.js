"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var Iterator_1 = require("./Iterator");
var QueryPaginator_1 = require("./QueryPaginator");
/**
 * Iterates over each item returned by a DynamoDB query until no more pages are
 * available.
 */
var QueryIterator = /** @class */ (function (_super) {
    tslib_1.__extends(QueryIterator, _super);
    function QueryIterator(client, valueConstructor, keyCondition, options) {
        return _super.call(this, new QueryPaginator_1.QueryPaginator(client, valueConstructor, keyCondition, options)) || this;
    }
    return QueryIterator;
}(Iterator_1.Iterator));
exports.QueryIterator = QueryIterator;
//# sourceMappingURL=QueryIterator.js.map