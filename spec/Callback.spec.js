define([
    "Callback"
], function (Callback) {
    describe('Callback.spec.js', function () {
        var cb,
            fnOne = function () { }, // jscs:ignore
            fnTwo = function () { }, // jscs:ignore
            fnThree = function () { }; // jscs:ignore
        beforeEach(function () {
            cb = new Callback();
        });
        describe("Methods", function () {
            describe("Callback Constructor", function () {
                it("TODO: Check if all members are available | EXPECTATION: Callback has all necessary members", function () {
                    var numberOfMembers = 2;
                    expect(Object.keys(cb).length).toEqual(numberOfMembers);
                });
                it("TODO: Check if all methods are available | EXPECTATION: Callback has all necessary  methods", function () {
                    var numberOfMethods = 3;
                    var methodCount = Object.keys(Object.getPrototypeOf(cb)).length;
                    expect(methodCount).toEqual(numberOfMethods);
                });
                it("TODO: Pass valid parameters to constructor | EXPECTATION: Callback is initialized successful", function () {
                    var c = new Callback({ id: "callback" });
                    expect(c.id).toEqual("callback");
                    expect(c._callbacks).toEqual([]);
                });
                it("TODO: Pass invalid parameter as argument to constructor | EXPECTATION: Argument is ignored, Callback is standard initialised", function () {
                    var c = new Callback(function () { });
                    expect(c.id).toEqual("");
                    c = new Callback(true);
                    expect(c.id).toEqual("");
                    c = new Callback(1);
                    expect(c.id).toEqual("");
                    c = new Callback("bullshit");
                    expect(c.id).toEqual("");
                    c = new Callback(null);
                    expect(c.id).toEqual("");
                    c = new Callback(undefined);
                    expect(c.id).toEqual("");
                });
                it("TODO: Pass invalid parameter for id to constructor | EXPECTATION: Id is ignored and default initialised", function () {
                    var c = new Callback({ id: 1 });
                    expect(c.id).toEqual("");
                    var c = new Callback({ id: false });
                    expect(c.id).toEqual("");
                    var c = new Callback({ id: function () { } });
                    expect(c.id).toEqual("");
                    var c = new Callback({ id: {} });
                    expect(c.id).toEqual("");
                    var c = new Callback({ id: null });
                    expect(c.id).toEqual("");
                    var c = new Callback({ id: undefined });
                    expect(c.id).toEqual("");
                });
            });
            describe("Callback.prototype.registerFunction", function () {
                it("TODO: Register a callback | EXPECTATION: Callback registered successfully", function () {
                    expect(cb.registerFunction(function () { })).toBe(true);
                    expect(cb._callbacks.length).toEqual(1);
                });
                it("TODO: Register multiple callbacks | EXPECTATION: Callbacks registered successfully", function () {
                    expect(cb.registerFunction(function () { })).toBe(true);
                    expect(cb._callbacks.length).toEqual(1);
                    expect(cb.registerFunction(function () { })).toBe(true);
                    expect(cb._callbacks.length).toEqual(2);
                    expect(cb.registerFunction(function () { })).toBe(true);
                    expect(cb._callbacks.length).toEqual(3);
                    expect(cb.registerFunction(function () { })).toBe(true);
                    expect(cb._callbacks.length).toEqual(4);
                });
                it("TODO: Register something else as an callback | EXPECTATION: Nothing will be registered", function () {
                    expect(cb.registerFunction(10)).toBe(false);
                    expect(cb._callbacks.length).toEqual(0);
                    expect(cb.registerFunction("name")).toBe(false);
                    expect(cb._callbacks.length).toEqual(0);
                    expect(cb.registerFunction(true)).toBe(false);
                    expect(cb._callbacks.length).toEqual(0);
                    expect(cb.registerFunction({})).toBe(false);
                    expect(cb._callbacks.length).toEqual(0);
                    expect(cb.registerFunction(null)).toBe(false);
                    expect(cb._callbacks.length).toEqual(0);
                    expect(cb.registerFunction(undefined)).toBe(false);
                    expect(cb._callbacks.length).toEqual(0);
                });
            });
            describe("Callback.prototype.unregisterFunction", function () {
                it("TODO: Unregister a registered callback | EXPECTATION: Callback will be removed successfully", function () {
                    cb.registerFunction(fnOne);
                    cb.registerFunction(fnTwo);
                    cb.registerFunction(fnThree);
                    expect(cb.unregisterFunction(fnOne)).toBe(true);
                    expect(cb._callbacks.length).toEqual(2);
                });
                it("TODO: Try to unregister a non registered function | EXPECTATION: Nothing will be removed", function () {
                    cb.registerFunction(fnOne);
                    cb.registerFunction(fnTwo);
                    cb.registerFunction(fnThree);
                    expect(cb.unregisterFunction(function () { })).toBe(false);
                    expect(cb._callbacks.length).toEqual(3);
                });
            });
            describe("Callback.prototype.broadcastToFunctions", function () {
                it("TODO: Broadcast to registered callbacks | EXPECTATION: Callbacks will be notified", function () {
                    var fnOne = function (param) { // jscs:ignore
                        expect(param).toBe(true);
                    },
                        fnTwo = function (param) { // jscs:ignore
                            expect(param).toBe(true);
                        },
                        fnThree = function (param) { // jscs:ignore
                            expect(param).toBe(true);
                        };
                    cb.registerFunction(fnOne);
                    cb.registerFunction(fnTwo);
                    cb.registerFunction(fnThree);
                    expect(cb.broadcastToFunctions(true)).toBe(true);
                });
                it("TODO: Broadcast null to registered callbacks | EXPECTATION: Callbacks will be notified", function () {
                    var fnOne = function (param) { // jscs:ignore
                        expect(param).toBe(null);
                    },
                        fnTwo = function (param) { // jscs:ignore
                            expect(param).toBe(null);
                        },
                        fnThree = function (param) { // jscs:ignore
                            expect(param).toBe(null);
                        };
                    cb.registerFunction(fnOne);
                    cb.registerFunction(fnTwo);
                    cb.registerFunction(fnThree);
                    expect(cb.broadcastToFunctions(null)).toBe(true);
                });
                it("TODO: Broadcast undefined registered callbacks | EXPECTATION: Callbacks will be notified", function () {
                    var fnOne = function (param) { // jscs:ignore
                        expect(param).toBe(undefined);
                    },
                        fnTwo = function (param) { // jscs:ignore
                            expect(param).toBe(undefined);
                        },
                        fnThree = function (param) { // jscs:ignore
                            expect(param).toBe(undefined);
                        };
                    cb.registerFunction(fnOne);
                    cb.registerFunction(fnTwo);
                    cb.registerFunction(fnThree);
                    expect(cb.broadcastToFunctions(undefined)).toBe(true);
                });
                it("TODO: Broadcast although nothing is registered | EXPECTATION: Nothing is notified", function () {
                    expect(cb.broadcastToFunctions(true)).toBe(false);
                });
            });
        });
        describe("Behaviour", function () {
            describe("Callback", function () {
                it("should register three functions, broadcast to them, and remove the second of the registered function", function () {
                    var cb = new Callback();
                    var fnOne = function (id) {
                        expect(id).toEqual("id");
                    };
                    var fnTwo = function (id) {
                        expect(id).toEqual("id");
                    };
                    var fnThree = function (id) {
                        expect(id).toEqual("id");
                    };
                    cb.registerFunction(fnOne);
                    cb.registerFunction(fnTwo);
                    cb.registerFunction(fnThree);
                    expect(cb._callbacks.length).toEqual(3);
                    var d = cb.broadcastToFunctions("id");
                    expect(d).toBe(true);
                    cb.unregisterFunction(fnTwo);
                    expect(cb._callbacks.length).toEqual(2);
                });
                it("should register three functions, remove one, and broadcast to remaining", function () {
                    var count = 0;
                    var cb = new Callback();
                    var fnOne = function (param) { // jscs:ignore
                        expect(param).toBe(true);
                        count++;
                    },
                        fnTwo = function (param) { // jscs:ignore
                            expect(param).toBe(true);
                            count++;
                        },
                        fnThree = function (param) { // jscs:ignore
                            expect(param).toBe(true);
                            count++;
                        };
                    cb.registerFunction(fnOne);
                    cb.registerFunction(fnTwo);
                    cb.registerFunction(fnThree);
                    cb.unregisterFunction(fnOne);
                    expect(cb.broadcastToFunctions(true)).toBe(true);
                    expect(count).toEqual(2);
                });
                it("should register three functions, remove one, broadcast to remaining, and add the remove one again",function(){
                    var count = 0;
                    var cb = new Callback();
                    var fnOne = function (param) { // jscs:ignore
                        expect(param).toBe(true);
                        count++;
                    },
                        fnTwo = function (param) { // jscs:ignore
                            expect(param).toBe(true);
                            count++;
                        },
                        fnThree = function (param) { // jscs:ignore
                            expect(param).toBe(true);
                            count++;
                        };
                    cb.registerFunction(fnOne);
                    cb.registerFunction(fnTwo);
                    cb.registerFunction(fnThree);
                    cb.unregisterFunction(fnOne);
                    expect(cb.broadcastToFunctions(true)).toBe(true);
                    expect(count).toEqual(2);
                    count = 0;
                    cb.registerFunction(fnOne);
                    expect(cb.broadcastToFunctions(true)).toBe(true);
                    expect(count).toEqual(3);
                });
            });
        });
    });
});

