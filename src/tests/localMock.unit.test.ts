import { expect as expectCdk, haveResourceLike } from "@aws-cdk/assert";
import { Stack } from "aws-cdk-lib/core";
import { NodejsFunction } from "aws-cdk-lib/aws-lambda-nodejs";

// eslint-disable-next-line global-require
jest.mock("aws-cdk-lib/aws-lambda-nodejs", () => require(".."));

class TestStack extends Stack {
  constructor() {
    super();
    new NodejsFunction(this, "testId", {
      entry: "./mocks/entry.ts",
    });
  }
}

it("returns a lambda with default code", () => {
  const stack = new TestStack();

  expectCdk(stack).to(
    haveResourceLike("AWS::Lambda::Function", {
      Code: {
        S3Bucket: "cdk-lambda-nodejs-mock-fake-bucket",
        S3Key: "cdk-lambda-nodejs-mock-fake-lambda.ts",
      },
      Handler: "index.handler",
      Runtime: "nodejs12.x",
    })
  );
});
