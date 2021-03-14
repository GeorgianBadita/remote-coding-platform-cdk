import { AttributeType, BillingMode, Table } from "@aws-cdk/aws-dynamodb";
import { Construct } from "@aws-cdk/core";

export interface CodingPlatformTableProps {
  readonly tableName: string;
  readonly partitionKey: string;
  readonly sortKey?: string;
}

export class CodingPlatformTable extends Table {
  constructor(parent: Construct, props: CodingPlatformTableProps) {
    super(parent, props.tableName, {
      tableName: props.tableName,
      partitionKey: {
        name: props.partitionKey,
        type: AttributeType.STRING,
      },
      sortKey: props.sortKey
        ? {
            name: props.sortKey,
            type: AttributeType.STRING,
          }
        : undefined,
      billingMode: BillingMode.PAY_PER_REQUEST,
    });
  }
}
