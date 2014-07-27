var express = require('express'),
    http = require('http'),
    request = require('request'),
    app = express();

var logfmt = require("logfmt");

app.use(express.static(__dirname + '/client'));

/*
app.all('/proxy', function(req, res) {
    var url = req.header('SalesforceProxy-Endpoint');
    console.log("proxying: " + url);
    request({ url: url, method: req.method, json: req.body, headers: {'Authorization': req.header('X-Authorization')} }).pipe(res);
});
*/

app.get('/', function(req, res) {
	  res.send('Hello World!');
	});

app.set('port', process.env.PORT || 3000);

app.listen(app.get('port'), function () {
    console.log('Express server listening on port ' + app.get('port'));
});