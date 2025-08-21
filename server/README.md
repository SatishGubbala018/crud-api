# User CRUD API

A comprehensive Node.js REST API for user management with MongoDB, featuring a clean modular architecture.

## Features

- **CRUD Operations**: Create, Read, Update, Delete users
- **Pagination**: Built-in pagination for listing users
- **Validation**: Input validation using express-validator
- **Error Handling**: Centralized error handling
- **Security**: Helmet for security headers, CORS support
- **Logging**: Request logging with Morgan
- **Soft Delete**: Users are soft-deleted (marked as inactive)
- **Search & Filter**: Search users by name, email, age

## Project Structure

```
user-crud-api/
├── src/
│   ├── config/
│   │   ├── app.js          # Express app configuration
│   │   └── database.js     # MongoDB connection
│   ├── controllers/
│   │   └── userController.js
│   ├── middleware/
│   │   ├── errorHandler.js
│   │   └── validation.js
│   ├── models/
│   │   └── User.js
│   ├── routes/
│   │   └── userRoutes.js
│   ├── services/
│   │   └── userService.js
│   └── utils/
│       ├── responseHandler.js
│       └── validators.js
├── index.js                # Application entry point
├── .env                    # Environment variables
├── .gitignore
└── package.json
```

## Installation

1. **Clone the repository**
2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Set up MongoDB**

   - Install MongoDB locally or use MongoDB Atlas
   - Update the `MONGODB_URI` in `.env` file

4. **Environment Variables**
   Create a `.env` file with:

   ```
   PORT=3000
   NODE_ENV=development
   MONGODB_URI=mongodb://localhost:27017/user_crud_db
   CORS_ORIGIN=http://localhost:3000
   ```

5. **Start the server**

   ```bash
   # Development mode
   npm run dev

   # Production mode
   npm start
   ```

## API Endpoints

### Base URL

`http://localhost:3000/api`
