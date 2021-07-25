#!/bin/bash

npm run build
cp package.json ./dist
# or, if you need to have package.json "main" entry different,
# e.g. for being able to use `npm link`, you need to replace "main" value:
# sed 's#"main": "./dist/index.js"#"main": "./index.js"#' package.json > ./dist/package.json
cd ./dist
npm publish
