import { htm } from '@zeit/integration-utils';
import JupiterOneClient from '@jupiterone/jupiterone-client-nodejs';

import { JupiterOneCredentials } from './types';

const graphviz = require('graphviz')

export default async function renderProjectDeploymentView (
  { apiKey, account }: JupiterOneCredentials
) {
  // create client
  const client = new JupiterOneClient({
    dev: true,
    account,
    accessToken: apiKey
  });

  await client.init()

  try {
    const data: any = await client.queryV1(
      'find Project that relates to Deployment return tree'
    );

    const graph = graphviz.digraph('G');

    data.vertices.forEach((vertex: any) =>
      graph.addNode(vertex.id, { label: vertex.entity.displayName })
    );
    data.edges.forEach((edge: any) =>
      graph.addEdge(edge.toVertexId, edge.fromVertexId, { label: edge.relationship.displayName })
    );

    const imageUrl = `https://image-charts.com/chart?cht=gv:fdp&chl=${
      encodeURIComponent(graph.to_dot())
    }`;

    return htm`
      <Page>
        <Box display="flex">
          <Img src="${imageUrl}" />
        </Box>
      </Page>
    `;
  } catch (err) {
    console.error(err);

    return htm`
      <Page>
        <P>Failed to fetch graphed data</P>
      </Page>
    `;
  }
}


