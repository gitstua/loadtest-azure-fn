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