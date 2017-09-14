## Description

Provides a simple mechanism for registering callbacks and broadcast to them.

## Code Example

```js
require(["path/to/Callback"], function(Callback){
     var fnOne = function (params) { /* Work with params */ },
         fnTwo = function (params) { /* Work with params */ },
         fnThree = function (params) { /* Work with params */ }; 

    // Create Callback and register functions
    var cb = new Callback();
    cb.registerFunction(fnOne);
    cb.registerFunction(fnTwo);
    cb.registerFunction(fnThree);

    // Broadcast params to registered functions 
    cb.broadcastToFunctions({ name: "name" });

    // Remove a function
    cb.unregisterFunction(fnOne);
});
```

## Installation

`npm install jean-callback --save --legacy-bundling`

## API Reference

### Callback.registerFunction(callback) 

Register function as callback

**Parameters**
- **callback**: `function` -  function, to be registered

**Returns**
- `Boolean` - True if the function is registered, false otherwise

### Callback.unregisterFunction(callback) 

Unregister a callback

**Parameters**
- **callback**: `function` - The callback which shall be removed

**Returns**
- `Boolean` - true if the function is removed, false otherwise

### Callback.broadcastToFunctions(paramsForCallbacks) 

Broadcast to all registered callbacks

**Parameters**
- **paramsForCallbacks**: `Any` - Params, which should be passed to registered callbacks

**Returns**
- `Boolean` - True, if callbacks get notified, false otherwise


## Tests

Open spec/spec-runner.html in browser to see the test cases.

## License

MIT