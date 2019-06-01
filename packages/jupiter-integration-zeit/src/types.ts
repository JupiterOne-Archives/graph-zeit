import {
  EntityFromIntegration,
  GraphClient,
  IntegrationExecutionContext,
  PersisterClient
} from '@jupiterone/jupiter-managed-integration-sdk';
import ProviderClient from './ProviderClient';

export const ACCOUNT_ENTITY_TYPE = 'zeit_account';
export const ACCOUNT_ENTITY_CLASS = 'Account';

export const USER_ENTITY_TYPE = 'zeit_user';
export const USER_ENTITY_CLASS = 'User';
export const ACCOUNT_USER_RELATIONSHIP_TYPE = 'zeit_account_user';

export interface AccountEntity extends EntityFromIntegration {
  accountId: string;
}

export interface UserEntity extends EntityFromIntegration {
  userId: string;
}

export interface ZeitExecutionContext extends IntegrationExecutionContext {
  graph: GraphClient;
  persister: PersisterClient;
  provider: ProviderClient;
}
