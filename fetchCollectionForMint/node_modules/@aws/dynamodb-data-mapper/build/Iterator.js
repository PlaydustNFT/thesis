"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
require('./asyncIteratorSymbolPolyfill');
var Iterator = /** @class */ (function () {
    function Iterator(paginator) {
        this.paginator = paginator;
        this._count = 0;
        this.lastResolved = Promise.resolve();
        this.pending = [];
    }
    /**
     * @inheritDoc
     */
    Iterator.prototype[Symbol.asyncIterator] = function () {
        return this;
    };
    /**
     * @inheritDoc
     */
    Iterator.prototype.next = function () {
        var _this = this;
        this.lastResolved = this.lastResolved.then(function () { return _this.getNext(); });
        return this.lastResolved;
    };
    /**
     * Detaches the underlying paginator from this iterator and returns it. The
     * paginator will yield arrays of unmarshalled items, with each yielded
     * array corresponding to a single call to the underlying API. As with the
     * underlying API, pages may contain a variable number of items or no items,
     * in which case an empty array will be yielded.
     *
     * Calling this method will disable further iteration.
     */
    Iterator.prototype.pages = function () {
        // Prevent the iterator from being used further and squelch any uncaught
        // promise rejection warnings
        this.lastResolved = Promise.reject(new Error('The underlying paginator has been detached from this iterator.'));
        this.lastResolved.catch(function () { });
        return this.paginator;
    };
    /**
     * @inheritDoc
     */
    Iterator.prototype.return = function () {
        // Prevent any further use of this iterator
        this.lastResolved = Promise.reject(new Error('Iteration has been manually interrupted and may not be resumed'));
        this.lastResolved.catch(function () { });
        // Empty the pending queue to free up memory
        this.pending.length = 0;
        return this.paginator.return();
    };
    Object.defineProperty(Iterator.prototype, "consumedCapacity", {
        /**
         * Retrieve the reported capacity consumed by this iterator. Will be
         * undefined unless returned consumed capacity is requested.
         */
        get: function () {
            return this.paginator.consumedCapacity;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Iterator.prototype, "count", {
        /**
         * Retrieve the number of items yielded thus far by this iterator.
         */
        get: function () {
            return this._count;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Iterator.prototype, "scannedCount", {
        /**
         * Retrieve the number of items scanned thus far during the execution of
         * this iterator. This number should be the same as {@link count} unless a
         * filter expression was used.
         */
        get: function () {
            return this.paginator.scannedCount;
        },
        enumerable: true,
        configurable: true
    });
    Iterator.prototype.getNext = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var _this = this;
            return tslib_1.__generator(this, function (_a) {
                if (this.pending.length > 0) {
                    this.lastYielded = this.pending.shift();
                    this._count++;
                    return [2 /*return*/, {
                            done: false,
                            value: this.lastYielded
                        }];
                }
                return [2 /*return*/, this.paginator.next().then(function (_a) {
                        var _b = _a.value, value = _b === void 0 ? [] : _b, done = _a.done;
                        var _c;
                        if (!done) {
                            (_c = _this.pending).push.apply(_c, tslib_1.__spread(value));
                            return _this.getNext();
                        }
                        _this.lastYielded = undefined;
                        return { done: true };
                    })];
            });
        });
    };
    return Iterator;
}());
exports.Iterator = Iterator;
//# sourceMappingURL=Iterator.js.map