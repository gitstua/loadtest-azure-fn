# loadtest-azure-fn
example script to load test an azure function to show scaling

## Setup 
1. install Artillery
```
npm install -g artillery@latest
```
2. verify installation
```
artillery dino
```
3. execute test against example api
```
artillery run artillery-test-example.yml
```

## Deploy Azure function
1. Create a Function App
2. Install extension in VSCode: [Azure Tools](https://marketplace.visualstudio.com/items?itemName=ms-vscode.vscode-node-azure-pack)
3. either create a new function app or locate an existing one which can be overwritten
4. right click on the function app and choose **Deploy to Function App...**

## Test Azure function
1. update the target url in *artillery-test-fn.yml*
```yaml
config:
  target: "https://YOURNAME.azurewebsites.net/api/HttpTrigger2"

```
3. execute test against the function
```
artillery run artillery-test-fn.yml
```
## Monitoring
- [Metrics](https://docs.microsoft.com/en-us/azure/azure-functions/monitor-metrics?tabs=portal) show the request count
- You can enable [scale controller logs (preview)](https://docs.microsoft.com/en-us/azure/azure-functions/configure-monitoring?tabs=v2#configure-scale-controller-logs) - you need to add an appsetting using the portal or a script
```bash
az functionapp config appsettings set --name <FUNCTION_APP_NAME> \
--resource-group <RESOURCE_GROUP_NAME> \
--settings SCALE_CONTROLLER_LOGGING_ENABLED=AppInsights:Verbose
```
- you can then [query your scale controller logs](https://docs.microsoft.com/en-us/azure/azure-functions/analyze-telemetry-data#query-scale-controller-logs)
- example Kusto Query
```pwsh
traces 
| extend CustomDimensions = todynamic(tostring(customDimensions))
| where CustomDimensions.Category == "ScaleControllerLogs"
| where message == "Instance count changed"
| extend Reason = CustomDimensions.Reason
| extend PreviousInstanceCount = CustomDimensions.PreviousInstanceCount
| extend NewInstanceCount = CustomDimensions.CurrentInstanceCount
```


## Useful links
- [Scale](https://docs.microsoft.com/en-us/azure/azure-functions/functions-scale#scale)
- Premium - [max scalout](https://docs.microsoft.com/en-us/azure/azure-functions/functions-premium-plan?tabs=portal#region-max-scale-out)