"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var marshallStartKey_1 = require("./marshallStartKey");
var protocols_1 = require("./protocols");
var dynamodb_data_marshaller_1 = require("@aws/dynamodb-data-marshaller");
var dynamodb_expressions_1 = require("@aws/dynamodb-expressions");
/**
 * @internal
 */
function buildScanInput(valueConstructor, options) {
    if (options === void 0) { options = {}; }
    var filter = options.filter, indexName = options.indexName, pageSize = options.pageSize, projection = options.projection, readConsistency = options.readConsistency, segment = options.segment, startKey = options.startKey, prefix = options.tableNamePrefix, totalSegments = options.totalSegments;
    var req = {
        TableName: protocols_1.getTableName(valueConstructor.prototype, prefix),
        Limit: pageSize,
        IndexName: indexName,
        Segment: segment,
        TotalSegments: totalSegments,
    };
    if (readConsistency === 'strong') {
        req.ConsistentRead = true;
    }
    var schema = protocols_1.getSchema(valueConstructor.prototype);
    var attributes = new dynamodb_expressions_1.ExpressionAttributes();
    if (filter) {
        req.FilterExpression = dynamodb_data_marshaller_1.marshallConditionExpression(filter, schema, attributes).expression;
    }
    if (projection) {
        req.ProjectionExpression = dynamodb_data_marshaller_1.marshallProjectionExpression(projection, schema, attributes).expression;
    }
    if (Object.keys(attributes.names).length > 0) {
        req.ExpressionAttributeNames = attributes.names;
    }
    if (Object.keys(attributes.values).length > 0) {
        req.ExpressionAttributeValues = attributes.values;
    }
    if (startKey) {
        req.ExclusiveStartKey = marshallStartKey_1.marshallStartKey(schema, startKey);
    }
    return req;
}
exports.buildScanInput = buildScanInput;
//# sourceMappingURL=buildScanInput.js.map