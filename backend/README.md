# Medium Website Backend

## Description

This project is the backend implementation of a Medium-like platform. It provides APIs for user authentication, article management, and other essential functionalities required for a blogging platform.

## Technologies Used

- Hono
- Cloudflare Workers
- PostgreSQL
- Prisma ORM
- JSON Web Tokens (JWT) for authentication

## Installation

1. Clone the repository:

```bash
git clone <repository_url>


cd backend
npm install

DATABASE_URL=<your_postgres_database_url>
SECRET_KEY=<your_secret_key>

npm install -g prisma
prisma init

npm run build

API Endpoints

Authentication
POST /api/v1/user/signup: Register a new user.
POST /api/v1/user/signin: Log in an existing user and generate JWT token.

Articles
GET /api/v1/blog/bulk : Get all articles.
GET /api/v1/blog/:id : Get a specific article by ID.
POST /api/v1/blog/ : Create a new article.
PUT /api/v1/blog/ : Update an existing article.

# Project Structure

- `backend/README.md`: Contains project documentation and instructions.
- `backend/package.json`: Manages project dependencies and scripts.
- `backend/prisma/migrations/20240302113332_init_schema/migration.sql`: SQL migration script for initializing the database schema.
- `backend/prisma/schema.prisma`: Prisma schema file defining the database schema and models.
- `backend/src/index.ts`: Entry point of the backend application.
- `backend/src/routes/blog.ts`: Defines routes related to blog functionalities.
- `backend/src/routes/user.ts`: Defines routes related to user functionalities.
- `backend/tsconfig.json`: TypeScript configuration file for the project.
