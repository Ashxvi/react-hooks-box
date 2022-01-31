# react-hooks-box

[![NPM](https://img.shields.io/npm/v/react-hooks-box.svg)](https://www.npmjs.com/package/react-hooks-box)
[![npm](https://img.shields.io/npm/dm/react-hooks-box.svg)](https://www.npmjs.com/package/react-hooks-box)

The useAxios hook for React that automatically handles the request cancellation on unmount, triggers the call after your component mount or manually, etc.
## Install

```bash
npm install --save react-hooks-box
```

Or with yarn:

```bash
yarn add react-hooks-box
```

# How to use useAxios custom hook
 ```typescript
 import useAxios from 'react-hooks-box/useAxios';
```

then inside your functional component:
 ```typescript
 const [{ isLoading, response, error }, request] = useAxios({
      method: 'get',
      url: 'my-url',
      afterMount: true,
      axiosConfig
    });
```

 Inputs:
 *  **afterMount** `{boolean}`: set to true will execute the axios call just after the mount. It's false by default.
 *  **axiosConfig** `{Object}`: all classic axios config object.

 Outputs
 *  **request** `{Function}`: a function that will trigger axios call manually with extended axios config object (optional) as parameter.
 *  **isLoading** `{boolean}`: a flag set to true when the axios call is in process, by default 'false'.
 *  **response** `{Object}`: an object that contains the data response if the axios call is successful, by default 'undefined'.
 *  **error** `{Object}`: an object that contains the error object if the axios call has failed, by default 'undefined'.

## License

MIT
