# TaskFlow — Collaborative Project Management Platform (Backend)

**Author:** Prince Aggarwal  
**Contact:** agr.prince2005@gmail.com

REST API backend for TaskFlow — a team project management platform. Users can register, create projects, invite members with roles, and manage tasks with subtasks and file attachments.

**Stack:** Node.js · Express 5 · MongoDB Atlas · Mongoose · JWT · bcrypt · Multer · Nodemailer

---

## Features

- **Auth** — Register, login, JWT access/refresh tokens, email verification, forgot/reset password
- **Projects** — CRUD, member management, role-based access (`admin`, `project_admin`, `member`)
- **Tasks** — CRUD with status (`todo` / `in_progress` / `done`), assignees, file attachments
- **Subtasks** — Create, update, mark complete, delete
- **Security** — HTTP-only cookies, bcrypt password hashing, express-validator input validation

---

## Quick Start

```bash
npm install
cp .env.example .env   # then fill in your values
npm run dev
```

Server runs at `http://localhost:8000`

Health check: `GET http://localhost:8000/api/v1/healthcheck`

---

## API Endpoints

### Auth — `/api/v1/auth`

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | `/register` | No | Register new user |
| POST | `/login` | No | Login |
| POST | `/logout` | Yes | Logout |
| POST | `/current-user` | Yes | Get logged-in user |
| GET | `/verify-email/:token` | No | Verify email |
| POST | `/refresh-token` | No | Refresh access token |
| POST | `/forgot-password` | No | Send reset email |
| POST | `/reset-password/:token` | No | Reset password |
| POST | `/change-password` | Yes | Change password |

### Projects — `/api/v1/projects`

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET | `/` | Yes | List user's projects |
| POST | `/` | Yes | Create project |
| GET | `/:projectId` | Yes | Get project |
| PUT | `/:projectId` | Admin | Update project |
| DELETE | `/:projectId` | Admin | Delete project |
| GET | `/:projectId/members` | Member | List members |
| POST | `/:projectId/members` | Admin | Add member |
| PUT | `/:projectId/members/:userId` | Admin | Update member role |
| DELETE | `/:projectId/members/:userId` | Admin | Remove member |

### Tasks — `/api/v1/projects/:projectId/tasks`

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET | `/` | Member | List tasks |
| POST | `/` | Admin/Project Admin | Create task |
| GET | `/:taskId` | Member | Get task with subtasks |
| PUT | `/:taskId` | Admin/Project Admin | Update task |
| DELETE | `/:taskId` | Admin/Project Admin | Delete task |
| POST | `/:taskId/subtasks` | Member | Create subtask |
| PUT | `/:taskId/subtasks/:subTaskId` | Member | Update subtask |
| DELETE | `/:taskId/subtasks/:subTaskId` | Member | Delete subtask |

**Auth header:** `Authorization: Bearer <accessToken>` or use cookies from login.

---

## Resume Bullet Points

- Built **TaskFlow**, a RESTful project management API with **Node.js, Express, and MongoDB Atlas** supporting JWT auth, role-based access control, and team collaboration
- Implemented secure authentication with **bcrypt**, access/refresh token rotation, email verification, and password reset flows
- Designed MongoDB schemas and aggregation pipelines for projects, tasks, subtasks, and member permissions
- Added input validation (**express-validator**), centralized error handling, and file upload support via **Multer**

---

## Project Structure

```
src/
├── controllers/   # Route handlers
├── routes/        # API routes
├── models/        # Mongoose schemas
├── middlewares/   # Auth, validation, file upload
├── validators/    # Request validation rules
├── utils/         # Helpers (ApiResponse, mail, etc.)
├── db/            # MongoDB connection
├── app.js         # Express setup
└── index.js       # Entry point
```
