import fetch, { RequestInit, Response } from "node-fetch";

// NOTE: not using import here because of type issue
const PQueue = require("p-queue");

import {
  ProjectsResponse,
  TeamsResponse,
  TeamMembersResponse,
  DeploymentResponse,
  ListDeployments_deployment,
  ListDeploymentsResponse,
  CertificatesResponse,
  DomainsResponse,
  FullDeploymentsResult,
} from "./types";

enum Method {
  GET = "get",
  POST = "post",
}

const ZEIT_API_ORIGIN = "https://api.zeit.co";

export default class ZeitClient {
  private readonly queue: any;

  constructor(private readonly apiToken: string) {
    this.queue = new PQueue({
      concurrency: 1,
      intervalCap: 1,
      interval: 50,
    });
  }

  private async makeRequest<T>(
    path: string,
    method: Method = Method.GET,
    params: {} = {},
    headers?: {},
  ): Promise<T> {
    const options: RequestInit = {
      method,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${this.apiToken}`,
        ...headers,
      },
    };

    let response: Response | undefined;
    const url = `${ZEIT_API_ORIGIN}${path}`;

    try {
      await this.queue.add(async () => {
        response = await fetch(url, options);
      });
    } catch (err) {
      if (err.code === "ETIMEDOUT") {
        const error = new Error(
          `Timed out trying to connect to ${ZEIT_API_ORIGIN} (${err.code})`,
        ) as any;
        error.code = err.code;
        throw error;
      } else if (err.code === "ESOCKETTIMEDOUT") {
        const error = new Error(
          `Established connection to ${ZEIT_API_ORIGIN} timed out (${
            err.code
          })`,
        ) as any;
        error.code = err.code;
        throw error;
      } else {
        throw err;
      }
    }

    /* istanbul ignore next line */
    if (!response) {
      throw new Error("Did not obtain a response!");
    }

    if (response.status === 200) {
      return response.json();
    } else {
      const err = new Error(response.statusText) as any;
      err.code = "UnexpectedStatusCode";
      err.statusCode = response.status;
      err.url = url;
      throw err;
    }
  }

  /**
   * Add functions for fetching data here
   */

  public listProjects(): Promise<ProjectsResponse> {
    return this.makeRequest("/v1/projects/list");
  }

  public async listDeployments(
    projectId: string,
  ): Promise<FullDeploymentsResult> {
    // TODO: handling paging
    const { deployments } = await this.makeRequest<ListDeploymentsResponse>(
      `/v4/now/deployments?projectId=${projectId}`,
    );

    // NOTE: this is potentially a lot of requests and data, we will need to
    // spread this out over a longer period of time
    //
    // There can be a ton of deployments, so we should might also want
    // to filter out some of them after a certain period of time
    // or only list out active ones

    return {
      deployments: await Promise.all(
        deployments.map(({ uid }: ListDeployments_deployment) =>
          this.makeRequest<DeploymentResponse>(`/v9/now/deployments/${uid}`),
        ),
      ),
    };
  }

  public listTeams(): Promise<TeamsResponse> {
    return this.makeRequest("/v1/teams");
  }

  public listTeamMembers(teamId: string): Promise<TeamMembersResponse> {
    return this.makeRequest(`/v1/teams/${teamId}/members`);
  }

  public listCertificates(): Promise<CertificatesResponse> {
    return this.makeRequest("/v3/now/certs");
  }

  public listDomains(): Promise<DomainsResponse> {
    return this.makeRequest("/v4/domains");
  }
}
