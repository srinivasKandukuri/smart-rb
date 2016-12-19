# Api.ai - sample webhook implementation.

This is a really simple webhook implementation that gets Api.ai classification JSON (i.e. a JSON output of Api.ai /query endpoint) and returns a fulfillment response.

More info about Api.ai webhooks could be found here:
[Api.ai Webhook](https://docs.api.ai/docs/webhook)

# Deploy to:
[![Deploy to Heroku](https://www.herokucdn.com/deploy/button.svg)](https://heroku.com/deploy)

# What does the service do?
It's a simple echo service that takes `resolvedQuery` and `action` fields from the Api.ai JSON reponse and echoes them back in into `speech` and `displayTest` fields in the fulfillment JSON.

# Demo Site 
http://smart-rb.herokuapp.com/


#Intent Speech:
# Examples
1. Hi / hello

2. tell me about yourself 

3. location of live auction
   live auction location

4. show me live auction lots
 get me live auction lots

5. place a bid on first lot
 bid on first lot

6. bid on second lot
 place a bid on second lot
