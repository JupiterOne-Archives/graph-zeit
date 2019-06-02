/* tslint:disable:no-console */
import { executeIntegrationLocal } from '@jupiterone/jupiter-managed-integration-sdk';
import invocationConfig from '../src/index';

const integrationConfig = {
  zeitApiToken: process.env.ZEIT_API_TOKEN
};

const invocationArgs = {};

executeIntegrationLocal(
  integrationConfig,
  invocationConfig,
  invocationArgs
).catch(err => {
  console.error(err);
  process.exit(1);
});
