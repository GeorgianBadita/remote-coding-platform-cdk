import { App } from "@aws-cdk/core";
import { RemoteCodingPlatformStack } from "../lib/stacks/remote-coding-platform-stack";

const app = new App();

new RemoteCodingPlatformStack(app, "RemoteCodingPlatformStack", {
  stackName: "RemoteCodingPlatformStack",
});
