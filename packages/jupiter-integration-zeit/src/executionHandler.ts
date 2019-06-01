import {
  IntegrationExecutionContext,
  IntegrationExecutionResult
} from '@jupiterone/jupiter-managed-integration-sdk';

/*
import {
  createAccountEntity,
  createAccountRelationships,
  createUserEntities
} from './converters';
*/

import initializeContext from './initializeContext';
// import ProviderClient from './ProviderClient';

/*
import {
  ACCOUNT_ENTITY_TYPE,
  ACCOUNT_USER_RELATIONSHIP_TYPE,
  AccountEntity,
  USER_ENTITY_TYPE,
  UserEntity
} from './types';
*/

export default async function executionHandler(
  context: IntegrationExecutionContext
): Promise<IntegrationExecutionResult> {
  const {
    /*graph, , persister, provider*/
  } = initializeContext(context);

  return {
    operations: {
      created: 0,
      updated: 0,
      deleted: 0
    }

    // await persister.publishPersisterOperations([])
  };
}

/*
async function fetchUserEntitiesFromProvider(
  provider: ProviderClient
): Promise<UserEntity[]> {
  return createUserEntities(await provider.fetchUsers());
}
*/
