import {
  EntityFromIntegration,
  RelationshipFromIntegration,
} from "@jupiterone/jupiter-managed-integration-sdk";

import {
  Project,
  Team,
  TeamMember,
  TeamMemberRole,
  Deployment,
  Certificate,
  Domain,
} from "../zeit";

import { PROVIDER_NAME } from "../constants";

/**
 * Account types and values
 */

// TODO

/**
 * Project types and values
 */
export const PROJECT_ENTITY_TYPE = `${PROVIDER_NAME}_project`;
export const PROJECT_ENTITY_CLASS = "Project";

export type ProjectEntity = Project & EntityFromIntegration;

/**
 * Deployment types and values
 */
export const DEPLOYMENT_ENTITY_TYPE = `${PROVIDER_NAME}_deployment`;
export const DEPLOYMENT_ENTITY_CLASS = "Deployment"; // not adding Function yet

export type DeploymentEntity = Deployment & EntityFromIntegration;

/**
 * Project and Deployment relationship type and values
 */

export const PROJECT_DEPLOYMENT_RELATIONSHIP_TYPE = `${PROVIDER_NAME}_project_contains_${PROVIDER_NAME}_deployment`;
export const PROJECT_DEPLOYMENT_RELATIONSHIP_CLASS = "Deployment";

export type ProjectDeploymentRelationship = RelationshipFromIntegration;

/**
 * User types and values
 */
export const USER_ENTITY_TYPE = `${PROVIDER_NAME}_user`;
export const USER_ENTITY_CLASS = "User";

export type UserEntity = Omit<TeamMember, "role"> & // omit role, use it for relationships
  EntityFromIntegration;

/**
 * Team types and values
 */
export const TEAM_ENTITY_TYPE = `${PROVIDER_NAME}_team`;
export const TEAM_ENTITY_CLASS = "Team";

export type TeamEntity = Team & EntityFromIntegration;

/**
 * User and Team relationship types and values
 */
export const USER_TEAM_OWNER_RELATIONSHIP_CLASS = "OWNS";
export const USER_TEAM_MEMBER_RELATIONSHIP_CLASS = "HAS";

export const USER_TEAM_OWNER_RELATIONSHIP_TYPE = `${PROVIDER_NAME}_user_owns_${PROVIDER_NAME}_team`;
export const USER_TEAM_MEMBER_RELATIONSHIP_TYPE = `${PROVIDER_NAME}_user_has_${PROVIDER_NAME}_team`;

export interface UserTeamRelationship extends RelationshipFromIntegration {
  role: TeamMemberRole;
}

/**
 * Certification types and values
 */
export const CERTIFICATE_ENTITY_TYPE = `${PROVIDER_NAME}_certificate`;
export const CERTIFICATE_ENTITY_CLASS = "Certificate";

export type CertificateEntity = Certificate & EntityFromIntegration;

/**
 * Domain types and values
 */
export const DOMAIN_ENTITY_TYPE = `${PROVIDER_NAME}_domain`;
export const DOMAIN_ENTITY_CLASS = "Domain";

export type DomainEntity = Omit<Domain, "creator"> & EntityFromIntegration;
