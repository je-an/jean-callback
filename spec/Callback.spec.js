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
        describe("Callback", function () {
            it("TODO: Check if all members are available | EXPECTATION: Callback has all necessary members", function () {
                var numberOfMembers = 2;
                expect(Object.keys(cb).length).toEqual(numberOfMembers);
            });
            it("TODO: Check if all methods are available | EXPECTATION: Callback has all necessary  methods", function () {
                var numberOfMethods = 3;
                var methodCount = Object.keys(Object.getPrototypeOf(cb)).length;
                expect(methodCount).toEqual(numberOfMethods);
            });
        });
        describe("Callback.prototype.registerFunction", function () {
            it("TODO: Register a callback | EXPECTATION: Callback registered successfully", function () {
                expect(cb.registerFunction(function () { })).toBe(true);
                expect(cb._callbacks.length).toEqual(1);
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
            it("TODO: Broadcast although nothing is registered | EXPECTATION: Nothing is notified", function () {
                expect(cb.broadcastToFunctions(true)).toBe(false);
            });
            it("TODO: Broadcast to registered callbacks after a callback is removed | EXPECTATION: Callbacks will be notified", function () {
                var count = 0;
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
            it("TODO: Broadcast to registered callbacks after a callback is removed and added later after first broadcast | EXPECTATION: Callbacks will be notified", function () {
                var count = 0;
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

