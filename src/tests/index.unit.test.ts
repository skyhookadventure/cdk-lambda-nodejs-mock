import { expect as expectCdk, haveResourceLike } from "@aws-cdk/assert";
import { Runtime } from "@aws-cdk/aws-lambda";
import { Stack } from "@aws-cdk/core";
import { NodejsFunction } from "..";

class TestStack extends Stack {
  constructor() {
    super();
    new NodejsFunction(this, "testId", {
      entry: "./mocks/entry.ts",
      runtime: Runtime.NODEJS_14_X, // Check with Node 14, as inline sources aren't allowed for this
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
      Runtime: "nodejs14.x",
    })
  );
});
