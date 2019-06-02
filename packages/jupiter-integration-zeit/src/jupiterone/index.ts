import {
  GraphClient,
  PersisterClient,
  EntityFromIntegration,
  RelationshipFromIntegration,
  EntityOperation,
  RelationshipOperation,
} from "@jupiterone/jupiter-managed-integration-sdk";

import { ZeitIntegrationData, ZeitEntities, ZeitRelationships } from "../types";

import {
  // Project
  ProjectEntity,
  PROJECT_ENTITY_TYPE,
  // Deployment
  DeploymentEntity,
  DEPLOYMENT_ENTITY_TYPE,
  // Project Deployment Relationship
  ProjectDeploymentRelationship,
  PROJECT_DEPLOYMENT_RELATIONSHIP_TYPE,
  // User
  UserEntity,
  USER_ENTITY_TYPE,
  // Team
  TeamEntity,
  TEAM_ENTITY_TYPE,
  // User Team Relationship
  UserTeamRelationship,
  USER_TEAM_OWNER_RELATIONSHIP_TYPE,
  USER_TEAM_MEMBER_RELATIONSHIP_TYPE,
  // Certificate
  CertificateEntity,
  CERTIFICATE_ENTITY_TYPE,
  // Domain
  DomainEntity,
  DOMAIN_ENTITY_TYPE,
} from "./types";

export * from "./types";

export async function fetchExistingZeitData(
  graph: GraphClient,
): Promise<ZeitIntegrationData> {
  // entities
  const [
    projects,
    teams,
    users,
    domains,
    certificates,
    deployments,
  ] = await Promise.all([
    graph.findEntitiesByType<ProjectEntity>(PROJECT_ENTITY_TYPE),
    graph.findEntitiesByType<TeamEntity>(TEAM_ENTITY_TYPE),
    graph.findEntitiesByType<UserEntity>(USER_ENTITY_TYPE),
    graph.findEntitiesByType<DomainEntity>(DOMAIN_ENTITY_TYPE),
    graph.findEntitiesByType<CertificateEntity>(CERTIFICATE_ENTITY_TYPE),
    graph.findEntitiesByType<DeploymentEntity>(DEPLOYMENT_ENTITY_TYPE),
  ]);

  // relationships
  const [
    userTeamOwnerRelationships,
    userTeamMemberRelationships,
    projectDeploymentRelationships,
  ] = await Promise.all([
    graph.findRelationshipsByType<UserTeamRelationship>(
      USER_TEAM_OWNER_RELATIONSHIP_TYPE,
    ),
    graph.findRelationshipsByType<UserTeamRelationship>(
      USER_TEAM_MEMBER_RELATIONSHIP_TYPE,
    ),
    graph.findRelationshipsByType<ProjectDeploymentRelationship>(
      PROJECT_DEPLOYMENT_RELATIONSHIP_TYPE,
    ),
  ]);

  return {
    entities: {
      projects,
      teams,
      users,
      domains,
      certificates,
      deployments,
    },
    relationships: {
      userTeamRelationships: [
        ...userTeamOwnerRelationships,
        ...userTeamMemberRelationships,
      ],
      projectDeploymentRelationships,
    },
  };
}

export const buildEntityOperations = (
  oldData: ZeitEntities,
  newData: ZeitEntities,
  persister: PersisterClient,
): EntityOperation[] =>
  [...new Set([...Object.keys(oldData), ...Object.keys(newData)])].reduce<
    EntityOperation[]
  >((operations, entityKey) => {
    const oldEntities = (oldData as any)[entityKey] || [];
    const newEntities = (newData as any)[entityKey] || [];

    return [
      ...operations,
      ...persister.processEntities<EntityFromIntegration>(
        oldEntities,
        newEntities,
      ),
    ];
  }, []);

export const buildRelationshipOperations = (
  oldData: ZeitRelationships,
  newData: ZeitRelationships,
  persister: PersisterClient,
): RelationshipOperation[] =>
  [...new Set([...Object.keys(oldData), ...Object.keys(newData)])].reduce<
    RelationshipOperation[]
  >((operations, relationshipKey) => {
    const oldRelationships = (oldData as any)[relationshipKey] || [];
    const newRelationships = (newData as any)[relationshipKey] || [];

    return [
      ...operations,
      ...persister.processRelationships<RelationshipFromIntegration>(
        oldRelationships,
        newRelationships,
      ),
    ];
  }, []);
