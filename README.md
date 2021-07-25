# react-hooks-box

[![NPM](https://img.shields.io/npm/v/react-hooks-box.svg)](https://www.npmjs.com/package/react-hooks-box)
[![npm](https://img.shields.io/npm/dm/react-hooks-box.svg)](https://www.npmjs.com/package/react-hooks-box)

The useAxios hook for React that automatically handles the request cancellation on unmount, triggers the call after mount or manually, etc.
## Install

```bash
npm install --save react-hooks-box
```

Or with yarn:

```bash
yarn add react-hooks-box
```

# How to use useAxios custom hook
 ```javascript
 const [{ isLoading, response, error }, request] = useAxios({
      method: 'get',
      url: 'my-url',
      afterMount: true,
      axiosConfig
    });
```

 Inputs:
 * `{boolean}` _afterMount_: set to true will execute the axios call just after the mount. It's false by default.
 * `{Object}` _axiosConfig_: all classic axios config object.

 Outputs
 * `{Function}` _request_: a function that will trigger axios call manually with extended axios config object (optional) as parameter.
 * `{boolean}` isLoading_: a flag set to true when the axios call is in process, by default 'false'.
 * `{Object}` _response_: an object that contains the data response if the axios call is successful, by default 'undefined'.
 * `{Object}`_error_: an object that contains the error object if the axios call has failed, by default 'undefined'.

## License

MIT
