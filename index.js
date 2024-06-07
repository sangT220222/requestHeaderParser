// index.js
// where your node app starts

// init project
require('dotenv').config();
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC
var cors = require('cors');
app.use(cors({ optionsSuccessStatus: 200 })); // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get('/', function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

// your first API endpoint...
app.get('/api/whoami', function (req, res) {
  //retrieving IP address
  var ip_address = req.connection.remoteAddress;
  if(ip_address.includes(":ffff:")){ //as JS gives IPv6 address, below gives IPv4 addrees
    ip_address = ip_address.split(":").pop();
  }
  //retrieving Preferred language of browser
  const language_header = req.headers['accept-language'];

  //retrieving software
  const software_val = req.headers['user-agent'];
  res.json({ ipaddress: ip_address, language : language_header, software: software_val });

});

// listen for requests :)
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
