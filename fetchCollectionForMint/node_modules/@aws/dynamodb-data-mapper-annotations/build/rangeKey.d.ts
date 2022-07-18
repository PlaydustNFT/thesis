import { PropertyAnnotation } from './annotationShapes';
import { BinaryType, CustomType, DateType, NumberType, StringType } from '@aws/dynamodb-data-marshaller';
export declare function rangeKey(parameters?: Partial<BinaryType | CustomType<any> | DateType | NumberType | StringType>): PropertyAnnotation;
