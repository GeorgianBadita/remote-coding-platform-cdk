import { Bucket } from "@aws-cdk/aws-s3";
import { Construct } from "@aws-cdk/core";

export interface CodeTestBucketProps {
  readonly versioned?: boolean;
  readonly bucketName: string;
}

export class CodeTestBucket extends Bucket {
  constructor(scope: Construct, id: string, props: CodeTestBucketProps) {
    super(scope, id, {
      ...props,
    });
  }
}
