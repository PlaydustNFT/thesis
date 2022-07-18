"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var dynamodb_data_mapper_1 = require("@aws/dynamodb-data-mapper");
/**
 * Declare a TypeScript class to be represent items in a table in a way
 * understandable by the AWS DynamoDB DataMapper for JavaScript. Meant to be
 * used as a TypeScript class decorator in projects compiled with the
 * `experimentalDecorators` option enabled.
 *
 * @see https://www.typescriptlang.org/docs/handbook/decorators.html
 * @see https://www.typescriptlang.org/docs/handbook/compiler-options.html
 */
function table(tableName) {
    return function (constructor) {
        constructor.prototype[dynamodb_data_mapper_1.DynamoDbTable] = tableName;
    };
}
exports.table = table;
//# sourceMappingURL=table.js.map