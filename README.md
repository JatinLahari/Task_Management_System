#RESTful Task Management API

A full-featured REST API for managing users and their personal task lists, built with Node.js, Express.js, Sequelize (MySQL), JWT authentication, and bcrypt for password security.

#Features

1. User Authentication

1. Register, login, and logout with secure JWT-based authentication (token stored in HTTP-only cookies)
2. Passwords are hashed using bcrypt
3. User profile retrieval
   
2. Task Management
1. Create, read, update, and delete tasks (CRUD)
2. Each task is linked to a user
3. Task fields: title, description, status (pending, in-progress, completed), due date

3. Security
1. All task routes are protected by authentication middleware
2. Environment variables managed with dotenv

#Tech Stack
->Node.js
->Express.js
->MySQL & Sequelize ORM
->JWT for authentication
->bcryptjs for password hashing
->dotenv for environment variables
->cookie-parser for secure cookie handling

#Getting Started
1. Clone the repository
2. Install dependencies:
-> run this command - "npm install" to install dependencies

3. Set up your .env file (see .env.example for required variables)
4. Start the server:-   "node rest.js"

API Endpoints
User
POST /user/sign-up – Register a new user
POST /user/sign-in – Login and receive JWT token in cookies
GET /user/profile – Get logged-in user profile (protected)
DELETE /user/sign-out – Logout (clear cookie)
Task (Protected)
POST /task/create – Create a new task
GET /task/all – Get all tasks for logged-in user
GET /task/one/:id – Get task by ID
PUT /task/update/:id – Update a task
DELETE /task/remove/:id – Delete a task
