import { EntityFromIntegration } from '@jupiterone/jupiter-managed-integration-sdk';

import {
  Project,
  Team,
  TeamMember,
  Deployment,
  Certificate,
  Domain
} from '../zeit';


/**
 * Account types and values
 */

/**
 * Project types and values
 */
export const PROJECT_ENTITY_TYPE = 'zeit_project'
export const PROJECT_ENTITY_CLASS = 'Project';

export type ProjectEntity =
  & Project
  & EntityFromIntegration


/**
 * User types and values
 */
export const USER_ENTITY_TYPE = 'zeit_user'
export const USER_ENTITY_CLASS = 'User';

export type UserEntity =
  & TeamMember
  & EntityFromIntegration;

/**
 * Team types and values
 */
export const TEAM_ENTITY_TYPE = 'zeit_team'
export const TEAM_ENTITY_CLASS = 'Team';

export type TeamEntity =
  & Team
  & EntityFromIntegration


/**
 * Deployment types and values
 */
export const DEPLOYMENT_ENTITY_TYPE = 'zeit_deployment'
export const DEPLOYMENT_ENTITY_CLASS = 'Deployment'; // not adding Function yet

export type DeploymentEntity =
  & Deployment
  & EntityFromIntegration

/**
 * Certification types and values
 */
export const CERTIFICATE_ENTITY_TYPE = 'zeit_certificate'
export const CERTIFICATE_ENTITY_CLASS = 'Certificate'; // not adding Function yet

export type CertificateEntity =
  & Certificate
  & EntityFromIntegration;


/**
 * Domain types and values
 */
export const DOMAIN_ENTITY_TYPE = 'zeit_domain'
export const DOMAIN_ENTITY_CLASS = 'Domain';

export type DomainEntity =
  & Omit<Domain, 'creator'>
  & EntityFromIntegration
