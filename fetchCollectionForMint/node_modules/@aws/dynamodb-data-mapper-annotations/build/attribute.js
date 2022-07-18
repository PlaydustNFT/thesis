"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
require("reflect-metadata");
var constants_1 = require("./constants");
var dynamodb_auto_marshaller_1 = require("@aws/dynamodb-auto-marshaller");
var dynamodb_data_mapper_1 = require("@aws/dynamodb-data-mapper");
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
function attribute(parameters) {
    if (parameters === void 0) { parameters = {}; }
    return function (target, propertyKey) {
        if (!Object.prototype.hasOwnProperty.call(target, dynamodb_data_mapper_1.DynamoDbSchema)) {
            Object.defineProperty(target, dynamodb_data_mapper_1.DynamoDbSchema, // TypeScript complains about the use of symbols here, though it should be allowed
            { value: deriveBaseSchema(target) });
        }
        var schemaType = metadataToSchemaType(Reflect.getMetadata(constants_1.METADATA_TYPE_KEY, target, propertyKey), parameters);
        if ((schemaType.keyType ||
            schemaType.indexKeyConfigurations) &&
            [
                'Binary',
                'Custom',
                'Date',
                'Number',
                'String',
            ].indexOf(schemaType.type) < 0) {
            throw new Error("Properties of type " + schemaType.type + " may not be used as index or table keys. If you are relying on automatic type detection and have encountered this error, please ensure that the 'emitDecoratorMetadata' TypeScript compiler option is enabled. Please see https://www.typescriptlang.org/docs/handbook/decorators.html#metadata for more information on this compiler option.");
        }
        target[dynamodb_data_mapper_1.DynamoDbSchema][propertyKey] = schemaType;
    };
}
exports.attribute = attribute;
function deriveBaseSchema(target) {
    if (target && typeof target === 'object') {
        var prototype = Object.getPrototypeOf(target);
        if (prototype) {
            return tslib_1.__assign({}, deriveBaseSchema(prototype), Object.prototype.hasOwnProperty.call(prototype, dynamodb_data_mapper_1.DynamoDbSchema)
                ? prototype[dynamodb_data_mapper_1.DynamoDbSchema]
                : {});
        }
    }
    return {};
}
function metadataToSchemaType(ctor, declaration) {
    var type = declaration.type, rest = tslib_1.__rest(declaration, ["type"]);
    if (type === undefined) {
        if (ctor) {
            if (ctor === String) {
                type = 'String';
            }
            else if (ctor === Number) {
                type = 'Number';
            }
            else if (ctor === Boolean) {
                type = 'Boolean';
            }
            else if (ctor === Date || ctor.prototype instanceof Date) {
                type = 'Date';
            }
            else if (ctor === dynamodb_auto_marshaller_1.BinarySet ||
                ctor.prototype instanceof dynamodb_auto_marshaller_1.BinarySet) {
                type = 'Set';
                rest.memberType = 'Binary';
            }
            else if (ctor === dynamodb_auto_marshaller_1.NumberValueSet ||
                ctor.prototype instanceof dynamodb_auto_marshaller_1.NumberValueSet) {
                type = 'Set';
                rest.memberType = 'Number';
            }
            else if (ctor === Set || ctor.prototype instanceof Set) {
                type = 'Set';
                if (!('memberType' in rest)) {
                    throw new Error('Invalid set declaration. You must specify a memberType');
                }
            }
            else if (ctor === Map || ctor.prototype instanceof Map) {
                type = 'Map';
                if (!('memberType' in rest)) {
                    throw new Error('Invalid map declaration. You must specify a memberType');
                }
            }
            else if (ctor.prototype[dynamodb_data_mapper_1.DynamoDbSchema]) {
                type = 'Document';
                rest.members = ctor.prototype[dynamodb_data_mapper_1.DynamoDbSchema];
                rest.valueConstructor = ctor;
            }
            else if (isBinaryType(ctor)) {
                type = 'Binary';
            }
            else if (ctor === Array || ctor.prototype instanceof Array) {
                if ('members' in declaration) {
                    type = 'Tuple';
                }
                else if ('memberType' in declaration) {
                    type = 'List';
                }
                else {
                    type = 'Collection';
                }
            }
            else {
                type = 'Any';
            }
        }
        else {
            type = 'Any';
        }
    }
    return tslib_1.__assign({}, rest, { type: type });
}
/**
 * ArrayBuffer.isView will only evaluate if an object instance is an
 * ArrayBufferView, but TypeScript metadata gives us a reference to the class.
 *
 * This function checks if the provided constructor is or extends the built-in
 * `ArrayBuffer` constructor, the `DataView` constructor, or any `TypedArray`
 * constructor.
 *
 * This function will need to be modified if new binary types are added to
 * JavaScript (e.g., the `Int64Array` or `Uint64Array` discussed in
 * {@link https://github.com/tc39/proposal-bigint the BigInt TC39 proposal}.
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/API/ArrayBufferView
 */
function isBinaryType(arg) {
    return arg === Uint8Array || arg.prototype instanceof Uint8Array ||
        arg === Uint8ClampedArray || arg.prototype instanceof Uint8ClampedArray ||
        arg === Uint16Array || arg.prototype instanceof Uint16Array ||
        arg === Uint32Array || arg.prototype instanceof Uint32Array ||
        arg === Int8Array || arg.prototype instanceof Int8Array ||
        arg === Int16Array || arg.prototype instanceof Int16Array ||
        arg === Int32Array || arg.prototype instanceof Int32Array ||
        arg === Float32Array || arg.prototype instanceof Float32Array ||
        arg === Float64Array || arg.prototype instanceof Float64Array ||
        arg === ArrayBuffer || arg.prototype instanceof ArrayBuffer ||
        arg === DataView || arg.prototype instanceof DataView;
}
//# sourceMappingURL=attribute.js.map