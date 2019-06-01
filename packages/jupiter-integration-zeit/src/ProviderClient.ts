export interface Account {
  id: string;
  name: string;
}

export interface User {
  id: string;
  firstName: string;
  lastName: string;
}

export default class ProviderClient {
  public async fetchAccountDetails(): Promise<Account> {
    return {
      id: 'account-a',
      name: 'Account A'
    };
  }

  public async fetchUsers(): Promise<User[]> {
    return [
      {
        firstName: 'User',
        id: 'user-a',
        lastName: 'A'
      },
      {
        firstName: 'User',
        id: 'user-b',
        lastName: 'B'
      }
    ];
  }
}
