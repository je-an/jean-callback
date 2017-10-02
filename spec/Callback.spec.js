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
                it("All necessary members are available", function () {
                    var numberOfMembers = 2;
                    expect(Object.keys(cb).length).toEqual(numberOfMembers);
                    expect(cb.id).not.toBeUndefined();
                    expect(cb._callbacks).not.toBeUndefined();
                });
                it("All necessary methods are available", function () {
                    var numberOfMethods = 3;
                    var methodCount = Object.keys(Object.getPrototypeOf(cb)).length;
                    expect(methodCount).toEqual(numberOfMethods);
                    expect(cb.registerFunction).not.toBeUndefined();
                    expect(cb.unregisterFunction).not.toBeUndefined();
                    expect(cb.broadcastToFunctions).not.toBeUndefined();
                });
                it("initialises successfully, if valid options are passed", function () {
                    var c = new Callback({ id: "callback" });
                    expect(c.id).toEqual("callback");
                    expect(c._callbacks).toEqual([]);
                });
                it("Does standard initialisation, if something invalid is passed to constructor", function () {
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
                it("Does standard initialisation, if something invalid is passed to constructor as id", function () {
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
                it("Registers a callback", function () {
                    expect(cb.registerFunction(function () { })).toBe(true);
                    expect(cb._callbacks.length).toEqual(1);
                });
                it("Registers multiple callbacks", function () {
                    expect(cb.registerFunction(function () { })).toBe(true);
                    expect(cb._callbacks.length).toEqual(1);
                    expect(cb.registerFunction(function () { })).toBe(true);
                    expect(cb._callbacks.length).toEqual(2);
                    expect(cb.registerFunction(function () { })).toBe(true);
                    expect(cb._callbacks.length).toEqual(3);
                    expect(cb.registerFunction(function () { })).toBe(true);
                    expect(cb._callbacks.length).toEqual(4);
                });
                it("Registers nothing, if something invalid is passed for registration", function () {
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
                it("Unregister a registered callback", function () {
                    cb.registerFunction(fnOne);
                    cb.registerFunction(fnTwo);
                    cb.registerFunction(fnThree);
                    expect(cb.unregisterFunction(fnOne)).toBe(true);
                    expect(cb._callbacks.length).toEqual(2);
                });
                it("Does nothing, if a function shall be unregistered, which is not registered before", function () {
                    cb.registerFunction(fnOne);
                    cb.registerFunction(fnTwo);
                    cb.registerFunction(fnThree);
                    expect(cb.unregisterFunction(function () { })).toBe(false);
                    expect(cb._callbacks.length).toEqual(3);
                });
            });
            describe("Callback.prototype.broadcastToFunctions", function () {
                it("Broadcasts values to registered functions", function () {
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
                it("Broadcasts null values to functions", function () {
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
                it("Broadcasts undefined values to functions", function () {
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
                it("Broadcasts nothing, if no functions are registered", function () {
                    expect(cb.broadcastToFunctions(true)).toBe(false);
                });
            });
        });
        describe("Behaviour", function () {
            it("Registers three functions, broadcasts and removes the second of the registered functions", function () {
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
            it("Registers three functions, removes one and broadcasts to remaining function", function () {
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
            it("Registers three functions, removes one, broadcasts to remaining, and add the removed one again", function () {
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

