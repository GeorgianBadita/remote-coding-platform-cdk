import { Construct } from "@aws-cdk/core";
import { CodingPlatformTable } from "./coding-platform-table";

export class QuestionsTable extends CodingPlatformTable {
  constructor(parent: Construct) {
    super(parent, {
      tableName: "QUESTIONS",
      partitionKey: "question_id",
      sortKey: "question_name",
    });
  }
}
