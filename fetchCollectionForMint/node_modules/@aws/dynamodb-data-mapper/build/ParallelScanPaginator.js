"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var buildScanInput_1 = require("./buildScanInput");
var Paginator_1 = require("./Paginator");
var protocols_1 = require("./protocols");
var dynamodb_query_iterator_1 = require("@aws/dynamodb-query-iterator");
var dynamodb_data_marshaller_1 = require("@aws/dynamodb-data-marshaller");
/**
 * Iterates over each page of items returned by a parallel DynamoDB scan until
 * no more pages are available.
 */
var ParallelScanPaginator = /** @class */ (function (_super) {
    tslib_1.__extends(ParallelScanPaginator, _super);
    function ParallelScanPaginator(client, itemConstructor, segments, options) {
        if (options === void 0) { options = {}; }
        var _this = this;
        var schema = protocols_1.getSchema(itemConstructor.prototype);
        var input = tslib_1.__assign({}, buildScanInput_1.buildScanInput(itemConstructor, options), { TotalSegments: segments, ExclusiveStartKey: undefined, Segment: undefined });
        var scanState;
        if (options.scanState) {
            scanState = options.scanState.map(function (_a) {
                var initialized = _a.initialized, lastKey = _a.lastEvaluatedKey;
                return ({
                    initialized: initialized,
                    LastEvaluatedKey: lastKey
                        ? dynamodb_data_marshaller_1.marshallKey(schema, lastKey, options.indexName)
                        : undefined
                });
            });
        }
        var paginator = new dynamodb_query_iterator_1.ParallelScanPaginator(client, input, scanState);
        _this = _super.call(this, paginator, itemConstructor) || this;
        _this._paginator = paginator;
        _this._ctor = itemConstructor;
        _this._schema = schema;
        return _this;
    }
    Object.defineProperty(ParallelScanPaginator.prototype, "lastEvaluatedKey", {
        /**
         * The `lastEvaluatedKey` attribute is not available on parallel scans. Use
         * {@link scanState} instead.
         */
        get: function () {
            return undefined;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ParallelScanPaginator.prototype, "scanState", {
        /**
         * A snapshot of the current state of a parallel scan. May be used to resume
         * a parallel scan with a separate paginator.
         */
        get: function () {
            var _this = this;
            return this._paginator.scanState.map(function (_a) {
                var initialized = _a.initialized, LastEvaluatedKey = _a.LastEvaluatedKey;
                return ({
                    initialized: initialized,
                    lastEvaluatedKey: LastEvaluatedKey
                        ? dynamodb_data_marshaller_1.unmarshallItem(_this._schema, LastEvaluatedKey, _this._ctor)
                        : undefined
                });
            });
        },
        enumerable: true,
        configurable: true
    });
    return ParallelScanPaginator;
}(Paginator_1.Paginator));
exports.ParallelScanPaginator = ParallelScanPaginator;
//# sourceMappingURL=ParallelScanPaginator.js.map