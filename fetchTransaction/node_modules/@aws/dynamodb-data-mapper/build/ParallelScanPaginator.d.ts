import { ParallelScanOptions, ParallelScanState } from './namedParameters';
import { Paginator } from './Paginator';
import { ZeroArgumentsConstructor } from '@aws/dynamodb-data-marshaller';
import DynamoDB = require('aws-sdk/clients/dynamodb');
/**
 * Iterates over each page of items returned by a parallel DynamoDB scan until
 * no more pages are available.
 */
export declare class ParallelScanPaginator<T> extends Paginator<T> {
    private readonly _ctor;
    private readonly _paginator;
    private readonly _schema;
    constructor(client: DynamoDB, itemConstructor: ZeroArgumentsConstructor<T>, segments: number, options?: ParallelScanOptions & {
        tableNamePrefix?: string;
    });
    /**
     * The `lastEvaluatedKey` attribute is not available on parallel scans. Use
     * {@link scanState} instead.
     */
    readonly lastEvaluatedKey: undefined;
    /**
     * A snapshot of the current state of a parallel scan. May be used to resume
     * a parallel scan with a separate paginator.
     */
    readonly scanState: ParallelScanState;
}
