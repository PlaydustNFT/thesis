"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var _a;
var _this = this;
var DataMapper_1 = require("./DataMapper");
var ItemNotFoundException_1 = require("./ItemNotFoundException");
var protocols_1 = require("./protocols");
var os_1 = require("os");
var process_1 = require("process");
var DynamoDB = require("aws-sdk/clients/dynamodb");
var dynamodb_expressions_1 = require("@aws/dynamodb-expressions");
var nestedDocumentDef = {
    type: 'Document',
    members: {
        foo: { type: 'String' }
    }
};
nestedDocumentDef.members.recursive = nestedDocumentDef;
var _b = tslib_1.__read(process_1.hrtime(), 2), seconds = _b[0], nanoseconds = _b[1];
var TableName = "mapper-integ-" + seconds + "-" + nanoseconds + "-" + os_1.hostname();
var schema = {
    key: {
        type: 'Number',
        attributeName: 'testIndex',
        keyType: 'HASH',
    },
    timestamp: { type: 'Date' },
    data: nestedDocumentDef,
    tuple: {
        type: 'Tuple',
        members: [
            { type: 'Boolean' },
            { type: 'String' },
        ]
    },
    scanIdentifier: { type: 'Number' }
};
var TestRecord = /** @class */ (function () {
    function TestRecord() {
    }
    return TestRecord;
}());
Object.defineProperties(TestRecord.prototype, (_a = {},
    _a[protocols_1.DynamoDbSchema] = { value: schema },
    _a[protocols_1.DynamoDbTable] = { value: TableName },
    _a));
