define(["TypeCheck"], function (TypeCheck) {
    /**
     * Provides a simple mechanism for registering callbacks and 
     * broadcast to them.
     * @alias Callback 
     * @constructor
     * @param {Object} options - options object
     * @param {String} options.id - callback identifier
     */
    var Callback = function (options) {
        if (!TypeCheck.isDefined(options) || !TypeCheck.isObject(options)) {
            options = {};
        }
        this.id = TypeCheck.isString(options.id) ? options.id : "";
        this._callbacks = [];
    };  
    /**
     * Register function as callback
     * @param {Function} callback - function, to be registered
     * @returns {Boolean} - True if the function is registered, false otherwise
     */
    Callback.prototype.registerFunction = function (callback) {
        var isRegistered = false;
        if (TypeCheck.isFunction(callback)) {
            this._callbacks.push(callback);
            isRegistered = true;
        } else {
            isRegistered = false;
        }
        return isRegistered;
    };
    /**
     * Unregister a callback
     * @param {Function} callback - The callback which shall be removed
     * @returns {Boolean} - true if the function is removed, false otherwise
     */
    Callback.prototype.unregisterFunction = function (callback) {
        var index = this._callbacks.indexOf(callback), isRemoved = true;
        if (index >= 0) {
            this._callbacks.splice(index, 1);
        } else {
            isRemoved = false;
        }
        return isRemoved;
    };
    /**
     * Broadcast to all registered callbacks
     * @param {Any} paramsForCallbacks - Params, which should be passed to registered callbacks
     * @returns {Boolean} - True, if callbacks get notified, false otherwise
     */
    Callback.prototype.broadcastToFunctions = function (paramsForCallbacks) {
        var callbacks = this._callbacks, length = callbacks.length, isNotified = false;
        if (length > 0) {
            for (var i = 0; i < length; i++) {
                (callbacks[i].bind(this))(paramsForCallbacks);
            }
            isNotified = true;
        }
        return isNotified;
    };

    return Callback;
});