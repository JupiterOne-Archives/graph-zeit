import {
  IntegrationExecutionContext,
  IntegrationExecutionResult,
} from "@jupiterone/jupiter-managed-integration-sdk";

import { fetchZeitData } from "./zeit";

import initializeContext from "./initializeContext";

export default async function executionHandler(
  context: IntegrationExecutionContext,
): Promise<IntegrationExecutionResult> {
  const { /*graph, persister,*/ provider } = initializeContext(context);

  try {
    const newData = await fetchZeitData(provider);
    console.log(newData);
  } catch (err) {
    console.error(err);
  }

  return {
    operations: {
      created: 0,
      updated: 0,
      deleted: 0,
    },
  };
  // await persister.publishPersisterOperations([])
}
