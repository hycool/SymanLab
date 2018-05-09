const  request = require('request');

request.post({
  url:'http://10.11.4.44:9090/p/cs/cxtab/queryparam',
  form: {param: '{ objid:2235 }'} }, function(err,httpResponse,body){
  if (err) { console.log(`err = ${err}`); }
  if (httpResponse) { console.log(`httpResponse = ${JSON.stringify(httpResponse)}`); }
  if (body) { console.log(`body = ${body}`); }
});
