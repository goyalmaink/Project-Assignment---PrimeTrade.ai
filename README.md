# 🚀 TaskFlow API - A Scalable Task Management Backend

[![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)](https://nodejs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Express.js](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)](https://expressjs.com/)
[![Prisma](https://img.shields.io/badge/Prisma-2D3748?style=for-the-badge&logo=prisma&logoColor=white)](https://www.prisma.io/)
[![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white)](https://www.mongodb.com/atlas)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](LICENSE)

A robust and scalable RESTful API for a Task Management application, featuring secure authentication, fine-grained Role-Based Access Control (RBAC), and comprehensive CRUD operations. Built with a modern Node.js and TypeScript stack following industry best practices.

## ✨ Features

### ✅ Authentication & Security

* **JWT-Based Authentication:** Secure, stateless user authentication using JSON Web Tokens.
* **Role-Based Access Control (RBAC):** Differentiates permissions between `USER` (default) and `ADMIN` roles.
* **Password Hashing:** Strong password storage using `bcrypt`.
* **Input Validation:** Strict data integrity and security with schema validation using **Zod**.
* **Security Headers:** Implemented **Helmet** middleware for enhanced security against common web vulnerabilities.
* **Rate Limiting:** Protects against brute-force and denial-of-service attacks.

### 📝 Core Task Management

* **Full CRUD Operations:** Seamless management of tasks (Create, Read, Update, Delete).
* **Owner-Based Access:** Standard users can only manage their own tasks.
* **Filtering & Sorting:** Powerful query parameters for dynamic task lists based on status, priority, and date.
* **Task Statistics Dashboard:** Dedicated endpoint for key metrics (total, completed, pending tasks, and priority breakdown).

### 🚀 Scalability & Best Practices

* **Clean Architecture:** Structured project with dedicated layers (`controllers`, `routes`, `middleware`) for maintainability.
* **Type Safety:** Built entirely with **TypeScript** for robust, error-free code.
* **Prisma ORM:** Utilized for type-safe database access and streamlined schema management with **MongoDB Atlas**.
* **API Versioning:** Clear separation of API with the `/v1` prefix.
* **Global Error Handling:** Centralized middleware for graceful and informative error responses.

## 🛠️ Tech Stack

| Category | Technology | Description |
| :--- | :--- | :--- |
| **Runtime** | **Node.js** | High-performance JavaScript runtime environment. |
| **Language** | **TypeScript** | Statically typed superset of JavaScript. |
| **Framework** | **Express.js** | Minimalist, fast, unopinionated web framework. |
| **Database** | **MongoDB Atlas** | Scalable, cloud-hosted NoSQL document database. |
| **ORM** | **Prisma** | Next-generation ORM for Node.js and TypeScript. |
| **Validation** | **Zod** | Schema declaration and validation library. |
| **Authentication** | **JWT (jsonwebtoken)** | Standard for securely transmitting information. |

## 📦 Installation & Setup

### 1. Clone the Repository

```bash
git clone <your-repo-url>
cd backend
```

Here is the professional, full-length README content converted into Markdown, ready for a top-tier GitHub repository:Markdown# 🚀 TaskFlow API - A Scalable Task Management Backend

[![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)](https://nodejs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Express.js](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)](https://expressjs.com/)
[![Prisma](https://img.shields.io/badge/Prisma-2D3748?style=for-the-badge&logo=prisma&logoColor=white)](https://www.prisma.io/)
[![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white)](https://www.mongodb.com/atlas)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](LICENSE)

A robust and scalable RESTful API for a Task Management application, featuring secure authentication, fine-grained Role-Based Access Control (RBAC), and comprehensive CRUD operations. Built with a modern Node.js and TypeScript stack following industry best practices.

##  Features

### Authentication & Security

* **JWT-Based Authentication:** Secure, stateless user authentication using JSON Web Tokens.
* **Role-Based Access Control (RBAC):** Differentiates permissions between `USER` (default) and `ADMIN` roles.
* **Password Hashing:** Strong password storage using `bcrypt`.
* **Input Validation:** Strict data integrity and security with schema validation using **Zod**.
* **Security Headers:** Implemented **Helmet** middleware for enhanced security against common web vulnerabilities.
* **Rate Limiting:** Protects against brute-force and denial-of-service attacks.

###  Core Task Management

* **Full CRUD Operations:** Seamless management of tasks (Create, Read, Update, Delete).
* **Owner-Based Access:** Standard users can only manage their own tasks.
* **Filtering & Sorting:** Powerful query parameters for dynamic task lists based on status, priority, and date.
* **Task Statistics Dashboard:** Dedicated endpoint for key metrics (total, completed, pending tasks, and priority breakdown).

###  Scalability & Best Practices

* **Clean Architecture:** Structured project with dedicated layers (`controllers`, `routes`, `middleware`) for maintainability.
* **Type Safety:** Built entirely with **TypeScript** for robust, error-free code.
* **Prisma ORM:** Utilized for type-safe database access and streamlined schema management with **MongoDB Atlas**.
* **API Versioning:** Clear separation of API with the `/v1` prefix.
* **Global Error Handling:** Centralized middleware for graceful and informative error responses.

##  Tech Stack

| Category | Technology | Description |
| :--- | :--- | :--- |
| **Runtime** | **Node.js** | High-performance JavaScript runtime environment. |
| **Language** | **TypeScript** | Statically typed superset of JavaScript. |
| **Framework** | **Express.js** | Minimalist, fast, unopinionated web framework. |
| **Database** | **MongoDB Atlas** | Scalable, cloud-hosted NoSQL document database. |
| **ORM** | **Prisma** | Next-generation ORM for Node.js and TypeScript. |
| **Validation** | **Zod** | Schema declaration and validation library. |
| **Authentication** | **JWT (jsonwebtoken)** | Standard for securely transmitting information. |

## Installation & Setup

### 1. Clone the Repository

```bash
git clone <your-repo-url>
cd backend
```
2. Install Dependencies
```Bash
npm install
```
3. Environment Variables
Create a .env file in the root directory and populate it with your configuration:Code snippet# Database Connection
```
 DATABASE_URL="mongodb+srv://username:password@cluster.mongodb.net/taskdb?retryWrites=true&w=majority"
```

# JWT Configuration
```
JWT_SECRET="your-super-secret-jwt-key-change-in-production"
```

4. Database Setup
Generate the Prisma Client and push the schema to your MongoDB Atlas database
```Bash
npm run prisma:generate
npm run prisma:push
```

5. Start the Server
Start the application in development mode:
``` Bash
npm run dev
```



### Project Structure
1. Backend Folder Structure
```bash
backend/
├── src/
│   ├── controllers/       # Handles incoming requests and orchestrates business logic.
│   ├── middleware/        # Authentication, RBAC, Validation (Zod), and Error Handling.
│   ├── routes/            # Defines API endpoints and routes requests to controllers.
│   ├── types/             # TypeScript interfaces and custom type definitions.
│   ├── lib/               # Prisma client and database connection setup.
│   ├── utils/             # Helper functions (e.g., password hashing, JWT generation).
│   └── index.ts           # Server entry point.
├── prisma/
│   └── schema.prisma      # Database schema definition.
├── .env                   # Environment variables.
├── package.json
└── tsconfig.json
```

2. Frontend Folder Structure
```
frontend/
├── node_modules/          # Project dependencies
├── public/                # Static assets (e.g., index.html, favicon)
├── src/
│   ├── assets/            # Images, fonts, and other static resources
│   ├── components/        # Reusable UI components
│   │   ├── Navbar.tsx
│   │   └── TaskCard.tsx
│   ├── context/           # React Context for global state management
│   │   └── AuthContext.tsx
│   ├── pages/             # Route-specific components (views)
│   │   ├── Dashboard.tsx
│   │   ├── Login.tsx
│   │   └── Register.tsx
│   ├── types/             # TypeScript type definitions (interfaces)
│   │   └── index.ts
│   ├── App.css            # Global application styles
│   ├── App.tsx            # Main application component
│   ├── index.css          # Root styles/CSS imports
│   └── main.tsx           # Entry point (root) where the app is rendered
├── .gitignore
├── eslint_config.js
└── package.json           # Project metadata and scripts
```

### Preview/ Screen Shots

1.Testing the APIs:

<img width="2016" height="1622" alt="image" src="https://github.com/user-attachments/assets/850458ba-4c2f-4f45-864c-b55acec8da18" />

---

<img width="2030" height="1588" alt="image" src="https://github.com/user-attachments/assets/16de0af6-5807-48b4-98b7-cfe7a1ba4335" />

---

2.Running the Server as well as client:

<img width="631" height="207" alt="image" src="https://github.com/user-attachments/assets/50d37c7c-e333-46eb-aac9-c8463619dea2" />

---

<img width="1118" height="338" alt="image" src="https://github.com/user-attachments/assets/b0ddd7fb-5525-4e8d-a21d-e51cbb79b1a7" />

---

3.Dashboard Preview 

<img width="2880" height="1548" alt="image" src="https://github.com/user-attachments/assets/8e44340c-5836-405f-9cf8-a5a1e2928e61" />

---

<img width="2748" height="978" alt="image" src="https://github.com/user-attachments/assets/61ebf5cb-6b0a-47d3-9fa9-401b1d7f4520" />



   

  
