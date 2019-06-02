import {
  GraphClient,
  IntegrationExecutionContext,
  PersisterClient
} from '@jupiterone/jupiter-managed-integration-sdk';

import { ZeitClient } from './zeit';

export interface ZeitExecutionContext extends IntegrationExecutionContext {
  graph: GraphClient;
  persister: PersisterClient;
  provider: ZeitClient;
}
