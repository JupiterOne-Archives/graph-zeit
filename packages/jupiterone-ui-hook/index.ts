import { withUiHook } from '@zeit/integration-utils';

import handleCredentialsSubmit from './src/handleCredentialsSubmit';

import renderCredentialsForm from './src/renderCredentialsForm';
import renderProjectDeploymentView from './src/renderProjectDeploymentView';

import { IntegrationMetadata } from './src/types';

import { SUBMIT_API_KEY_ACTION } from './src/actions';

export default withUiHook(async ({ payload, zeitClient }) => {
  const { action } = payload;

  if (action === SUBMIT_API_KEY_ACTION) {
    return handleCredentialsSubmit(payload, zeitClient);
  }

  const metadata: IntegrationMetadata = await zeitClient.getMetadata();
  const { jupiterOneCredentials } = metadata;

  if (!jupiterOneCredentials) {
    return renderCredentialsForm();
  }

  if (payload.team) {
    console.log('this was configured for teams', payload.team)
  } else {
    console.log('this was configured for users', payload.user);
  }

  return renderProjectDeploymentView(jupiterOneCredentials);
})
