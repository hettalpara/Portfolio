# Practical 7: Authentication and Middleware Pipeline

## 1. Objective
Implement JWT authentication, password hashing, protected task routes, and server-side validation in the existing Task Manager.

## 2. Problem Definition
Users must register and log in before accessing task APIs. The server validates requests and rejects missing, invalid, or expired credentials.

## 3. Authentication Flow
Register -> bcrypt password hash -> MongoDB User document -> login -> JWT -> Bearer token on protected requests.

## 4. User Schema
`User` stores a unique, lowercase trimmed email and a bcrypt hash. Plain passwords are never stored or returned.

## 5. Registration
`POST /auth/register` validates the input, checks duplicate email, hashes the password, and returns `201`.

## 6. Password Hashing
`bcrypt.hash(password, 10)` creates the stored password hash. Login uses `bcrypt.compare`.

## 7. Login
`POST /auth/login` returns `401` for invalid credentials and a JWT for valid credentials.

## 8. JWT Generation
The token contains the user ID and expires after one hour. The secret is loaded from `.env`.

## 9. Authentication Middleware
`authMiddleware` reads `Authorization: Bearer <token>`, verifies it with `jwt.verify`, stores the decoded value in `req.user`, and returns `401` for invalid or expired tokens.

## 10. Validation Middleware
`validateTask` trims the title, requires a non-empty title, and limits it to 100 characters.

## 11. Protected Task Routes
All `/tasks` routes run authentication first. `POST` and `PUT` additionally run task validation before their existing controllers.

## 12. `/me` Endpoint
`GET /auth/me` uses `req.user.id` and returns the current user without the password.

## 13. Frontend Login/Register
The React app provides `/login` and `/register`, stores the login token in `localStorage`, and redirects authenticated users to `/tasks`.

## 14. Logout
The Logout button removes the token and redirects to `/login`.

## 15. 401 Handling
Centralized API handling removes an invalid token and redirects to `/login` whenever a protected request returns `401`.

## 16. API Endpoint Table
| Method | Endpoint | Auth | Purpose |
|---|---|---|---|
| POST | `/auth/register` | No | Create a user |
| POST | `/auth/login` | No | Return JWT |
| GET | `/auth/me` | Yes | Return current user |
| GET | `/tasks` | Yes | List tasks |
| GET | `/tasks/:id` | Yes | Read one task |
| POST | `/tasks` | Yes | Create task |
| PUT | `/tasks/:id` | Yes | Update task |
| DELETE | `/tasks/:id` | Yes | Delete task |

## 17. Postman Testing
Register, login, call `/tasks` without a token, call it with `Bearer <token>`, create a task, submit a missing-title request, call `/auth/me`, and test a tampered token.

## 18. Screenshots to Capture
1. Backend terminal showing server and MongoDB connected.
2. Postman successful registration.
3. MongoDB users collection showing the bcrypt hash.
4. Login response containing the JWT.
5. `/tasks` without a token returning `401`.
6. `/tasks` with a Bearer token returning `200`.
7. Authenticated task creation.
8. Missing-title validation returning `400`.
9. `/auth/me` response.
10. Frontend Register page.
11. Frontend Login page.
12. Authenticated Task Manager.
13. Logout redirecting to Login.

## 19. Result
Authentication, authorization, validation, and existing task CRUD operations work together through the Express middleware pipeline.

## 20. Conclusion
Practical 7 secures the Practical 6 Task Manager with a simple JWT-based session while preserving the existing React, Express, Mongoose, and MongoDB workflow.
