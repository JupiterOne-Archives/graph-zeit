import {
  createAccountEntity,
  createAccountRelationships,
  createUserEntities
} from './converters';
import { Account, User } from './ProviderClient';
import {
  ACCOUNT_USER_RELATIONSHIP_TYPE,
  USER_ENTITY_CLASS,
  USER_ENTITY_TYPE
} from './types';

const account: Account = {
  id: 'account-1',
  name: 'account-name'
};

const users: User[] = [
  {
    firstName: 'fname',
    id: 'user-1',
    lastName: 'lname'
  }
];

test('createAccountRelationships', () => {
  const accountEntity = createAccountEntity(account);
  const userEntities = createUserEntities(users);

  expect(
    createAccountRelationships(
      accountEntity,
      userEntities,
      ACCOUNT_USER_RELATIONSHIP_TYPE
    )
  ).toEqual([
    {
      _class: 'HAS',
      _fromEntityKey: 'provider-account-account-1',
      _key: 'provider-account-account-1_has_provider-user-user-1',
      _toEntityKey: 'provider-user-user-1',
      _type: ACCOUNT_USER_RELATIONSHIP_TYPE
    }
  ]);
});

test('createUserEntities', () => {
  expect(createUserEntities(users)).toEqual([
    {
      _class: USER_ENTITY_CLASS,
      _key: 'provider-user-user-1',
      _type: USER_ENTITY_TYPE,
      displayName: 'fname lname',
      userId: 'user-1'
    }
  ]);
});
