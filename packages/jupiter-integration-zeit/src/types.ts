import {
  EntityFromIntegration,
  GraphClient,
  IntegrationExecutionContext,
  PersisterClient
} from '@jupiterone/jupiter-managed-integration-sdk';

import { ZeitClient } from './zeit';

export const PROJECT_ENTITY_TYPE = 'zeit_project'
export const PROJECT_ENTITY_CLASS = 'Project';

export interface ProjectEntity extends EntityFromIntegration {
  projectId: string;
  createdAt: number;
  updatedAt: number;
}

export interface ZeitExecutionContext extends IntegrationExecutionContext {
  graph: GraphClient;
  persister: PersisterClient;
  provider: ZeitClient;
}
