[![Built with
typescript](https://badgen.net/badge/icon/typescript?icon=typescript&label)](https://www.typescriptlang.org/)
[![version](https://badgen.net/npm/v/cdk-lambda-nodejs-mock)](https://www.npmjs.com/package/cdk-lambda-nodejs-mock)
![dependants](https://badgen.net/npm/dependents/cdk-lambda-nodejs-mock)
![license](https://badgen.net/npm/license/cdk-lambda-nodejs-mock)

# CDK NodejsFunction Mock

The [CDK NodejsFunction](https://docs.aws.amazon.com/cdk/api/latest/docs/aws-lambda-nodejs-readme.html) construct uses
Parcel and Docker to conveniently bundle up your lambda modules. However this is a slow and processor-intensive
operation, which results in very slow testing with e.g. Jest.

This module mocks out NodeJsFunctions by replacing them with a standard CDK Lambda Function for the purpose of testing
only.

## Use with Jest

### Whole Project

We recommend using this module across your entire CDK project, by editing your [Jest config](https://jestjs.io/docs/en/configuration) (e.g. in
package.json) to add the following:

```json
{
  "moduleNameMapper": {
    "@aws-cdk/aws-lambda-nodejs": "cdk-lambda-nodejs-mock"
  }
}
```

### A Specific Test File Only

You can use in a specific test file only, rather than globally, as follows:

```typescript
jest.mock('@aws-cdk/aws-lambda-nodejs', () =>
  require('cdk-lambda-nodejs-mock')
);
```

Note we use require rather than import, as `jest.mock` is hoisted above import.

## CDK Versions

The module uses peerDependencies rather than dependencies, so that it uses exactly the same CDK version as in your
project. This means that you don't need to do anything to make it work with whichever cdk version you are using.

## Checklist

| CD Feature | Provided                                |
| ---------- | --------------------------------------- |
| ✅         | Typescript                              |
| ✅         | Linting (AirBnB + Prettier)             |
| ✅         | Unit tests (Jest)                       |
| ✅         | Coverage check (ideally 100% with Jest) |
| ✅         | Github Continuous Deployment            |

## Built by Skyhook

This module is contributed by the team at [Skyhook](https://www.skyhookadventure.com/).