describe('DataMapper', function () {
    var idx = 0;
    var ddbClient = new DynamoDB();
    var mapper = new DataMapper_1.DataMapper({ client: ddbClient });
    jest.setTimeout(60000);
    beforeAll(function () {
        return mapper.ensureTableExists(TestRecord, {
            readCapacityUnits: 10,
            writeCapacityUnits: 10,
        });
    });
    afterAll(function () {
        return mapper.ensureTableNotExists(TestRecord);
    });
    it('should save and load objects', function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
        var key, mapper, timestamp, item, _a, _b;
        return tslib_1.__generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    key = idx++;
                    mapper = new DataMapper_1.DataMapper({ client: ddbClient });
                    timestamp = new Date();
                    // subsecond precision will not survive the trip through the serializer,
                    // as DynamoDB's ttl fields use unix epoch (second precision) timestamps
                    timestamp.setMilliseconds(0);
                    item = new TestRecord();
                    item.key = key;
                    item.timestamp = timestamp;
                    item.data = {
                        recursive: {
                            recursive: {
                                recursive: {
                                    foo: '',
                                },
                            },
                        },
                    };
                    _a = expect;
                    return [4 /*yield*/, mapper.put(item)];
                case 1:
                    _a.apply(void 0, [_c.sent()]).toEqual(item);
                    _b = expect;
                    return [4 /*yield*/, mapper.get(item, { readConsistency: 'strong' })];
                case 2:
                    _b.apply(void 0, [_c.sent()])
                        .toEqual(item);
                    return [2 /*return*/];
            }
        });
    }); });
    it('should delete objects', function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
        var key, mapper, timestamp, item;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    key = idx++;
                    mapper = new DataMapper_1.DataMapper({ client: ddbClient });
                    timestamp = new Date();
                    // subsecond precision will not survive the trip through the serializer,
                    // as DynamoDB's ttl fields use unix epoch (second precision) timestamps
                    timestamp.setMilliseconds(0);
                    item = new TestRecord();
                    item.key = key;
                    item.timestamp = timestamp;
                    item.data = {
                        recursive: {
                            recursive: {
                                recursive: {
                                    foo: '',
                                },
                            },
                        },
                    };
                    return [4 /*yield*/, mapper.put(item)];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, expect(mapper.get(item, { readConsistency: 'strong' })).resolves];
                case 2:
                    _a.sent();
                    return [4 /*yield*/, mapper.delete(item)];
                case 3:
                    _a.sent();
                    return [4 /*yield*/, expect(mapper.get(item, { readConsistency: 'strong' }))
                            .rejects
                            .toMatchObject(new ItemNotFoundException_1.ItemNotFoundException({
                            TableName: TableName,
                            ConsistentRead: true,
                            Key: { testIndex: { N: key.toString(10) } }
                        }))];
                case 4:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    it('should scan objects', function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
        var e_1, _a, e_2, _b, keys, mapper, scanIdentifier, items, i, item, _c, _d, _1, e_1_1, results, _e, _f, element, e_2_1;
        return tslib_1.__generator(this, function (_g) {
            switch (_g.label) {
                case 0:
                    keys = [];
                    mapper = new DataMapper_1.DataMapper({ client: ddbClient });
                    scanIdentifier = Date.now();
                    items = [];
                    for (i = 0; i < 30; i++) {
                        item = new TestRecord();
                        item.key = idx++;
                        item.tuple = [item.key % 2 === 0, 'string'];
                        item.scanIdentifier = scanIdentifier;
                        keys.push(item.key);
                        items.push(item);
                    }
                    _g.label = 1;
                case 1:
                    _g.trys.push([1, 6, 7, 12]);
                    _c = tslib_1.__asyncValues(mapper.batchPut(items));
                    _g.label = 2;
                case 2: return [4 /*yield*/, _c.next()];
                case 3:
                    if (!(_d = _g.sent(), !_d.done)) return [3 /*break*/, 5];
                    _1 = _d.value;
                    _g.label = 4;
                case 4: return [3 /*break*/, 2];
                case 5: return [3 /*break*/, 12];
                case 6:
                    e_1_1 = _g.sent();
                    e_1 = { error: e_1_1 };
                    return [3 /*break*/, 12];
                case 7:
                    _g.trys.push([7, , 10, 11]);
                    if (!(_d && !_d.done && (_a = _c.return))) return [3 /*break*/, 9];
                    return [4 /*yield*/, _a.call(_c)];
                case 8:
                    _g.sent();
                    _g.label = 9;
                case 9: return [3 /*break*/, 11];
                case 10:
                    if (e_1) throw e_1.error;
                    return [7 /*endfinally*/];
                case 11: return [7 /*endfinally*/];
                case 12:
                    results = [];
                    _g.label = 13;
                case 13:
                    _g.trys.push([13, 18, 19, 24]);
                    _e = tslib_1.__asyncValues(mapper.scan(TestRecord, {
                        readConsistency: 'strong',
                        filter: tslib_1.__assign({}, dynamodb_expressions_1.equals(scanIdentifier), { subject: 'scanIdentifier' }),
                    }));
                    _g.label = 14;
                case 14: return [4 /*yield*/, _e.next()];
                case 15:
                    if (!(_f = _g.sent(), !_f.done)) return [3 /*break*/, 17];
                    element = _f.value;
                    results.push(element);
                    _g.label = 16;
                case 16: return [3 /*break*/, 14];
                case 17: return [3 /*break*/, 24];
                case 18:
                    e_2_1 = _g.sent();
                    e_2 = { error: e_2_1 };
                    return [3 /*break*/, 24];
                case 19:
                    _g.trys.push([19, , 22, 23]);
                    if (!(_f && !_f.done && (_b = _e.return))) return [3 /*break*/, 21];
                    return [4 /*yield*/, _b.call(_e)];
                case 20:
                    _g.sent();
                    _g.label = 21;
                case 21: return [3 /*break*/, 23];
                case 22:
                    if (e_2) throw e_2.error;
                    return [7 /*endfinally*/];
                case 23: return [7 /*endfinally*/];
                case 24:
                    expect(results.sort(function (a, b) { return a.key - b.key; })).toEqual(keys.map(function (key) {
                        var record = new TestRecord();
                        record.key = key;
                        record.scanIdentifier = scanIdentifier;
                        record.tuple = [key % 2 === 0, 'string'];
                        return record;
                    }));
                    return [2 /*return*/];
            }
        });
    }); });
    it('should scan objects in parallel', function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
        var e_3, _a, e_4, _b, keys, mapper, scanIdentifier, items, i, item, _c, _d, _2, e_3_1, results, _e, _f, element, e_4_1;
        return tslib_1.__generator(this, function (_g) {
            switch (_g.label) {
                case 0:
                    keys = [];
                    mapper = new DataMapper_1.DataMapper({ client: ddbClient });
                    scanIdentifier = Date.now();
                    items = [];
                    for (i = 0; i < 10; i++) {
                        item = new TestRecord();
                        item.key = idx++;
                        item.tuple = [item.key % 2 === 0, 'string'];
                        item.scanIdentifier = scanIdentifier;
                        keys.push(item.key);
                        items.push(item);
                    }
                    _g.label = 1;
                case 1:
                    _g.trys.push([1, 6, 7, 12]);
                    _c = tslib_1.__asyncValues(mapper.batchPut(items));
                    _g.label = 2;
                case 2: return [4 /*yield*/, _c.next()];
                case 3:
                    if (!(_d = _g.sent(), !_d.done)) return [3 /*break*/, 5];
                    _2 = _d.value;
                    _g.label = 4;
                case 4: return [3 /*break*/, 2];
                case 5: return [3 /*break*/, 12];
                case 6:
                    e_3_1 = _g.sent();
                    e_3 = { error: e_3_1 };
                    return [3 /*break*/, 12];
                case 7:
                    _g.trys.push([7, , 10, 11]);
                    if (!(_d && !_d.done && (_a = _c.return))) return [3 /*break*/, 9];
                    return [4 /*yield*/, _a.call(_c)];
                case 8:
                    _g.sent();
                    _g.label = 9;
                case 9: return [3 /*break*/, 11];
                case 10:
                    if (e_3) throw e_3.error;
                    return [7 /*endfinally*/];
                case 11: return [7 /*endfinally*/];
                case 12:
                    results = [];
                    _g.label = 13;
                case 13:
                    _g.trys.push([13, 18, 19, 24]);
                    _e = tslib_1.__asyncValues(mapper.parallelScan(TestRecord, 4, {
                        readConsistency: 'strong',
                        filter: tslib_1.__assign({}, dynamodb_expressions_1.equals(scanIdentifier), { subject: 'scanIdentifier' }),
                    }));
                    _g.label = 14;
                case 14: return [4 /*yield*/, _e.next()];
                case 15:
                    if (!(_f = _g.sent(), !_f.done)) return [3 /*break*/, 17];
                    element = _f.value;
                    results.push(element);
                    _g.label = 16;
                case 16: return [3 /*break*/, 14];
                case 17: return [3 /*break*/, 24];
                case 18:
                    e_4_1 = _g.sent();
                    e_4 = { error: e_4_1 };
                    return [3 /*break*/, 24];
                case 19:
                    _g.trys.push([19, , 22, 23]);
                    if (!(_f && !_f.done && (_b = _e.return))) return [3 /*break*/, 21];
                    return [4 /*yield*/, _b.call(_e)];
                case 20:
                    _g.sent();
                    _g.label = 21;
                case 21: return [3 /*break*/, 23];
                case 22:
                    if (e_4) throw e_4.error;
                    return [7 /*endfinally*/];
                case 23: return [7 /*endfinally*/];
                case 24:
                    expect(results.sort(function (a, b) { return a.key - b.key; })).toEqual(keys.map(function (key) {
                        var record = new TestRecord();
                        record.key = key;
                        record.scanIdentifier = scanIdentifier;
                        record.tuple = [key % 2 === 0, 'string'];
                        return record;
                    }));
                    return [2 /*return*/];
            }
        });
    }); });
    it('should query objects', function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
        var e_5, _a, mapper, item, _b, _c, element, e_5_1;
        return tslib_1.__generator(this, function (_d) {
            switch (_d.label) {
                case 0:
                    mapper = new DataMapper_1.DataMapper({ client: ddbClient });
                    item = new TestRecord();
                    item.key = idx++;
                    item.tuple = [item.key % 2 === 0, 'string'];
                    return [4 /*yield*/, mapper.put({ item: item })];
                case 1:
                    _d.sent();
                    _d.label = 2;
                case 2:
                    _d.trys.push([2, 7, 8, 13]);
                    _b = tslib_1.__asyncValues(mapper.query(TestRecord, { key: item.key }, { readConsistency: 'strong' }));
                    _d.label = 3;
                case 3: return [4 /*yield*/, _b.next()];
                case 4:
                    if (!(_c = _d.sent(), !_c.done)) return [3 /*break*/, 6];
                    element = _c.value;
                    expect(element).toEqual(item);
                    _d.label = 5;
                case 5: return [3 /*break*/, 3];
                case 6: return [3 /*break*/, 13];
                case 7:
                    e_5_1 = _d.sent();
                    e_5 = { error: e_5_1 };
                    return [3 /*break*/, 13];
                case 8:
                    _d.trys.push([8, , 11, 12]);
                    if (!(_c && !_c.done && (_a = _b.return))) return [3 /*break*/, 10];
                    return [4 /*yield*/, _a.call(_b)];
                case 9:
                    _d.sent();
                    _d.label = 10;
                case 10: return [3 /*break*/, 12];
                case 11:
                    if (e_5) throw e_5.error;
                    return [7 /*endfinally*/];
                case 12: return [7 /*endfinally*/];
                case 13: return [2 /*return*/];
            }
        });
    }); });
});
//# sourceMappingURL=DataMapper.integ.js.map