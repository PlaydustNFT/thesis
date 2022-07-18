import { PropertyAnnotation } from './annotationShapes';
import { BinaryType, CustomType, DateType, NumberType, StringType } from '@aws/dynamodb-data-marshaller';
export declare function hashKey(parameters?: Partial<BinaryType | CustomType<any> | DateType | NumberType | StringType>): PropertyAnnotation;
