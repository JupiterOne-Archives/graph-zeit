import { createTestIntegrationExecutionContext } from "@jupiterone/jupiter-managed-integration-sdk";

import invocationValidator from "./invocationValidator";

test("should reject if no api token is provided", async () => {
  const context = createTestIntegrationExecutionContext({
    instance: {
      config: {},
    },
  });

  return expect(invocationValidator(context)).rejects.toThrow(
    /"zeitApiToken" missing/,
  );
});
