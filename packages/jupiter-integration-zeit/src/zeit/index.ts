import pMap from "p-map";
import ZeitClient from "./ZeitClient";

import {
  ProjectEntity,
  TeamEntity,
  DeploymentEntity,
  CertificateEntity,
  UserEntity,
  DomainEntity,
  UserTeamRelationship,
  ProjectDeploymentRelationship,
} from "../jupiterone";

import {
  createProjectEntity,
  createTeamEntity,
  createUserEntity,
  createUserTeamRelationship,
  createDeploymentEntity,
  createCertificateEntity,
  createDomainEntity,
  createProjectDeploymentRelationship,
} from "../converters";

export * from "./types";
export { ZeitClient };

const fetchProjectEntitiesFromProvider = async (
  provider: ZeitClient,
): Promise<ProjectEntity[]> => {
  const projects = await provider.listProjects();
  return projects.map(createProjectEntity);
};

const fetchTeamEntitiesFromProvider = async (
  provider: ZeitClient,
): Promise<TeamEntity[]> => {
  const { teams } = await provider.listTeams();
  return teams.map(createTeamEntity);
};

const fetchCertificateEntitiesFromProvider = async (
  provider: ZeitClient,
): Promise<CertificateEntity[]> => {
  const { certs } = await provider.listCertificates();
  return certs.map(createCertificateEntity);
};

const fetchDomainEntitiesFromProvider = async (
  provider: ZeitClient,
): Promise<DomainEntity[]> => {
  const { domains } = await provider.listDomains();
  return domains.map(createDomainEntity);
};

export async function fetchZeitData(provider: ZeitClient) {
  /**
   * Fetch projects, teams, certs and domains
   */
  const [projects, teams, certificates, domains] = await Promise.all([
    fetchProjectEntitiesFromProvider(provider),
    fetchTeamEntitiesFromProvider(provider),
    fetchCertificateEntitiesFromProvider(provider),
    fetchDomainEntitiesFromProvider(provider),
  ]);

  /**
   * Fetch and relate team members (users) to teams
   */
  const userMap = new Map<string, UserEntity>();
  const userTeamRelationships: UserTeamRelationship[] = [];

  const processTeamData = pMap(
    teams,
    async team => {
      const rawUsers = await provider.listTeamMembers(team.id);

      for (const rawUser of rawUsers) {
        const userEntity = createUserEntity(rawUser);
        userMap.set(rawUser.uid, userEntity);

        userTeamRelationships.push(
          createUserTeamRelationship(userEntity, team, rawUser.role),
        );
      }
    },
    { concurrency: 2 },
  );

  /**
   * Fetch and relate deployments to projects
   */
  const projectDeploymentRelationships: ProjectDeploymentRelationship[] = [];
  const deployments: DeploymentEntity[] = [];

  const processProjectData = pMap(
    projects,
    async project => {
      const { deployments: rawDeployments } = await provider.listDeployments(
        project.id,
      );

      for (const rawDeployment of rawDeployments) {
        const deployment = createDeploymentEntity(rawDeployment);

        deployments.push(deployment);
        projectDeploymentRelationships.push(
          createProjectDeploymentRelationship(project, deployment),
        );
      }
    },
    { concurrency: 2 },
  );

  await Promise.all([processTeamData, processProjectData]);

  return {
    projects,
    deployments,
    projectDeploymentRelationships,
    teams,
    users: [...userMap.values()],
    userTeamRelationships,
    domains,
    certificates,
  };
}
