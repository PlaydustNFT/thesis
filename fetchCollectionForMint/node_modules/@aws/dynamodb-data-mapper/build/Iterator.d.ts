import { Paginator as AbstractPaginator } from './Paginator';
import { ConsumedCapacity } from 'aws-sdk/clients/dynamodb';
export declare abstract class Iterator<T, Paginator extends AbstractPaginator<T>> implements AsyncIterableIterator<T> {
    private readonly paginator;
    private _count;
    private lastResolved;
    private readonly pending;
    protected lastYielded?: T;
    protected constructor(paginator: Paginator);
    /**
     * @inheritDoc
     */
    [Symbol.asyncIterator](): this;
    /**
     * @inheritDoc
     */
    next(): Promise<IteratorResult<T>>;
    /**
     * Detaches the underlying paginator from this iterator and returns it. The
     * paginator will yield arrays of unmarshalled items, with each yielded
     * array corresponding to a single call to the underlying API. As with the
     * underlying API, pages may contain a variable number of items or no items,
     * in which case an empty array will be yielded.
     *
     * Calling this method will disable further iteration.
     */
    pages(): Paginator;
    /**
     * @inheritDoc
     */
    return(): Promise<IteratorResult<T>>;
    /**
     * Retrieve the reported capacity consumed by this iterator. Will be
     * undefined unless returned consumed capacity is requested.
     */
    readonly consumedCapacity: ConsumedCapacity | undefined;
    /**
     * Retrieve the number of items yielded thus far by this iterator.
     */
    readonly count: number;
    /**
     * Retrieve the number of items scanned thus far during the execution of
     * this iterator. This number should be the same as {@link count} unless a
     * filter expression was used.
     */
    readonly scannedCount: number;
    private getNext;
}
