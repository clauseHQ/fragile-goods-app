/*eslint-env node*/
'use strict';

const request = require('request');
const express = require('express');
const app = express();
const PORT = process.env.PORT || 5000;

// parse request body to JSON
app.use(express.json());

// serve the files out of ./public as our main files
app.use(express.static(__dirname + '/public'));

// the /trigger path forwards the call to the trigger URL
app.post('/trigger', async function (req, res, next) {
  const triggerUrl = req.header('X-Clause-TriggerUrl');
  console.log(`Trigger URL: ${triggerUrl}`);
  console.log(`Headers: ${JSON.stringify(req.headers, null, 2)}`);
  console.log(`Body: ${JSON.stringify(req.body, null, 2)}`);

  const config = {
    host: triggerUrl,
    method: 'POST',
    headers: {
      authorization: req.header('authorization')
    },
    json: req.body
  };

  try {
    request.post(
      triggerUrl,
      config,
      function (error, response, body) {
        if (!error && response.statusCode === 200) {
          console.log(`Response: ${JSON.stringify(body, null, 2)}`);
          res.send(body);
        }
        else {
          next(error);
        }
      }
    );
  }
  catch(err) {
    next(err);
  }
});

// start server on the specified port and binding host
app.listen(PORT, () => console.log(`Listening on ${ PORT }`));
