import { expect as expectCdk, haveResourceLike } from "@aws-cdk/assert";
import { Stack } from "@aws-cdk/core";
import { NodejsFunction } from "..";

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
        ZipFile: "return;",
      },
      Handler: "index.handler",
      Runtime: "nodejs12.x",
    })
  );
});
