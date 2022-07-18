import { SequentialScanOptions } from './namedParameters';
import { ZeroArgumentsConstructor } from '@aws/dynamodb-data-marshaller';
import { ScanInput } from 'aws-sdk/clients/dynamodb';
/**
 * @internal
 */
export declare function buildScanInput<T>(valueConstructor: ZeroArgumentsConstructor<T>, options?: SequentialScanOptions): ScanInput;
