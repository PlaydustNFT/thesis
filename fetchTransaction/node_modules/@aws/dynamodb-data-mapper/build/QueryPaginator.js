"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var marshallStartKey_1 = require("./marshallStartKey");
var Paginator_1 = require("./Paginator");
var protocols_1 = require("./protocols");
var dynamodb_query_iterator_1 = require("@aws/dynamodb-query-iterator");
var dynamodb_data_marshaller_1 = require("@aws/dynamodb-data-marshaller");
var dynamodb_expressions_1 = require("@aws/dynamodb-expressions");
/**
 * Iterates over each page of items returned by a DynamoDB query until no more
 * pages are available.
 */
var QueryPaginator = /** @class */ (function (_super) {
    tslib_1.__extends(QueryPaginator, _super);
    function QueryPaginator(client, valueConstructor, keyCondition, options) {
        if (options === void 0) { options = {}; }
        var _this = this;
        var itemSchema = protocols_1.getSchema(valueConstructor.prototype);
        var filter = options.filter, indexName = options.indexName, limit = options.limit, pageSize = options.pageSize, projection = options.projection, readConsistency = options.readConsistency, scanIndexForward = options.scanIndexForward, startKey = options.startKey, prefix = options.tableNamePrefix;
        var req = {
            TableName: protocols_1.getTableName(valueConstructor.prototype, prefix),
            ScanIndexForward: scanIndexForward,
            Limit: pageSize,
            IndexName: indexName,
        };
        if (readConsistency === 'strong') {
            req.ConsistentRead = true;
        }
        var attributes = new dynamodb_expressions_1.ExpressionAttributes();
        req.KeyConditionExpression = dynamodb_data_marshaller_1.marshallConditionExpression(normalizeKeyCondition(keyCondition), itemSchema, attributes).expression;
        if (filter) {
            req.FilterExpression = dynamodb_data_marshaller_1.marshallConditionExpression(filter, itemSchema, attributes).expression;
        }
        if (projection) {
            req.ProjectionExpression = dynamodb_data_marshaller_1.marshallProjectionExpression(projection, itemSchema, attributes).expression;
        }
        if (Object.keys(attributes.names).length > 0) {
            req.ExpressionAttributeNames = attributes.names;
        }
        if (Object.keys(attributes.values).length > 0) {
            req.ExpressionAttributeValues = attributes.values;
        }
        if (startKey) {
            req.ExclusiveStartKey = marshallStartKey_1.marshallStartKey(itemSchema, startKey);
        }
        _this = _super.call(this, new dynamodb_query_iterator_1.QueryPaginator(client, req, limit), valueConstructor) || this;
        return _this;
    }
    return QueryPaginator;
}(Paginator_1.Paginator));
exports.QueryPaginator = QueryPaginator;
function normalizeKeyCondition(keyCondition) {
    var e_1, _a;
    if (dynamodb_expressions_1.isConditionExpression(keyCondition)) {
        return keyCondition;
    }
    var conditions = [];
    try {
        for (var _b = tslib_1.__values(Object.keys(keyCondition)), _c = _b.next(); !_c.done; _c = _b.next()) {
            var property = _c.value;
            var predicate = keyCondition[property];
            if (dynamodb_expressions_1.isConditionExpressionPredicate(predicate)) {
                conditions.push(tslib_1.__assign({}, predicate, { subject: property }));
            }
            else {
                conditions.push({
                    type: 'Equals',
                    subject: property,
                    object: predicate,
                });
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
    if (conditions.length === 1) {
        return conditions[0];
    }
    return { type: 'And', conditions: conditions };
}
//# sourceMappingURL=QueryPaginator.js.map