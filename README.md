# ripley-labs-test

Technical challenge for Ripley Labs.

This backend app uses websockets to send weather data for a few cities. It uses Redis as cache for queries to darksky.net, and it is built with `TypeScript`. Frontend app source code can be found at https://github.com/jacobparra/ripley-labs-test-frontend

Live demo: https://ripley-labs-test-frontend.herokuapp.com

The websocket can be tested directly using `wscat -c wss://ripley-labs-test.herokuapp.com`

## Usage

Clone the repo, then `docker-compose up`. It will run two containers, one with NodeJS for the app, and another for Redis (cache).

## Deployment

Heroku was used for the live demo. The typescript source is transpiled automatically on each deploy using docker multistage build, so the final docker image can be as small as posible.

The docker image is then uploaded to Heroku an run with their docker environment. There is also attached a redis, with the heroku addons.

Finally it is mandatory to set the DarkSky secret key to query the API.

```
heroku create ripley-labs-test
heroku stack:set container
heroku addons:add heroku-redis
heroku config:set DARK_SKY_KEY=******
```
