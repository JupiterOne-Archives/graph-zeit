import {
  EntityFromIntegration,
  RelationshipFromIntegration
} from '@jupiterone/jupiter-managed-integration-sdk';
import { Account, User } from './ProviderClient';
import {
  ACCOUNT_ENTITY_CLASS,
  ACCOUNT_ENTITY_TYPE,
  AccountEntity,
  USER_ENTITY_CLASS,
  USER_ENTITY_TYPE,
  UserEntity
} from './types';

export function createAccountEntity(data: Account): AccountEntity {
  return {
    _class: ACCOUNT_ENTITY_CLASS,
    _key: `provider-account-${data.id}`,
    _type: ACCOUNT_ENTITY_TYPE,
    accountId: data.id,
    displayName: data.name
  };
}

export function createUserEntities(data: User[]): UserEntity[] {
  return data.map(d => ({
    _class: USER_ENTITY_CLASS,
    _key: `provider-user-${d.id}`,
    _type: USER_ENTITY_TYPE,
    displayName: `${d.firstName} ${d.lastName}`,
    userId: d.id
  }));
}

export function createAccountRelationships(
  account: AccountEntity,
  entities: EntityFromIntegration[],
  type: string
) {
  const relationships = [];
  for (const entity of entities) {
    relationships.push(createAccountRelationship(account, entity, type));
  }

  return relationships;
}

export function createAccountRelationship(
  account: AccountEntity,
  entity: EntityFromIntegration,
  type: string
): RelationshipFromIntegration {
  return {
    _class: 'HAS',
    _fromEntityKey: account._key,
    _key: `${account._key}_has_${entity._key}`,
    _toEntityKey: entity._key,
    _type: type
  };
}
