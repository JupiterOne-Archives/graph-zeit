import { IntegrationExecutionContext } from "@jupiterone/jupiter-managed-integration-sdk";
import { ZeitExecutionContext } from "./types";

import { ZeitClient } from "./zeit";

export default function initializeContext(
  context: IntegrationExecutionContext,
): ZeitExecutionContext {
  const { config } = context.instance;

  const provider = new ZeitClient(config.zeitApiToken);

  return {
    ...context,
    ...context.clients.getClients(),
    provider,
  };
}
