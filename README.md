# CareBridge Clinic Frontend

Beautiful hospital frontend built with:

- Next.js (App Router)
- React
- Tailwind CSS
- TypeScript

---

## Current implementation (end-to-end)

This repo is wired up to communicate with a backend API at `http://localhost:8080/api/v1` for authentication and core data operations.

### 🔐 Auth flow (login + logout)

- **Login page:** `app/login/page.tsx`
  - POSTs to `http://localhost:8080/api/v1/auth/login` with `{ username, password }`
  - Stores response in `localStorage`:
    - `accessToken`, `refreshToken`, `username`, `roles`
  - Redirects to **`/consultations`** on success

- **Logout:**
  - Uses `components/navbar.tsx` to POST to `http://localhost:8080/api/v1/auth/logout` with `Authorization: Bearer <token>`
  - Clears stored auth + cached data
  - Redirects to `/login`

### 🚦 Route guarding

Route-based guards are enforced in client pages (e.g. `dashboard`, `doctors`, `consultations`) by checking `localStorage.accessToken` and redirecting to `/login` when missing.

### 🩺 Dynamic doctor data

- `lib/hooks/useAvailableDoctors.ts` fetches:
  - `GET http://localhost:8080/api/v1/doctors/available`
  - Includes `Authorization: Bearer <accessToken>`
  - Caches the response in `localStorage.availableDoctors`

- `app/doctors/page.tsx` uses this hook to render the doctor list and show availability status.

- `app/dashboard/page.tsx` also uses this hook to power the “Doctors Available” stat and the doctor list.

### 🧾 Consultations CRUD

- `app/consultations/page.tsx`:
  - Loads appointment records via `GET http://localhost:8080/api/v1/consultations`
  - Creates a new consultation via `POST http://localhost:8080/api/v1/consultations` using `accessToken` in Authorization header
  - Stores the selected doctor ID in `localStorage.selectedDoctorId` so the dropdown can remember the choice
  - Clears success message after 1s
  - Resets the doctor dropdown after a record is created

### 🧠 UI behavior

- Home / hero page (`components/hero.tsx`):
  - The “Launch Dashboard” button requires login; if not logged in it redirects to `/login`

- Navbar (`components/navbar.tsx`):
  - Shows **Login** when not logged in
  - Shows an **avatar + Logout** button when logged in

---

## Run locally

```bash
npm install
npm run dev
```

Open:

```bash
http://localhost:3000
```

---

## Where to look when you extend the app

- API helpers / hooks: `lib/hooks/useAvailableDoctors.ts`
- Mock data (still used in some places): `lib/data.ts`
- Layout components: `components/dashboard-shell.tsx`, `components/navbar.tsx`

---

## Notes

- The frontend uses **app router client components** for API calls, token storage, and navigation.
- You can safely replace the hardcoded backend host with an env var by adding a helper (e.g. `lib/api.ts`) and updating fetch endpoints accordingly.
