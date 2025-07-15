# 🎬 Veedeo Video Library Dashboard

A full-stack video library dashboard that allows users to browse, sort, filter, and create video entries.

---

## Tech Stack

### Frontend

- **React (App Router)** + **TypeScript**
- **Tailwind CSS**
- **Redux** – global state management
- **React Query** – data fetching and caching
- **Vitest** – unit testing examples

### Backend

- **Node.js** + **Fastify**
- **Prisma (PostgresSQL)**
- **Zod** – runtime validation of query parameters and request bodies
- **Vitest** – unit and integration test framework

---

## 🔧 Setup Instructions

### Prerequisites

- Node.js >= 20
- Docker & Docker Compose

### 1. Clone the repo

```bash
git clone https://github.com/JoelUreellanah/veed-take-home-assignment.git
cd veed-take-home-assignment
```

### 2. Run with Docker (Recommended)

```bash
docker-compose up --build
```

This will spin up **three containers**: frontend, backend, and database.

💡 Wait until all containers are fully built and running. The app is ready when you see logs like this:

```
backend-1   | {"level":30,"time":1752584995171,"pid":279,"hostname":"d117e3bfd0af","msg":"Server listening at http://172.20.0.3:4000"}
backend-1   | {"level":30,"time":1752584995171,"pid":279,"hostname":"d117e3bfd0af","msg":"Server ready at http://127.0.0.1:4000"}
```

Once you see the above, you can access:

- Frontend: `http://localhost:3000`
- Backend: `http://localhost:4000`

### 3. Local Dev Setup (Optional)

#### Database

In `backend/.env` set `DATABASE_URL="postgresql://postgres:postgres@localhost:5432/veedeo"`

```bash
docker compose up db
```

#### Backend

```bash
cd backend
npm install
npx prisma migrate dev
npm run seed
npm run dev
npm run test (to run unit/integration test suite)
```

#### Frontend

```bash
cd frontend
npm install
npm run dev
npm run test (to run test suite)
```

---

## Implemented Features

### 🔹 Video List Page

- Responsive grid layout
- Display: `title`, `created_at`, `tags`
- Sort: by `created_at` (newest / oldest)
- Search: by title
- Video detail view Page
- Pagination support

### 🔹 Video Creation Page

- Title input (required)
- Tags input (optional)
- `created_at` auto-generated
- Default values for:
  - `thumbnail_url`
  - `duration`
  - `views` set to 0

---

## 📘 Assumptions & Trade-offs

- <b>User authentication</b> and <b>authorization</b> are out of scope for this task, but essential for a multi-user production environment. APIs are publicly exposed for simplicity.
- <b>Validation at API Boundaries Only</b>: Request query and body validation are handled with zod at the API layer. This works well for a typed Node environment but doesn't protect against incorrect data being inserted manually into the database. Additional model-level constraints or database-level validation (e.g., via Prisma schema or database schema constraints) would be necessary in production.
- <b>Data Model Simplicity</b>: for example, Tags are implemented as simple string arrays without normalization or a separate tag table. This avoids premature optimization but may lead to inconsistencies in tag spelling or casing over time. For scale, a normalized tag model would be preferable.
- <b>Limited UI Feedback Patterns</b>: While some errors and loading states are handled gracefully, deeper UX improvements like optimistic UI, in-app notifications, or undo actions are omitted due to time constraints. Other example is: error handling is needed when adding a new video (ie. servers are down, video upload takes a long time to complete, real-time completion bar would be required and so on..)
- <b>UI Design Trade-off</b>: The UI prioritizes functional clarity and responsiveness over visual flair. No animations or deep component theming were added, to keep the focus on architecture and core interactivity.
- Minimal end-to-end testing due to time constraints.
- Static values like `duration` and `views` are not editable for now.

---

## 🚀 Future Improvements

If given more time, I would:

- Add full CRUD support (update/delete video)
- Add authentication and user-specific dashboards
- Improve error boundaries and retry logic
- Implement full E2E testing with **Cypress**
- Add advanced search (fuzzy search, debounce)
- Allow tag suggestions/autocomplete
- Improve accessibility (ARIA roles, screen reader testing)

---

## 📚 API Docs

### `GET /videos`

**Query Parameters:**

- `search`: Filter by title
- `tags`: Filter by one or more tags
- `startDate`, `endDate`: Date range filter
- `sortBy`: `newest` or `oldest`
- `page`, `pageSize`: Pagination control

**Example:**

```
GET /videos?search=react&tags=programming&page=1&pageSize=10
```

---

### `POST /videos`

Create a new video entry.

**Request Body:**

```json
{
  "title": "My New Video",
  "tags": ["react", "tutorial"]
}
```

**Auto-populated fields:**

- `created_at`: Current timestamp
- `thumbnail_url`: Default placeholder
- `duration`: random auto-generated duration (in seconds)
- `views`: `0`

---

## Testing Strategy

### Backend

- Unit tests for tag parsing and video service filters
- Example of Integration tests for `GET /videos` endpoint
- Input validation tested via `Zod`

### Frontend

- Unit test examples using Vitest and Testing Library
- Future: Cypress for end-to-end flows

---

## ⚠️ Error Handling & Accessibility

- All query params and requests validated with Zod
- Errors return meaningful HTTP codes and messages
- Frontend shows user-friendly error states
- Input fields are labeled and keyboard-navigable
- Fallbacks for loading and empty states included

---

## 🧹 Linting & Formatting

- ESLint and Prettier included
- Consistent naming and file structure enforced

---

## 👋 Conclusion

This project prioritizes clarity, scalability, and responsiveness. Key features are implemented cleanly, and the structure allows for rapid iteration. Thank you for reviewing!
