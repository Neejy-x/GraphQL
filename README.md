# Apollo Project Ninja

A GraphQL API built with Apollo Server for managing game ratings and reviews.

## Description

This project is a GraphQL-based backend API that allows users to query and manage game ratings. Built with Apollo Server and integrated with MongoDB via Mongoose, it provides a modern approach to building scalable and type-safe APIs.

## Features

- **GraphQL API** - Query and mutate game rating data using GraphQL
- **Apollo Server** - Production-ready GraphQL server
- **MongoDB Integration** - Persistent data storage with Mongoose
- **Type Safety** - Data validation with Zod
- **Hot Reloading** - Development experience with Nodemon

## Tech Stack

- **Apollo Server** (^5.2.0) - GraphQL server framework
- **GraphQL** (^16.12.0) - Query language and runtime
- **Mongoose** (^9.0.1) - MongoDB object modeling
- **Zod** (^4.2.0) - TypeScript-first schema validation
- **Nodemon** (^3.1.11) - Auto-reload during development

## Installation

```bash
npm install
```

## Usage

```bash
npm start
```

The server will start and be available at your configured GraphQL endpoint.

## Project Structure

- `index.js` - Entry point
- `app.js` - Apollo Server setup
- `schema.js` - GraphQL schema definitions
- `db.js` - Database configuration
- `appSchema.js` - Application schema utilities
- `new/` - Alternative server implementations
  - `server.js` - Alternative server setup
  - `serverSchema.js` - Alternative schema setup
  - `db.js` - Database connection utilities

## Features

### Queries
- Query game ratings and reviews

### Mutations
- Create and update game ratings
- Manage user reviews

## License

ISC
