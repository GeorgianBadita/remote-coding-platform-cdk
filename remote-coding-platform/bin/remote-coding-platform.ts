import { App } from "@aws-cdk/core";
import { Region } from "../lib/consts/regions";
import { RemoteCodingPlatformStack } from "../lib/stacks/remote-coding-platform-stack";
import { RemoteCodingPlatformVpcStack } from "../lib/stacks/remote-coding-platform-vpc-stack";

const app = new App();

const region: Region = Region.EU_WEST_1;

const vpcStack = new RemoteCodingPlatformVpcStack(
  app,
  `RemoteCodingPlatformVpcStack-${region}`,
  {
    stackName: `RemoteCodingPlatformVpcStack-${region}`,
  }
);

new RemoteCodingPlatformStack(app, `RemoteCodingPlatformStack-${region}`, {
  stackName: `RemoteCodingPlatformStack-${region}`,
  vpc: vpcStack.vpc,
  securityGroup: vpcStack.securityGroup,
  region,
});
