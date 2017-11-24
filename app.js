/**
 * Copyright 2015 IBM Corp. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

'use strict';

var express = require('express'); // app server
var bodyParser = require('body-parser'); // parser for post requests
var waston = require('watson-developer-cloud'); // watson sdk

var app = express();

// Bootstrap application settings
app.use(express.static('./public')); // load UI from public folder
app.use(bodyParser.json());

// Create the service wrapper
var conversation = new waston.LanguageTranslatorV2({
  url: 'https://gateway.watsonplatform.net/language-translation/api',username: '167e15aa-600b-4103-a8d1-0eedcc5f94ed', password:  'uSjIpVD63pet'
});

// Endpoint to be call from the client side
app.post('/api/message', function(req, res) {
  var payload = {
    text: req.body.input,
    source: 'en',
    target: 'es'
  };

  // Send the input to the conversation service
  conversation.translate(payload, function(err, data) {
    if (err) {
      return res.json({output: {text: 'hello'}});
      //return res.status(err.code || 500).json(err);
    }
    return res.json({output: {text: 'hello'}}
    );
  });
});

/**
 * Updates the response text using the intent confidence
 * @param  {Object} input The request to the Conversation service
 * @param  {Object} response The response from the Conversation service
 * @return {Object}          The response with the updated message
 */
function updateMessage(input, response) {
  return response;
}

module.exports = app;
