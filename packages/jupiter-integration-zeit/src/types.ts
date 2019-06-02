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
} from "./jupiterone";

export interface ZeitExecutionContext extends IntegrationExecutionContext {
  graph: GraphClient;
  persister: PersisterClient;
  provider: ZeitClient;
}

export interface ZeitIntegrationData {
  projects: ProjectEntity[];

  teams: TeamEntity[];
  users: UserEntity[];
  userTeamRelationships: UserTeamRelationship[];

  domains: DomainEntity[];
  certificates: CertificateEntity[];
  deployments: DeploymentEntity[];
}
