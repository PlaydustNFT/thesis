import { SequentialScanOptions } from './namedParameters';
import { Paginator } from './Paginator';
import { ZeroArgumentsConstructor } from '@aws/dynamodb-data-marshaller';
import DynamoDB = require('aws-sdk/clients/dynamodb');
/**
 * Iterates over each page of items returned by a DynamoDB scan until no more
 * pages are available.
 */
export declare class ScanPaginator<T> extends Paginator<T> {
    constructor(client: DynamoDB, itemConstructor: ZeroArgumentsConstructor<T>, options?: SequentialScanOptions);
}
