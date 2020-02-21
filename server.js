// server.js

var express = require('express');
var path = require('path');
var serveStatic = require('serve-static');

console.log('SOMELOGGING');

app = express();
app.use(serveStatic(__dirname + "/dist"));

/* final catch-all route to index.html defined last */
app.get('/*', (req, res) => {
  res.sendFile(__dirname + "/dist/index.html");
})

var port = process.env.PORT || 5000;
app.listen(port);

console.log('server started '+ port);
