'use strict';

const express = require('express');
const bodyParser = require('body-parser');

const restService = express();
restService.use(bodyParser.json());
var path = require('path');

    var https = require('https');

restService.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + '/index.html'));
});



restService.post('/hook', function (req, res) {

    console.log('hook request');

    try {
        var speech = 'empty speech';

        if (req.body) {
            var requestBody = req.body;

            // place bidding
            if(requestBody.result.action == 'placing-bid'){
                speech = 'please wait for sometime we are processing...'
            }

            if(requestBody.result.action == 'listings'){

                    json = {
                              "employees": {
                                "employee": [
                                  {
                                    "id": "1",
                                    "firstName": "Tom",
                                    "lastName": "Cruise"
                                  },
                                  {
                                    "id": "2",
                                    "firstName": "Maria",
                                    "lastName": "Sharapova"
                                  },
                                  {
                                    "id": "3",
                                    "firstName": "James",
                                    "lastName": "Bond"
                                  }
                                ]
                              }
                            }
                            
                    speech = json;
            }


            if (requestBody.result.action == 'greetings') {
                speech = 'Hello World';

            }
        }

        console.log('result: ', speech);

        return res.json({
            speech: speech,
            displayText: speech,
            source: 'apiai-webhook-sample'
        });
    } catch (err) {
        console.error("Can't process request", err);

        return res.status(400).json({
            status: {
                code: 400,
                errorType: err.message
            }
        });
    }
});

restService.listen((process.env.PORT || 5000), function () {
    console.log("Server listening");
});
