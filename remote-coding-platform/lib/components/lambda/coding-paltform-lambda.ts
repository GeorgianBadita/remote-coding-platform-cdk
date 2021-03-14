import { Function as LambdaFunction, FunctionProps } from "@aws-cdk/aws-lambda";
import { RetentionDays } from "@aws-cdk/aws-logs";
import { Construct } from "@aws-cdk/core";
import { Region } from "../../consts/regions";

export interface CodingPlatformLambdaProps extends FunctionProps {
  readonly region: Region;
}

export class CPLambda extends LambdaFunction {
  constructor(parent: Construct, id: string, props: CodingPlatformLambdaProps) {
    super(parent, id, { ...props, logRetention: RetentionDays.ONE_WEEK });
  }
}
