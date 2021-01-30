import { Bucket } from "@aws-cdk/aws-s3";
import { Construct } from "@aws-cdk/core";

export interface CodeTestBucketProps {
  readonly versioned: boolean;
}

export class CodeTestBucker extends Bucket {
  constructor(scope: Construct, id: string, props: CodeTestBucketProps) {
    super(scope, id, {
      ...props,
    });
  }
}
