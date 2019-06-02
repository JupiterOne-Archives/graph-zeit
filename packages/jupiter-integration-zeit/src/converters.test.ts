import {
  createProjectEntities
} from './converters';

import { Project } from './zeit';

import {
  PROJECT_ENTITY_CLASS,
  PROJECT_ENTITY_TYPE
} from './types';

const projects: Project[] = [
  {
    id: 'project1',
    name: 'project 1',
    accountId: 'some-uuid',
    createdAt: Date.now(),
    updatedAt: Date.now()
  }
];

test('createUserEntities', () => {
  expect(createProjectEntities(projects)).toEqual([
    {
      _class: PROJECT_ENTITY_CLASS,
      _type: PROJECT_ENTITY_TYPE,
      _key: `zeit-project-${projects[0].id}`,
      displayName: projects[0].name,
      projectId: projects[0].id,
      createdAt: projects[0].createdAt,
      updatedAt: projects[0].updatedAt
    }
  ]);
});
