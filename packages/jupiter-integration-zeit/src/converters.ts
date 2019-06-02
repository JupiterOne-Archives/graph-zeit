/**
 * This file converts raw data from the zeit integration into
 * J1 entity and relationship data
 */

import {
  // Project
  ProjectEntity,
  PROJECT_ENTITY_CLASS,
  PROJECT_ENTITY_TYPE,
  // Deployment
  DeploymentEntity,
  DEPLOYMENT_ENTITY_CLASS,
  DEPLOYMENT_ENTITY_TYPE,
  // Project Deployment Relationship
  ProjectDeploymentRelationship,
  PROJECT_DEPLOYMENT_RELATIONSHIP_CLASS,
  PROJECT_DEPLOYMENT_RELATIONSHIP_TYPE,
  // User
  UserEntity,
  USER_ENTITY_CLASS,
  USER_ENTITY_TYPE,
  // Team
  TeamEntity,
  TEAM_ENTITY_CLASS,
  TEAM_ENTITY_TYPE,
  // User Team Relationship
  UserTeamRelationship,
  USER_TEAM_OWNER_RELATIONSHIP_CLASS,
  USER_TEAM_MEMBER_RELATIONSHIP_CLASS,
  USER_TEAM_OWNER_RELATIONSHIP_TYPE,
  USER_TEAM_MEMBER_RELATIONSHIP_TYPE,
  // Certificate
  CertificateEntity,
  CERTIFICATE_ENTITY_CLASS,
  CERTIFICATE_ENTITY_TYPE,
  // Domain
  DomainEntity,
  DOMAIN_ENTITY_CLASS,
  DOMAIN_ENTITY_TYPE,
} from "./jupiterone";

import {
  Project,
  Team,
  Deployment,
  TeamMember,
  TeamMemberRole,
  Domain,
  Certificate,
} from "./zeit";

import { PROVIDER_NAME } from "./constants";

/**
 * NOTE: we are explicit here and we don't use
 * spread in any of these converters to
 * make it _very_ clear how data is constructed
 */

export const createProjectEntity = (data: Project): ProjectEntity => ({
  _class: PROJECT_ENTITY_CLASS,
  _type: PROJECT_ENTITY_TYPE,
  _key: `${PROVIDER_NAME}-project-${data.id}`,
  displayName: data.name,
  name: data.name,
  id: data.id,
  accountId: data.accountId,
  createdAt: data.createdAt,
  updatedAt: data.updatedAt,
});

export const createDeploymentEntity = (data: Deployment): DeploymentEntity => ({
  _class: DEPLOYMENT_ENTITY_CLASS,
  _type: DEPLOYMENT_ENTITY_TYPE,
  _key: `${PROVIDER_NAME}-deployment-${data.id}`,
  displayName: data.url,
  id: data.id,
  url: data.url,
  name: data.name,
  public: data.public,
  ownerId: data.ownerId,
  createdIn: data.createdIn,
  createdAt: data.createdAt,
  regions: data.regions,
  target: data.target,
});

export const createProjectDeploymentRelationship = (
  project: ProjectEntity,
  deployment: DeploymentEntity,
): ProjectDeploymentRelationship => ({
  _class: PROJECT_DEPLOYMENT_RELATIONSHIP_CLASS,
  _type: PROJECT_DEPLOYMENT_RELATIONSHIP_TYPE,
  _key: `${PROVIDER_NAME}-project-${project.id}-${PROVIDER_NAME}-deployment-${
    deployment.id
  }`,
  _fromEntityKey: project._key,
  _toEntityKey: deployment._key,
});

export const createUserEntity = (data: TeamMember): UserEntity => ({
  _class: USER_ENTITY_CLASS,
  _type: USER_ENTITY_TYPE,
  _key: `${PROVIDER_NAME}-user-${data.uid}`,
  displayName: data.username,
  username: data.username,
  uid: data.uid,
  email: data.email,
});

export const createUserTeamRelationship = (
  user: UserEntity,
  team: TeamEntity,
  role: TeamMemberRole,
): UserTeamRelationship => {
  let _class: string;
  let _type: string;

  if (role === TeamMemberRole.OWNER) {
    _class = USER_TEAM_OWNER_RELATIONSHIP_CLASS;
    _type = USER_TEAM_OWNER_RELATIONSHIP_TYPE;
  } else {
    _class = USER_TEAM_MEMBER_RELATIONSHIP_CLASS;
    _type = USER_TEAM_MEMBER_RELATIONSHIP_TYPE;
  }

  return {
    _class,
    _type,
    _key: `${PROVIDER_NAME}-user-${user.uid}-team-${team.id}`,
    _fromEntityKey: user._key,
    _toEntityKey: team._key,
    displayName: _class,
    role,
  };
};

export const createTeamEntity = (data: Team): TeamEntity => ({
  _class: TEAM_ENTITY_CLASS,
  _type: TEAM_ENTITY_TYPE,
  _key: `${PROVIDER_NAME}-team-${data.id}`,
  displayName: data.name,
  id: data.id,
  name: data.name,
  slug: data.slug,
  creatorId: data.creatorId,
  created: data.created,
});

export const createDomainEntity = (data: Domain): DomainEntity => ({
  _class: DOMAIN_ENTITY_CLASS,
  _type: DOMAIN_ENTITY_TYPE,
  _key: `${PROVIDER_NAME}-domain-${data.id}`,
  displayName: data.name,
  id: data.id,
  name: data.name,
  serviceType: data.serviceType,
  cdnEnabled: data.cdnEnabled,
  createdAt: data.createdAt,
  nsVerifiedAt: data.nsVerifiedAt,
  txtVerifiedAt: data.txtVerifiedAt,
  boughtAt: data.boughtAt,
  transferredAt: data.transferredAt,
  verified: data.verified,
  nameservers: data.nameservers,
  verifiedRecord: data.verifiedRecord,
  verificationRecord: data.verificationRecord,
});

export const createCertificateEntity = (
  data: Certificate,
): CertificateEntity => ({
  _class: CERTIFICATE_ENTITY_CLASS,
  _type: CERTIFICATE_ENTITY_TYPE,
  _key: `${PROVIDER_NAME}-cert-${data.uid}`,
  cns: data.cns,
  uid: data.uid,
  created: data.created,
  expiration: data.expiration,
  autoRenew: data.autoRenew,
});
