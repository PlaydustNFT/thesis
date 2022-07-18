import { DynamoDbPaginatorInterface } from '@aws/dynamodb-query-iterator';
import { ZeroArgumentsConstructor } from '@aws/dynamodb-data-marshaller';
import { ConsumedCapacity } from 'aws-sdk/clients/dynamodb';
export declare abstract class Paginator<T> implements AsyncIterableIterator<Array<T>> {
    private readonly paginator;
    private readonly valueConstructor;
    private readonly itemSchema;
    private lastKey?;
    private lastResolved;
    protected constructor(paginator: DynamoDbPaginatorInterface, valueConstructor: ZeroArgumentsConstructor<T>);
    /**
     * @inheritDoc
     */
    [Symbol.asyncIterator](): this;
    /**
     * @inheritDoc
     */
    next(): Promise<IteratorResult<Array<T>>>;
    /**
     * @inheritDoc
     */
    return(): Promise<IteratorResult<Array<T>>>;
    /**
     * Retrieve the reported capacity consumed by this paginator. Will be
     * undefined unless returned consumed capacity is requested.
     */
    readonly consumedCapacity: ConsumedCapacity | undefined;
    /**
     * Retrieve the number of items yielded thus far by this paginator.
     */
    readonly count: number;
    /**
     * Retrieve the last reported `LastEvaluatedKey`, unmarshalled according to
     * the schema used by this paginator.
     */
    readonly lastEvaluatedKey: Partial<T> | undefined;
    /**
     * Retrieve the number of items scanned thus far during the execution of
     * this paginator. This number should be the same as {@link count} unless a
     * filter expression was used.
     */
    readonly scannedCount: number;
    private getNext;
}
