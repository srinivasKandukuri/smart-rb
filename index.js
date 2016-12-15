'use strict';

const express = require('express');
const bodyParser = require('body-parser');

const restService = express();
restService.use(bodyParser.json());
var path = require('path');

var http = require("http");

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
                var query = 'https://search-build.equipmentone.com/e1_search?wt=json&q=*&fq={!tag=mar}marketplace:(%22EquipmentOne%22)&fq=auctionEndDateTimeUTC:([NOW%20TO%20*])&sort=siteSort%20asc,auctionEndDateTimeUTC%20asc,reserveType%20asc,highBidAmount%20desc&rows=5';
                // get is a simple wrapper for request()
                // which sets the http method to GET
                var request = http.get(query, function (response) {
                    // data is streamed in chunks from the server
                    // so we have to handle the "data" event    
                    var buffer = "", 
                        data,
                        route;

                    response.on("data", function (chunk) {
                        buffer += chunk;
                    }); 

                    response.on("end", function (err) {
                        // finished transferring data
                        // dump the raw data
                        console.log(buffer);
                        console.log("\n");
                        data = JSON.parse(buffer);
                        route = data.routes[0];

                        // extract the distance and time
                        console.log("Walking Distance: " + route.legs[0].distance.text);
                        console.log("Time: " + route.legs[0].duration.text);
                        console.log(data);
                    }); 
                }); 
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
