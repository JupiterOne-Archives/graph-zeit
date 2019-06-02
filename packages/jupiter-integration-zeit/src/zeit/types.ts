export interface Project {
  id: string;
  name: string;
  accountId: string;
  createdAt: number;
  updatedAt: number;
}

export type ProjectReponse = Project[];
