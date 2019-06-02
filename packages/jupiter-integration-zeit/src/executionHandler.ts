import {
  IntegrationExecutionContext,
  IntegrationExecutionResult,
  summarizePersisterOperationsResults,
} from "@jupiterone/jupiter-managed-integration-sdk";

import { fetchZeitData } from "./zeit";
import {
  fetchExistingZeitData,
  buildEntityOperations,
  buildRelationshipOperations,
} from "./jupiterone";

import initializeContext from "./initializeContext";

export default async function executionHandler(
  context: IntegrationExecutionContext,
): Promise<IntegrationExecutionResult> {
  const { graph, persister, provider } = initializeContext(context);

  try {
    const oldData = await fetchExistingZeitData(graph);
    const newData = await fetchZeitData(provider);

    const entityOperations = buildEntityOperations(
      oldData.entities,
      newData.entities,
      persister,
    );

    const relationshipOperations = buildRelationshipOperations(
      oldData.relationships,
      newData.relationships,
      persister,
    );

    return {
      operations: summarizePersisterOperationsResults(
        await persister.publishPersisterOperations([
          entityOperations,
          relationshipOperations,
        ]),
      ),
    };
  } catch (err) {
    throw new Error("Failed to build operations");
  }
}
