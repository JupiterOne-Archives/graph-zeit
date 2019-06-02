import {
  createProjectEntities
} from './converters';

import { Project } from './zeit';

import {
  PROJECT_ENTITY_CLASS,
  PROJECT_ENTITY_TYPE
} from './jupiterone';

const project: Project = {
  id: 'project1',
  name: 'project 1',
  accountId: 'some-uuid',
  createdAt: Date.now(),
  updatedAt: Date.now()
}

test('createUserEntities', () => {
  expect(createProjectEntities([project])).toEqual([
    {
      _class: PROJECT_ENTITY_CLASS,
      _type: PROJECT_ENTITY_TYPE,
      _key: `zeit-project-${project.id}`,
      displayName: project.name,
      name: project.name,
      id: project.id,
      accountId: project.accountId,
      createdAt: project.createdAt,
      updatedAt: project.updatedAt
    }
  ]);
});
