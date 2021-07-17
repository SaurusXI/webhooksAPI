# webhooksAPI

Backend with a Webhooks microservice using Molecular and Express. Placement task (backend) implementation for Dyte.

## Problem Description
API Implementation -
- [X]  `GET /list` - Return all registered webhooks with their IDs
- [X]  `GET /register` - takes `targetUrl` parameter, registers and returns ID
- [X]  `GET /update` - takes `newTargetUrl` and `id` parameters, updates url at ID
- [X]  `POST /ip` - takes `ipAddress` in request body JSON, triggers webhooks and sends `{ ipAddress, timestamp: UNIX timestamp }` to all URLs. Parallelize queries (currently in batches of 5)

Bonus tasks -
- [X] Perform 5 max retries if any webhook returns a non-success response
- [X] Dockerize

<br>

## Dependencies
 - TypeScript >= 4.3
 - NodeJS >= 12.21.0


## Running


### Directions to set up 
```bash
gh repo clone SaurusXI/webhooksAPI
cd webhooksAPI
npm i
npm run build
```

**Important**- make a `config.env` file in project root according to `sample.env`
Or if you're feeling lazy,
```bash
cp sample.env config.env
```
### Directions to run

```bash
docker-compose --env-file config.env up
```

## License
MIT