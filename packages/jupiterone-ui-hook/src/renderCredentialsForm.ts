import { htm } from '@zeit/integration-utils';

import { SUBMIT_API_KEY_ACTION } from './actions';

export default async function renderCredentialsForm () {
  // no api key was configured for this integration yet
  return htm`
    <Page>
      <P>To get started with this integration please provide a JupiterOne api key</P>
      <Input
        name="apiKey"
        label="JupiterOne API Key"
        value=""
      />
      <Input
        name="account"
        label="JupiterOne Account Id"
        value=""
      />
      <Button action="${SUBMIT_API_KEY_ACTION}">Submit</Button>
    </Page>
  `;
}
