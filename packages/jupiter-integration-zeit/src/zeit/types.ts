/**
 * Project
 */
export interface Project {
  id: string;
  name: string;
  accountId: string;
  createdAt: number;
  updatedAt: number;
}

export type ProjectsResponse = Project[];

/**
 * Team
 */
export interface Team {
  id: string;
  slug: string;
  name: string;
  creatorId: string;
  created: string;
}

export interface TeamsResponse {
  teams: Team[];
}

/**
 * Team Member
 */

export enum TeamMemberRole {
  OWNER = "OWNER",
  MEMBER = "MEMBER",
}

export interface TeamMember {
  // this is the closest thing we have to users
  uid: string; // userId
  role: TeamMemberRole; // role can be used to select relationship class
  email: string;
  username: string;
}

export type TeamMembersResponse = TeamMember[];

/**
 * Deployment
 */
export interface Deployment {
  id: string;
  url: string;
  name: string; // name is the same as project name
  public: boolean;
  ownerId: string;
  createdIn: string;
  createdAt: string;
  regions: string[];
  target: string;

  // figure out best way to store environment variables
}

export interface ListDeployments_deployment {
  uid: string;
  // there's more but for now this is all we care about
}

export interface ListDeploymentsResponse {
  deployments: ListDeployments_deployment[];
}

export type DeploymentResponse = Deployment;

export interface FullDeploymentsResult {
  deployments: Deployment[];
}

/**
 * Certificate
 */
export interface Certificate {
  cns: string[]; // common names
  uid: string;
  created: string;
  expiration: string;
  autoRenew: boolean;
}

export interface CertificatesResponse {
  certs: Certificate[];
}

/**
 * Domain
 */
export interface Domain {
  id: string;
  name: string;
  serviceType: string;
  cdnEnabled: boolean;

  createdAt: number;
  nsVerifiedAt: number | null;
  txtVerifiedAt: number | null;
  boughtAt: number | null;
  transferredAt: number | null;

  verified: boolean;

  nameservers: string[];

  // docs show both?
  verifiedRecord?: string | null;
  verificationRecord?: string;

  creator: {
    id: string;
    username: string;
    email: string;
  };
}

export interface DomainsResponse {
  domains: Domain[];
}
