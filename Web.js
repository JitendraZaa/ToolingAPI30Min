var express = require("express");
var logfmt = require("logfmt");
var app = express();

app.use(logfmt.requestLogger());
app.use(express.static(__dirname + '/client'));


app.get('/', function(req, res) {
  res.send('Hello World!');
});

app.all('/proxy', function(req, res) {
    var url = req.header('SalesforceProxy-Endpoint');
    console.log("proxying: " + url);
    request({ url: url, method: req.method, json: req.body, headers: {'Authorization': req.header('X-Authorization')} }).pipe(res);
});


var port = Number(process.env.PORT || 5000);
app.listen(port, function() {
  console.log("Listening on " + port);
});