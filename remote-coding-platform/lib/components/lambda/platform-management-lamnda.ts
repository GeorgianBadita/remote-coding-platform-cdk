import { SecurityGroup, Vpc as EC2Vpc } from "@aws-cdk/aws-ec2";
import {
  Code,
  ILayerVersion,
  LayerVersion,
  Runtime,
} from "@aws-cdk/aws-lambda";
import { Construct, Duration } from "@aws-cdk/core";
import { Region } from "../../consts/regions";
import { CPLambda } from "./coding-paltform-lambda";
import { exec } from "child_process";

export interface PlatformManagerLambdaProps {
  readonly vpc: EC2Vpc;
  readonly securityGroup: SecurityGroup;
  readonly region: Region;
}

const FUNCTION_NAME = "platform-manager-lambda";

export class PlatformManagerLambda extends CPLambda {
  constructor(stack: Construct, id: string, props: PlatformManagerLambdaProps) {
    super(stack, id, {
      vpc: props.vpc,
      securityGroup: props.securityGroup,
      runtime: Runtime.PYTHON_3_8,
      memorySize: 128,
      timeout: Duration.seconds(30),
      region: props.region,
      code: Code.fromAsset("../../remote-coding-platform-manager-service"),
      handler: "functions.platform-manager-handler.handler",
      functionName: FUNCTION_NAME,
      layers: [createDependencyLayer(FUNCTION_NAME, stack)],
    });
  }
}

const createDependencyLayer = (
  functionName: string,
  stack: Construct
): ILayerVersion => {
  const requirements_file = `../../remote-coding-platform-manager-service/requirements.txt`;
  const output_dir = `../../remote-coding-platform-manager-service/.build/${FUNCTION_NAME}`;

  exec(`pip3 install -r ${requirements_file} -t ${output_dir}/python`);

  const layer_id = `${functionName}-dependencies`;
  const layer_code = Code.fromAsset(output_dir);

  return new LayerVersion(stack, layer_id, {
    code: layer_code,
  });
};
