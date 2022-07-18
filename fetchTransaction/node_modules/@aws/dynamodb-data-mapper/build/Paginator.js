"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var protocols_1 = require("./protocols");
var dynamodb_data_marshaller_1 = require("@aws/dynamodb-data-marshaller");
require('./asyncIteratorSymbolPolyfill');
var Paginator = /** @class */ (function () {
    function Paginator(paginator, valueConstructor) {
        this.paginator = paginator;
        this.valueConstructor = valueConstructor;
        this.lastResolved = Promise.resolve();
        this.itemSchema = protocols_1.getSchema(valueConstructor.prototype);
    }
    /**
     * @inheritDoc
     */
    Paginator.prototype[Symbol.asyncIterator] = function () {
        return this;
    };
    /**
     * @inheritDoc
     */
    Paginator.prototype.next = function () {
        var _this = this;
        this.lastResolved = this.lastResolved.then(function () { return _this.getNext(); });
        return this.lastResolved;
    };
    /**
     * @inheritDoc
     */
    Paginator.prototype.return = function () {
        // Prevent any further use of this iterator
        this.lastResolved = Promise.reject(new Error('Iteration has been manually interrupted and may not be resumed'));
        this.lastResolved.catch(function () { });
        return this.paginator.return();
    };
    Object.defineProperty(Paginator.prototype, "consumedCapacity", {
        /**
         * Retrieve the reported capacity consumed by this paginator. Will be
         * undefined unless returned consumed capacity is requested.
         */
        get: function () {
            return this.paginator.consumedCapacity;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Paginator.prototype, "count", {
        /**
         * Retrieve the number of items yielded thus far by this paginator.
         */
        get: function () {
            return this.paginator.count;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Paginator.prototype, "lastEvaluatedKey", {
        /**
         * Retrieve the last reported `LastEvaluatedKey`, unmarshalled according to
         * the schema used by this paginator.
         */
        get: function () {
            return this.lastKey;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Paginator.prototype, "scannedCount", {
        /**
         * Retrieve the number of items scanned thus far during the execution of
         * this paginator. This number should be the same as {@link count} unless a
         * filter expression was used.
         */
        get: function () {
            return this.paginator.scannedCount;
        },
        enumerable: true,
        configurable: true
    });
    Paginator.prototype.getNext = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var _this = this;
            return tslib_1.__generator(this, function (_a) {
                return [2 /*return*/, this.paginator.next().then(function (_a) {
                        var _b = _a.value, value = _b === void 0 ? {} : _b, done = _a.done;
                        if (!done) {
                            _this.lastKey = value.LastEvaluatedKey && dynamodb_data_marshaller_1.unmarshallItem(_this.itemSchema, value.LastEvaluatedKey, _this.valueConstructor);
                            return {
                                value: (value.Items || []).map(function (item) { return dynamodb_data_marshaller_1.unmarshallItem(_this.itemSchema, item, _this.valueConstructor); }),
                                done: false
                            };
                        }
                        return { done: true };
                    })];
            });
        });
    };
    return Paginator;
}());
exports.Paginator = Paginator;
//# sourceMappingURL=Paginator.js.map