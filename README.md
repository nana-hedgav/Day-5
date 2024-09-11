# Todo Application

A simple Todo application built with Express, MongoDB, and JWT authentication. This application allows you to perform CRUD operations on todo items and includes user registration and login functionalities.

## Features

- Create, update, delete, and view todo items.
- User registration and login with JWT authentication.
- Protected routes for managing todos.

## Prerequisites

- Node.js (>=14.x)
- MongoDB Atlas account

## Installation

1. **Clone the Repository:**

    ```bash
    git clone https://github.com/yourusername/todo-app.git
    cd todo-app
    ```

2. **Install Dependencies:**

    ```bash
    npm install
    ```

3. **Set Up Environment Variables:**

    Create a `.env` file in the root directory of the project with the following content:

    ```env
    MONGO_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/<database>?retryWrites=true&w=majority
    JWT_SECRET=your_jwt_secret
    PORT=3000
    ```

    Replace `<username>`, `<password>`, and `<database>` with your MongoDB Atlas credentials.

## Running the Application

Start the server using:

```bash
npm start
