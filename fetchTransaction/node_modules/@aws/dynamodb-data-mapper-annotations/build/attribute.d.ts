import 'reflect-metadata';
import { PropertyAnnotation } from './annotationShapes';
import { SchemaType } from "@aws/dynamodb-data-marshaller";
/**
 * Declare a property in a TypeScript class to be part of a DynamoDB schema.
 * Meant to be used as a property decorator in conjunction with TypeScript's
 * emitted type metadata. If used with in a project compiled with the
 * `emitDecoratorMetadata` option enabled, the type will infer most types from
 * the TypeScript source.
 *
 * Please note that TypeScript does not emit any metadata about the type
 * parameters supplied to generic types, so `Array<string>`, `[number, string]`,
 * and `MyClass[]` are all exposed as `Array` via the emitted metadata. Without
 * additional metadata, this annotation will treat all encountered arrays as
 * collections of untyped data. You may supply either a `members` declaration or
 * a `memberType` declaration to direct this annotation to treat a property as a
 * tuple or typed list, respectively.
 *
 * Member type declarations are required for maps and sets.
 *
 * @see https://www.typescriptlang.org/docs/handbook/decorators.html
 * @see https://www.typescriptlang.org/docs/handbook/compiler-options.html
 * @see https://github.com/Microsoft/TypeScript/issues/2577
 *
 * @example
 *  export class MyClass {
 *      @attribute()
 *      id: string;
 *
 *      @attribute()
 *      subdocument?: MyOtherClass;
 *
 *      @attribute()
 *      untypedCollection?: Array<any>;
 *
 *      @attribute({memberType: {type: 'String'}})
 *      listOfStrings?: Array<string>;
 *
 *      @attribute({members: [{type: 'Boolean', type: 'String'}]})
 *      tuple?: [boolean, string];
 *
 *      @attribute({memberType: {type: 'String'}})
 *      mapStringString?: Map<string, string>;
 *
 *      @attribute()
 *      binary?: Uint8Array;
 *  }
 */
export declare function attribute(parameters?: Partial<SchemaType>): PropertyAnnotation;
