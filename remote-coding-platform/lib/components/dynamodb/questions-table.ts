import { Construct } from "@aws-cdk/core";
import { addInitialData } from "./add-initial-data";
import { CodingPlatformTable } from "./coding-platform-table";
import initialData from "./initialData/questions_table_data.json";

export class QuestionsTable extends CodingPlatformTable {
  constructor(parent: Construct) {
    super(parent, {
      tableName: "QUESTIONS",
      partitionKey: "question_id",
      sortKey: "question_name",
    });

    //addInitialData(this, this, initialData);
  }
}
