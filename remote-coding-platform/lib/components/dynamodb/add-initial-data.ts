import { Construct, PhysicalName } from "@aws-cdk/core";
import {
  AwsCustomResource,
  PhysicalResourceId,
  AwsCustomResourcePolicy,
} from "@aws-cdk/custom-resources";
import { v4 as uuidv4 } from "uuid";
import { CodingPlatformTable } from "./coding-platform-table";

export const addInitialData = (
  parent: Construct,
  table: CodingPlatformTable,
  data: any
): void => {
  new AwsCustomResource(parent, `initDBResource-${uuidv4()}`, {
    onCreate: {
      service: "DynamoDB",
      action: "putItem",
      parameters: {
        TableName: table.tableName,
        Item: data,
      },
      physicalResourceId: PhysicalResourceId.of(
        `initDBResource-physicalResource-${uuidv4()}`
      ),
    },
    policy: AwsCustomResourcePolicy.fromSdkCalls({
      resources: AwsCustomResourcePolicy.ANY_RESOURCE,
    }),
  });
};
