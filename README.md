# webhooksAPI

Backend with a Webhooks microservice using Molecular and Express. Placement task (backend) implementation for Dyte.

## Problem Description
API Implementation -
- [X]  `POST /auth/register` - Register a new user
- [X]  `POST /auth/login` - Login as a user
- [X]  `GET /list` - Return all registered webhooks with their IDs
- [X]  `POST /webhook` - takes `targetUrl` in body, registers and returns ID
- [X]  `PATCH /webhook` - takes `newTargetUrl` and `id` in body, updates url at ID
- [X]  `DELETE /webhook` takes `id` as query parameter, deletes webhook at that ID
- [X]  `GET /trigger` - takes a generic request body JSON, triggers webhooks and sends `{ msg: request_body, timestamp: UNIX timestamp }` to all URLs. Parallelizes queries (currently in batches of 5)
<br>

<!-- Bonus tasks - -->
- [X] Perform 5 max retries if any webhook returns a non-success response code
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

<!-- Once the API is online
- Remember to call `POST /login` with whatever credentials you saved in `config.env` (values of `USER` and `PASS` variables) to get a JWT token.
- Example request on the `POST /login` route using `sample.env` for credentials -

```bash
curl --location --request POST 'localhost:3000/login' \
--header 'Content-Type: application/json' \
--data-raw '{
    "username": "admin",
    "password": "adminpass"
}'
```
<br> -->

- Use `response.token` as Bearer token in authorization header when making requests to any other routes of the API.

## License
MIT
