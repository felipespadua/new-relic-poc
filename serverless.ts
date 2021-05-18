import type { AWS } from "@serverless/typescript";

import hello from "@functions/hello";

const serverlessConfiguration: AWS = {
  service: "new-relic-poc",
  frameworkVersion: "2",
  custom: {
    webpack: {
      webpackConfig: "./webpack.config.js",
      includeModules: {
        forceExclude: "newrelic",
      },
    },
    localstack: {
      stages: ["local"],
      edgePort: 4566,
      autostart: true,
      lambda: {
        mountCode: true,
      },
      docker: {
        sudo: false,
      },
    },
    newRelic: {
      accountId: "2784665"
    }
  },
  plugins: ["serverless-webpack", "serverless-newrelic-lambda-layers"],
  provider: {
    name: "aws",
    runtime: "nodejs14.x",
    apiGateway: {
      minimumCompressionSize: 1024,
      shouldStartNameWithService: true,
    },
    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: "1",
      NEW_RELIC_ACCOUNT_ID: "2784665",
      NEW_RELIC_APP_NAME: "new-relic-poc",
      NEW_RELIC_DISTRIBUTED_TRACING_ENABLED: "true",
      NEW_RELIC_NO_CONFIG_FILE: "true",
    },
    lambdaHashingVersion: "20201221",
  },
  // import the function via paths
  functions: { hello },
};

module.exports = serverlessConfiguration;
