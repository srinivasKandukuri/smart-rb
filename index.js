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
        var speech = "I'm a bit confused by that last part.";
        var source=  'smart-rb';
        if (req.body) {
            var requestBody = req.body;

            // place bidding
            if(requestBody.result.action == 'placing-bid'){
                
            }

            if(requestBody.result.action == 'first_listing'){

                speech = 'I am processing bidding on your name';
            
            }

            if(requestBody.result.action == 'second_listing'){

                speech = 'I am processing bidding on your name';
            
            }




            if(requestBody.result.action == 'listings'){
                speech = 'we have 5 listings in live auction';
            }


            if (requestBody.result.action == 'greetings') {
                speech = 'Hello World';

            }
            if(requestBody.result.action == 'live-auction-location'){
                speech = 'Hwy 12 North & Cory Road, Saskatoon, SK S7K 3J7, Canada';
                source = 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d23251.763568709233!2d-106.68363479855442!3d52.22447963797061!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x530458b46ccf417f%3A0x65e91fccb7925a9b!2sRitchie+Bros.+Auctioneers!5e0!3m2!1sen!2sin!4v1481865297318';
            }
        }

        console.log('result: ', speech);

        return res.json({
            speech: speech,
            displayText: speech,
            source: source
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
