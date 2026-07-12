# TransitOps : Smart Transport Operations Platform

**A smarter way to run a transport fleet.**

Built during Oddo Hackathon 2026, TransitOps replaces the spreadsheets and paper logbooks a lot of logistics teams still rely on. One place to register vehicles and drivers, dispatch trips, keep maintenance on schedule, and track fuel costs — with the system enforcing the rules instead of hoping someone remembers them.

## Why we built this

Ask anyone running a small fleet how they track which truck is available, whether a driver's license is still valid, or what a vehicle actually cost last month in fuel and repairs — you'll usually get a shrug and an Excel sheet. Things fall through the cracks: a driver gets dispatched with an expired license, a vehicle goes out overloaded, maintenance gets forgotten until something breaks. TransitOps doesn't let that happen — the rules are baked into the backend, not left up to memory.

## Who it's for

Fleet managers tracking vehicle status, dispatchers assigning trips, safety officers watching license expiries, and finance teams tracking what the fleet actually costs.

## What it does

- **Login & auth** — nobody gets in without credentials
- **Dashboard** — a quick read on vehicles, drivers, and active trips
- **Vehicles** — register, edit, retire; unique registration number, capacity, live status
- **Drivers** — same idea, plus license tracking so expired ones can't be dispatched
- **Trips** — create, dispatch, complete — capacity, availability, and license get checked before dispatch is allowed
- **Maintenance** — flag a vehicle for service and it's pulled out of the dispatch pool until closed
- **Fuel logs** — a running record of what each vehicle's burning through

## The rules that actually matter

- Registration numbers must be unique
- A vehicle already on a trip or in the shop can't be dispatched again
- A driver with an expired license, or already on a trip, is off the table
- Cargo can't exceed what the vehicle's rated to carry
- Dispatch → vehicle and driver both flip to "On Trip," automatically
- Complete → they both flip back to "Available," automatically
- Send to maintenance → vehicle disappears from dispatch until the ticket's closed

## Built with

**Backend:** Node.js, Express, MongoDB, Mongoose, JWT, bcrypt, Zod
**Frontend:** React, Vite, Tailwind CSS, React Router, Axios

## API, briefly

- **Auth** — `POST /api/v1/auth/login` to sign in, `GET /api/v1/auth/me` to check who's logged in
- **Vehicles** — `GET /api/v1/vehicles` to list them, `POST` to add one, `GET/PATCH/DELETE /api/v1/vehicles/:id` to view, edit, or remove a specific one
- **Drivers** — same pattern, under `/api/v1/drivers`
- **Trips** — `GET/POST /api/v1/trips` to list or create, then `PATCH /api/v1/trips/:id/dispatch` and `PATCH /api/v1/trips/:id/complete` to move a trip through its lifecycle
- **Maintenance** — `GET/POST /api/v1/maintenance` to log or view records, `PATCH /api/v1/maintenance/:id/close` when the vehicle's back in service
- **Fuel logs** — `GET/POST /api/v1/fuel` to record or pull up fuel entries

## Running it yourself

**Backend**
```bash
cd backend
npm install
```
Add a `.env` file in `backend/`:
```
MONGODB_URI=mongodb://localhost:27017/transitops
PORT=3000
```
```bash
node src/server.js
```

**Frontend**
```bash
cd frontend
npm install
npm run dev
```

## A quick walkthrough

Register a vehicle, register a driver, create a trip between them. Try to dispatch it — the system checks everything's in order first. Once it's out, both the vehicle and driver show as busy. Mark the trip complete, and they're free again. Send the vehicle to maintenance, and it quietly steps out of the lineup until you bring it back. That's the whole loop — the same one a real dispatcher runs in their head, just enforced instead of hoped for.