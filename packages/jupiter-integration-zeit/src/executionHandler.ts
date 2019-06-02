import {
  IntegrationExecutionContext,
  IntegrationExecutionResult
} from '@jupiterone/jupiter-managed-integration-sdk';

import { ZeitClient } from './zeit'
import { ProjectEntity } from './jupiterone';

import { createProjectEntities } from './converters';
import initializeContext from './initializeContext';

export default async function executionHandler(
  context: IntegrationExecutionContext
): Promise<IntegrationExecutionResult> {
  const { /*graph, persister,*/ provider } = initializeContext(context);

  console.log(await fetchUserEntitiesFromProvider(provider));

  return {
    operations: {
      created: 0,
      updated: 0,
      deleted: 0
    }

    // await persister.publishPersisterOperations([])
  };
}

async function fetchUserEntitiesFromProvider(
  provider: ZeitClient
): Promise<ProjectEntity[]> {
  return createProjectEntities(await provider.listProjects());
}
