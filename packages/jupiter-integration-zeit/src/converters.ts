import { Project } from './zeit';

import {
  PROJECT_ENTITY_CLASS,
  PROJECT_ENTITY_TYPE,
  ProjectEntity
} from './types';

export const createProjectEntities = (
  data: Project[]
): ProjectEntity[] => data.map(d => ({
  _class: PROJECT_ENTITY_CLASS,
  _type: PROJECT_ENTITY_TYPE,
  _key: `zeit-project-${d.id}`,
  displayName: d.name,
  projectId: d.id,
  createdAt: d.createdAt,
  updatedAt: d.updatedAt
}));
