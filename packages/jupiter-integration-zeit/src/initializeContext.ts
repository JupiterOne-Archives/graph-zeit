import { IntegrationExecutionContext } from '@jupiterone/jupiter-managed-integration-sdk';
import ProviderClient from './ProviderClient';
import { ZeitExecutionContext } from './types';

export default function initializeContext(
  context: IntegrationExecutionContext
): ZeitExecutionContext {
  return {
    ...context,
    ...context.clients.getClients(),
    provider: new ProviderClient()
  };
}
