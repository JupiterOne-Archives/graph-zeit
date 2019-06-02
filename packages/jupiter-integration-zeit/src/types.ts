import {
  GraphClient,
  IntegrationExecutionContext,
  PersisterClient,
} from "@jupiterone/jupiter-managed-integration-sdk";

import { ZeitClient } from "./zeit";

import {
  ProjectEntity,
  TeamEntity,
  UserEntity,
  UserTeamRelationship,
  DeploymentEntity,
  CertificateEntity,
  DomainEntity,
  ProjectDeploymentRelationship,
} from "./jupiterone";

export interface ZeitExecutionContext extends IntegrationExecutionContext {
  graph: GraphClient;
  persister: PersisterClient;
  provider: ZeitClient;
}

export interface ZeitEntities {
  projects: ProjectEntity[];
  teams: TeamEntity[];
  users: UserEntity[];
  domains: DomainEntity[];
  certificates: CertificateEntity[];
  deployments: DeploymentEntity[];
}

export interface ZeitRelationships {
  userTeamRelationships: UserTeamRelationship[];
  projectDeploymentRelationships: ProjectDeploymentRelationship[];
}

export interface ZeitIntegrationData {
  entities: ZeitEntities;
  relationships: ZeitRelationships;
}
