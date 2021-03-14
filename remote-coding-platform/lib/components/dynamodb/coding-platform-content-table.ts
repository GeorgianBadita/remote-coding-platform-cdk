import { Construct } from "@aws-cdk/core";
import { CodingPlatformTable } from "./coding-platform-table";

export class CodingPlatformContentTable extends CodingPlatformTable {
  constructor(parent: Construct) {
    super(parent, {
      tableName: "CODING_PLATFORM",
      partitionKey: "user_email",
      sortKey: "source",
    });
  }
}
