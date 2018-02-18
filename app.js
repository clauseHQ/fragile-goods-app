/*eslint-env node*/
'use strict';

let express = require('express');
let app = express();

// serve the files out of ./public as our main files
app.use(express.static(__dirname + '/public'));

// start server on the specified port and binding host
app.listen(3000, () => console.log('App running at http://localhost:3000'));
