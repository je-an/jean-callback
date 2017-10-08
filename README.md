## Description

Provides a simple mechanism for registering callbacks and broadcast to them.

## Supported Systems
Supports both CommonJS and AMD eco system. If there is no loader, Callback is registered as a browser variable.

## Code Example
- Use it as browser variable 
```js
var fnOne = function (params) { /* Work with params */ },
    fnTwo = function (params) { /* Work with params */ },
    fnThree = function (params) { /* Work with params */ }; 

// Create Callback
var cb = new Callback();

// Register functions
cb.registerFunction(fnOne);
cb.registerFunction(fnTwo);
cb.registerFunction(fnThree);

// Broadcast params to registered functions 
cb.broadcastToFunctions({ name: "name" });

// Remove a function
cb.unregisterFunction(fnOne);
```
- Use it with require.js
```js
require(["path/to/Callback"], function(Callback){
     // Work with Callback
});
```
- Use it with node.js
```js
// Use it within node.js
var Callback = require("jean-callback");
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