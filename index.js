'use strict';

const express = require('express');
const bodyParser = require('body-parser');

const restService = express();
restService.use(bodyParser.json());
var path = require('path');

    var http = require('http');

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
     

            //The url we want is: 'www.random.org/integers/?num=1&min=1&max=10&col=1&base=10&format=plain&rnd=new'
                var options = {
                  host: 'www.random.org',
                  path: '/integers/?num=1&min=1&max=10&col=1&base=10&format=plain&rnd=new'
                };

                callback = function(response) {
                  var str = '';

                  //another chunk of data has been recieved, so append it to `str`
                  response.on('data', function (chunk) {
                    str += chunk;
                  });

                  //the whole response has been recieved, so we just print it out here
                  response.on('end', function () {
                    console.log(str);
                  });
                }

                 speech = http.request(options, callback).end();
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
