# Amplify-rollup-bug
This repro is created with [rollup-startup-app](https://github.com/rollup/rollup-starter-app). 

To run the repro, Run 
```bash
$ yarn
$ yarn build
$ yarn start
```
and navigate to `http://localhost:5000/`. With the latest amplify, you'll see this error:

```
Cookies.js:5 Uncaught ReferenceError: require is not defined
```

This is because `universal-cookie`' es6 module has a `require` keyword.

*` src/node_modules/universal-cookie/es6/Cookies.js`*:
```javascript
var objectAssign = require('object-assign');
```

Rollup's cjs plugin doesn't translate this `require` keyword to es syntax and hence this error.
