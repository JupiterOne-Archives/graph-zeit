import { IntegrationExecutionContext } from '@jupiterone/jupiter-managed-integration-sdk';
import executionHandler from './executionHandler';
import initializeContext from './initializeContext';
/*
import {
  USER_ENTITY_TYPE
} from './types';
*/

jest.mock('./initializeContext');

test.skip('executionHandler', async () => {
  const executionContext: any = {
    graph: {
      findEntitiesByType: jest.fn().mockResolvedValue([]),
      findRelationshipsByType: jest.fn().mockResolvedValue([])
    },
    persister: {
      processEntities: jest.fn().mockReturnValue([]),
      processRelationships: jest.fn().mockReturnValue([]),
      publishPersisterOperations: jest.fn().mockResolvedValue({})
    },
    provider: {
      fetchAccountDetails: jest.fn().mockResolvedValue({}),
      fetchUsers: jest.fn().mockResolvedValue([])
    }
  };

  (initializeContext as jest.Mock).mockReturnValue(executionContext);

  const invocationContext = {} as IntegrationExecutionContext;
  await executionHandler(invocationContext);

  expect(initializeContext).toHaveBeenCalledWith(invocationContext);
});
