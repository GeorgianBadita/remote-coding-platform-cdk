import { Bucket } from "@aws-cdk/aws-s3";
import { Stack, Construct, StackProps } from "@aws-cdk/core";
import { CodeTestBucket } from "../components/s3/CodeTestBucket";

export interface RemoteCodingPlatformStackProps extends StackProps {
  readonly stackName: string;
}

export class RemoteCodingPlatformStack extends Stack {
  private readonly codeTestBucket: Bucket;

  constructor(
    scope: Construct,
    id: string,
    props: RemoteCodingPlatformStackProps
  ) {
    super(scope, id, props);

    //Bucket for saving problems data (test_cases code, official_solution_code)
    this.codeTestBucket = new CodeTestBucket(this, "CodeTestBucketStorage", {
      versioned: true,
      bucketName: "code-test-bucket-8efc083c-ca7f-43fc-b059-8035ad2b6bbe",
    });
  }
}
