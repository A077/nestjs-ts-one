# NestJS TS One

A fully-featured NestJS project in TypeScript showcasing:
- HTTP server (Express) + Socket.IO gateway
- MongoDB (Mongoose) and PostgreSQL (TypeORM) connections
- RabbitMQ messaging (golevelup/nestjs-rabbitmq)
- Optional Redis client (configurable)
- Example CRUD APIs: Todos in MongoDB, Notes in PostgreSQL
- Swagger API documentation
- Testing with Jest (e2e example)

## Getting Started

1. Clone the repo and install dependencies:
   - npm install

2. Create .env file (or copy .env.example):
   - cp .env.example .env
   - Adjust connection strings as needed.

3. Run the app in dev mode:
   - npm run start:dev

4. Swagger UI:
   - http://localhost:3000/api

5. Socket.IO
   - Connect to ws://localhost:3000
   - Listen for events: `users`, send `ping` -> receive `{event: 'pong', data: ...}`

## Environment Variables
See .env.example for all variables:
- PORT
- MONGO_URI
- PG_URL
- RABBITMQ_URI
- REDIS_ENABLED (true/false)
- REDIS_URL

## API Examples

### MongoDB Todos
- POST /mongo/todos
- GET /mongo/todos
- GET /mongo/todos/:id
- PATCH /mongo/todos/:id
- DELETE /mongo/todos/:id

### PostgreSQL Notes
- POST /pg/notes
- GET /pg/notes
- GET /pg/notes/:id
- PATCH /pg/notes/:id
- DELETE /pg/notes/:id

## RabbitMQ
- POST /rabbit/publish
  - body: { "routingKey": "demo.event", "payload": {"hello":"world"} }

## Testing
- npm test
- npm run test:watch
- npm run test:cov

## Project Structure
- src/main.ts: bootstrap, Swagger
- src/modules/app.module.ts: app wiring, DBs, Rabbit, Redis, Socket gateway provider
- src/modules/health: health controller
- src/modules/mongo-example: Mongoose Todo CRUD
- src/modules/pg-example: TypeORM Note CRUD
- src/modules/rabbit: Rabbit publish example
- src/gateway/app.gateway.ts: Socket.IO gateway
- tests/app.e2e.spec.ts: basic e2e test

## Notes
- TypeORM synchronize=true for convenience; disable in production.
- Redis is optional. Enable by setting REDIS_ENABLED=true. If disabled, provider resolves to null.
