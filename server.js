//Install express server
const express = require('express');
const path = require('path');
var compression = require('compression')

const app = express();

app.use(compression());
// Serve only the static files form the dist directory
app.use(express.static('./dist/sapApp'));

app.get('/*', function(req, res) {
  res.sendFile(path.join(__dirname, '/dist/sapApp/index.html'));
});

// Start the app by listening on the default Heroku port
app.listen(3001);
