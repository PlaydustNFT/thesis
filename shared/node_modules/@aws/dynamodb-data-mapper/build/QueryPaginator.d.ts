import { QueryOptions } from './namedParameters';
import { Paginator } from './Paginator';
import { ZeroArgumentsConstructor } from '@aws/dynamodb-data-marshaller';
import { ConditionExpression, ConditionExpressionPredicate } from '@aws/dynamodb-expressions';
import DynamoDB = require('aws-sdk/clients/dynamodb');
/**
 * Iterates over each page of items returned by a DynamoDB query until no more
 * pages are available.
 */
export declare class QueryPaginator<T> extends Paginator<T> {
    constructor(client: DynamoDB, valueConstructor: ZeroArgumentsConstructor<T>, keyCondition: ConditionExpression | {
        [propertyName: string]: ConditionExpressionPredicate | any;
    }, options?: QueryOptions & {
        tableNamePrefix?: string;
    });
}
