import { SecurityGroup, Vpc } from "@aws-cdk/aws-ec2";
import { Role } from "@aws-cdk/aws-iam";
import { Bucket } from "@aws-cdk/aws-s3";
import { Stack, Construct, StackProps } from "@aws-cdk/core";
import { CodingPlatformContentTable } from "../components/dynamodb/coding-platform-content-table";
import { QuestionsTable } from "../components/dynamodb/questions-table";
import { PlatformManagerLambda } from "../components/lambda/platform-management-lamnda";
import { PlatformQuestionsLambda } from "../components/lambda/platform-questions-lambda";
import { CodeTestBucket } from "../components/s3/CodeTestBucket";
import { Region } from "../consts/regions";

export interface RemoteCodingPlatformStackProps extends StackProps {
  readonly stackName: string;
  readonly vpc: Vpc;
  readonly securityGroup: SecurityGroup;
  readonly region: Region;
}

export class RemoteCodingPlatformStack extends Stack {
  private readonly codeTestBucket: Bucket;

  constructor(
    scope: Construct,
    id: string,
    props: RemoteCodingPlatformStackProps
  ) {
    super(scope, id, {
      stackName: props.stackName,
    });

    //Bucket for saving problems data (test_cases code, official_solution_code)
    this.codeTestBucket = new CodeTestBucket(this, "CodeTestBucketStorage", {
      versioned: true,
      bucketName: "code-test-bucket-8efc083c-ca7f-43fc-b059-8035ad2b6bbf",
    });

    //Questions lambda
    const questions_lambda = new PlatformQuestionsLambda(
      this,
      `questions-platform-lambda-${props.region}`,
      {
        vpc: props.vpc,
        securityGroup: props.securityGroup,
        region: props.region,
      }
    );

    //Platform Manager Lambda
    const platform_manager_lambda = new PlatformManagerLambda(
      this,
      `manager-platform-lambda-${props.region}`,
      {
        vpc: props.vpc,
        securityGroup: props.securityGroup,
        region: props.region,
      }
    );

    //Content platform table
    const conding_platform_table = new CodingPlatformContentTable(this);

    //Questsions table
    const questions_table = new QuestionsTable(this);

    conding_platform_table.grantReadWriteData(questions_lambda);
    conding_platform_table.grantReadWriteData(platform_manager_lambda);

    questions_table.grantReadWriteData(questions_lambda);
  }
}
