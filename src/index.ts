import { Function, Runtime, Code } from "aws-cdk-lib/aws-lambda";
import { Construct } from "constructs";
import { NodejsFunctionProps } from "aws-cdk-lib/aws-lambda-nodejs";
import { Bucket } from "aws-cdk-lib/aws-s3";

/**
 * NodejsFunction Mock
 *
 * Running NodejsFunction for CDK tests is extremely slow, as it requires Parcel Bundler to run inside docker. Instead
 * we use the Lambda Function class that it is based on, with code from a fake
 * S3 bucket.
 */
export class NodejsFunction extends Function {
  constructor(scope: Construct, id: string, props: NodejsFunctionProps) {
    // Mock bucket
    const bucket = Bucket.fromBucketArn(
      scope,
      `${id}MockBucket`,
      "arn:aws:s3:::cdk-lambda-nodejs-mock-fake-bucket"
    );

    // Create a Lambda Function without the real code generated using Parcel/Docker
    super(scope, id, {
      // Required values if not set for LambdaFunction
      runtime: Runtime.NODEJS_12_X,
      handler: "index.handler",
      // Use other props
      ...props,
      // Set code with mock s3 location
      code: Code.fromBucket(bucket, "cdk-lambda-nodejs-mock-fake-lambda.ts"),
    });
  }
}

/**
 * Export other Constructs/Classes from the @aws-cdk/aws-lambda-nodejs module without changes
 */
export {
  BundlingOptions,
  ICommandHooks,
  LogLevel,
  OutputFormat,
  SourceMapMode,
  Charset,
} from "aws-cdk-lib/aws-lambda-nodejs";
