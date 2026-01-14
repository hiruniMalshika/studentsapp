# Simple Node.js Student Backend

This project is a simple Node.js backend for creating and retrieving students, connected to a MySQL database. No validations are included.

## Features
- Create a student (POST /students)
- Get all students (GET /students)

## Setup
1. Ensure you have Node.js and MySQL installed.
2. Create a MySQL database named `studentdb` and a table:

```sql
CREATE TABLE students (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255),
  age INT
);
```

3. Update the MySQL configuration in `index.js` if needed.
4. Install dependencies:
   ```
npm install
   ```
5. Start the server:
   ```
node index.js
   ```

## Endpoints
- `POST /students` with JSON `{ "name": "John", "age": 20 }`
- `GET /students` returns all students
