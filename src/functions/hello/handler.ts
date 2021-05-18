import "source-map-support/register";
import * as newrelic from "newrelic";
import type { ValidatedEventAPIGatewayProxyEvent } from "@libs/apiGateway";
import { formatJSONResponse } from "@libs/apiGateway";
import { middyfy } from "@libs/lambda";

import schema from "./schema";

const hello: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (
  event
) => {
  console.log("NEW_RELIC_LICENSE_KEY", process.env.NEW_RELIC_LICENSE_KEY);
  console.log("NEW_RELIC_APP_NAME", process.env.NEW_RELIC_APP_NAME);
  console.log(
    "NEW_RELIC_DISTRIBUTED_TRACING_ENABLED",
    process.env.NEW_RELIC_DISTRIBUTED_TRACING_ENABLED
  );
  console.log(
    "NEW_RELIC_NO_CONFIG_FILE",
    process.env.NEW_RELIC_NO_CONFIG_FILE
  );
 

  // This is an example of a custom event. `FROM MyNodeEvent SELECT *` in New Relic will find this event.
  newrelic.recordCustomEvent("MyNodeEvent", {
    zip: "zap",
  });

  // This attribute gets added to the normal AwsLambdaInvocation event
  newrelic.addCustomAttributes({
    customAttribute: "customAttributeValue",
  });
  return formatJSONResponse({
    message: `Hello ${event.body.name}, welcome to the exciting Serverless world!`,
    event,
  });
};

export const main = middyfy(hello);
