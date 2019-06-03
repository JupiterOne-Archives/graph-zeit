import { htm } from '@zeit/integration-utils';
import JupiterOneClient from '@jupiterone/jupiterone-client-nodejs';

import { IntegrationMetadata } from './types';

export default async function handleCredentialsSubmit (
  { clientState }: any,
  zeitClient: any
) {
  const { apiKey, account } = clientState;

  // create client
  const client = new JupiterOneClient({
    dev: true,
    account,
    accessToken: apiKey
  });

  await client.init()

  try {
    await client.queryV1('find Blah');

    const newMetadata: IntegrationMetadata = {
      jupiterOneCredentials: {
        account,
        apiKey
      }
    };

    // success! Commit config metadata store
    await zeitClient.setMetadata(newMetadata);
  } catch (err) {
    // failed, display error to user
    return htm`
      <Page>
        <P>Error: Invalid credentials provided</P>
        <Button action="view">Go back</Button>
      </Page>
    `;
  }
}

