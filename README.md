# Clothing Store Project

This is our first pet project, where we created a typical commercial website for selling clothes. This repository contains both the backend and frontend code.

## Project Overview

### Backend
- **Framework**: [Express.js](https://expressjs.com/)
- **Session Management**: [Passport.js](http://www.passportjs.org/)
- **Database**: SQL (with separate schemas for production and testing)
- **Testing**: [Jest](https://jestjs.io/) and [Supertest](https://github.com/visionmedia/supertest)

Initially, we managed routing using regular expressions with Node.js, but we transitioned to Express.js for better structure and scalability.

### Frontend
- **Framework**: None (vanilla JavaScript)

For detailed design information, refer to our [design document](https://docs.google.com/document/d/1FCxaHM2Z2lcRGt59ozu0CFI-Yhb9p1UR-atAQJM4Ppw/edit#heading=h.k57aj13un2t).

## Getting Started

To run our project locally, follow these steps:

### Prerequisites
- Node.js installed on your machine
- SQL database (MySQL)

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/TarasBlatnoi/kursova-1
   cd kursova-1
   ```

   ## Database Setup

2. ### Create the database

Use the schema file provided in the repository. Rename the schema to `terabade` and execute it in your SQL database.

### Configure environment variables

Create a `.env` file in the root directory and add the following configuration:

```env
DB_HOST=127.0.0.1
PORT=3000
DB_PORT=3306
DB_USER=root
DB_PASSWORD=root_password
DB_NAME=terabade
DB_NAME_TEST=terabadetest
```

3. To start server use 
```bash
npm run start
```
4. To run tests use
```bash
npm test
```



