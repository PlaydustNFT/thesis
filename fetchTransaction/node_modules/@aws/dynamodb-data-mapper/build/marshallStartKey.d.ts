import { Schema } from '@aws/dynamodb-data-marshaller';
import { Key } from 'aws-sdk/clients/dynamodb';
/**
 * @internal
 */
export declare function marshallStartKey(schema: Schema, startKey: {
    [key: string]: any;
}): Key;
