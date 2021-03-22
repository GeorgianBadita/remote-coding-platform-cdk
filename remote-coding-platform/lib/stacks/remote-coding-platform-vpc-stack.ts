import { SecurityGroup, Vpc, Subnet, SubnetType } from "@aws-cdk/aws-ec2";
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

    this.vpc = new Vpc(this, "remote-coding-platform-vpc", {
      cidr: "10.0.0.0/16",
      subnetConfiguration: [
        {
          name: "Application",
          subnetType: SubnetType.ISOLATED,
        },
      ],
      natGateways: 0,
    });
    this.securityGroup = new SecurityGroup(
      this,
      "remote-coding-platform-security-group",
      { vpc: this.vpc }
    );
  }
}
