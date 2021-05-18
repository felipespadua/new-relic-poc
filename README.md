# new-relic-poc

1. `pip3 install newrelic-lambda-cli`
2. Criar api key (key type = User) no New Relic
3. Instalar o Secrets Manager e o Log Ingestion usando o comando: `newrelic-lambda integrations install --aws-profile {PROFILE} --aws-region {REGION} --nr-account-id 2784665 --nr-api-key NRAK-LIIH7QGE010KY8Q89FSKYRIABCD`
4. Deploy do Lambda: `npm run deploy:dev -- --aws-profile {PROFILE}`
5. [Opcional] Instalar o Lambda Layer usando o comando: `newrelic-lambda layers install --aws-profile {PROFILE} --nr-account-id 2784665 --function new-relic-poc-dev-hello --upgrade`. O layer será linkado com a account do new relic.
