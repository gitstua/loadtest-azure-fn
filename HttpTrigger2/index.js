//thanks: https://stackoverflow.com/questions/70115778/is-posible-sleep-in-azure-function-nodejs
function RunAfterOneSec(seconds) {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve('resolved');
      }, seconds);
    });
  }
  
  module.exports = async function (context, req) {
  
      context.log('JavaScript HTTP trigger function processed a request.');
  
    console.log('calling');
    const result = await RunAfterOneSec(1000);
    console.log(result);
  
      const name = (req.query.name || (req.body && req.body.name));
      const responseMessage = name
          ? "Hello, " + name + ". This HTTP triggered function executed successfully."
          : "This HTTP triggered function executed successfully. Pass a name in the query string or in the request body for a personalized response.";
  
      context.res = {
          // status: 200, /* Defaults to 200 */
          body: responseMessage
      };
  }