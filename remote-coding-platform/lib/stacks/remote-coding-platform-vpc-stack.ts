import { SecurityGroup, Vpc } from "@aws-cdk/aws-ec2";
import { Construct, Stack } from "@aws-cdk/core";

export interface RemoteCodingPlatformStackProps {
  readonly stackName: string;
}

export class RemoteCodingPlatformVpcStack extends Stack {
  public readonly vpc: Vpc;
  public readonly securityGroup: SecurityGroup;

  constructor(
    scope: Construct,
    id: string,
    props: RemoteCodingPlatformStackProps
  ) {
    super(scope, id, props);

    this.vpc = new Vpc(this, "remote-coding-platform-vpc");
    this.securityGroup = new SecurityGroup(
      this,
      "remote-coding-platform-security-group",
      { vpc: this.vpc }
    );
  }
}
