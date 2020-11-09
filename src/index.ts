/* eslint-disable import/prefer-default-export */
import { Function, Runtime, Code } from "@aws-cdk/aws-lambda";
import { Construct } from "@aws-cdk/core";
import { NodejsFunctionProps } from "@aws-cdk/aws-lambda-nodejs";

/**
 * NodejsFunction Mock
 *
 * Running NodejsFunction for CDK tests is extremely slow, as it requires Parcel Bundler to run inside docker. Instead
 * we use the Lambda Function class that it is based on, with inline code.
 */
export class NodejsFunction extends Function {
  constructor(scope: Construct, id: string, props: NodejsFunctionProps) {
    // Create a Lambda Function without the real code generated using Parcel/Docker
    super(scope, id, {
      // Required values if not set for LambdaFunction
      runtime: Runtime.NODEJS_12_X,
      handler: "index.handler",
      // Use other props
      ...props,
      // Set code as empty
      code: Code.fromInline("return;"),
    });
  }
}

/**
 * Export other Constructs/Classes from the @aws-cdk/aws-lambda-nodejs module without changes
 */
export { Bundling } from "@aws-cdk/aws-lambda-nodejs";
