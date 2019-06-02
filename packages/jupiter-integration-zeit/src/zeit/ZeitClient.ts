import fetch, { RequestInit, Response } from 'node-fetch';

// NOTE: not using import here because of type issue
const PQueue = require('p-queue')

import { Project } from './types';

enum Method {
  GET = 'get',
  POST = 'post'
}

const ZEIT_API_ORIGIN = 'https://api.zeit.co';

export default class ZeitClient {
  private readonly queue: any;

  constructor (private readonly apiToken: string) {
    this.queue = new PQueue({
      concurrency: 1,
      intervalCap: 1,
      interval: 50
    });
  }

  private async makeRequest<T>(
    url: string,
    method: Method,
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
    try {
      await this.queue.add(async () => {
        response = await fetch(
          `${ZEIT_API_ORIGIN}/${url}`,
          options,
        );
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
          `Established connection to ${ZEIT_API_ORIGIN} timed out (${err.code})`,
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
      throw err;
    }
  }

  // add functions for fetching data here
  public listProjects(): Promise<Project[]> {
    return this.makeRequest(
      '/v1/projects/list',
      Method.GET
    );
  }

}
