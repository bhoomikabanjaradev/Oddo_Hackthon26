# 🚚 TransitOps - Smart Transport Operations Platform

> Hackathon MVP | Deadline: **5:00 PM**
>
> **Goal:** Build a working transport management system that demonstrates the complete operational workflow. We are **NOT** building a production-ready SaaS. We are building a polished MVP that judges can demo in under 5 minutes.

---

# 👥 Team

| Member | Responsibility |
|----------|---------------|
| Bhoomika (Leader) 
| Ankit | 
| Bipin |
| Priya | 
---

# 🎯 MVP Goal

The judge should be able to do this:

```

Login
↓
Dashboard
↓
Add Vehicle
↓
Add Driver
↓
Create Trip
↓
Dispatch Trip
↓
Complete Trip
↓
Vehicle becomes Available again
↓
Driver becomes Available again

```

If this works smoothly,
**we have a complete MVP.**

---

# ❌ Ignore Until MVP is Finished

- PDF Export
- Email Notifications
- Charts
- Dark Mode
- Advanced Analytics
- Search
- Filters
- Revenue Calculations
- Fancy Dashboard

These are only if time remains.

---

# ✅ MVP Features (Non-Negotiable)

## 1. Authentication

- Login
- JWT Authentication
- Protected Routes

*(Signup can be skipped by seeding one admin user.)*

---

## 2. Dashboard

Display only:

- Total Vehicles
- Available Vehicles
- Active Trips
- Drivers
- Vehicles In Maintenance

Simple cards are enough.

---

## 3. Vehicle Management

### CRUD

- Add Vehicle
- View Vehicles
- Update Vehicle
- Delete Vehicle

Fields

- Registration Number
- Vehicle Name
- Vehicle Type
- Capacity
- Odometer
- Status

Status

```

Available
On Trip
In Shop

```

---

## 4. Driver Management

CRUD

Fields

- Name
- License Number
- License Expiry
- Status

Status

```

Available
On Trip
Suspended

```

---

## 5. Trip Management ⭐⭐⭐

This is the core feature.

User can

- Create Trip
- Dispatch Trip
- Complete Trip

Business Rules

✔ Vehicle must be Available

✔ Driver must be Available

✔ License must not be expired

✔ Cargo <= Vehicle Capacity

Dispatch

```

Vehicle → On Trip
Driver → On Trip

```

Complete

```

Vehicle → Available
Driver → Available

```

---

## 6. Maintenance

Only

Create Maintenance

Automatically

```

Vehicle
↓

In Shop

```

Close Maintenance

```

Vehicle
↓

Available

```

---

## 7. Fuel Logs

Simple

- Vehicle
- Liters
- Cost

---

# 🛠 Backend Stack

- Node.js
- Express
- MongoDB
- Mongoose
- JWT
- bcrypt
- Zod

---

# 📁 Folder Structure

```

backend/

src/

config/
controllers/
middleware/
models/
routes/
services/
utils/
validations/

app.js
server.js

```

---

# 📦 MongoDB Collections

```

users

vehicles

drivers

trips

maintenances

fuelLogs

```

---

# 📌 API List

## Auth

```

POST /login

GET /me

```

---

## Vehicles

```

GET /vehicles

POST /vehicles

PATCH /vehicles/:id

DELETE /vehicles/:id

```

---

## Drivers

```

GET /drivers

POST /drivers

PATCH /drivers/:id

DELETE /drivers/:id

```

---

## Trips

```

POST /trips

PATCH /trips/:id/dispatch

PATCH /trips/:id/complete

GET /trips

```

---

## Maintenance

```

POST /maintenance

PATCH /maintenance/:id/close

GET /maintenance

```

---

## Fuel

```

POST /fuel

GET /fuel

```

---

## Dashboard

```

GET /dashboard

```

Returns

```json
{
  "vehicles": 12,
  "availableVehicles": 8,
  "drivers": 7,
  "activeTrips": 3,
  "maintenance": 1
}
```

---

# ⚙️ Backend TODO 
## Phase 1 (10:00 - 10:45)

- [ ] Initialize Backend
- [ ] Install Packages
- [ ] Connect MongoDB
- [ ] Create Folder Structure
- [ ] Setup Express Server

---

## Phase 2 (10:45 - 11:30)

- [ ] User Model
- [ ] Vehicle Model
- [ ] Driver Model
- [ ] Trip Model
- [ ] Maintenance Model
- [ ] FuelLog Model

---

## Phase 3 (11:30 - 12:15)

- [ ] JWT Login
- [ ] Auth Middleware

---

## Phase 4 (12:15 - 1:15)

- [ ] Vehicle CRUD
- [ ] Test in Postman

---

## Phase 5 (1:15 - 2:00)

- [ ] Dashboard Counts API

---

# ⚙️ Backend TODO 

## Phase 1

- [ ] Driver CRUD

---

## Phase 2

- [ ] Create Trip

---

## Phase 3

- [ ] Dispatch Trip

Checks

- Vehicle Available
- Driver Available
- License Valid
- Capacity Check

---

## Phase 4

- [ ] Complete Trip

Updates

Vehicle

```

On Trip
↓

Available

```

Driver

```

On Trip
↓

Available

```

---

## Phase 5

- [ ] Maintenance API

Vehicle

```

Available
↓

In Shop

```

---

## Phase 6

- [ ] Fuel Logs API

---

# 🎨 Frontend TODO 

## Setup

- [ ] React + Tailwind
- [ ] Routing
- [ ] Sidebar
- [ ] Navbar

---

## Pages

- [ ] Login
- [ ] Dashboard
- [ ] Vehicles
- [ ] Drivers
- [ ] Trips
- [ ] Maintenance

---

## Integration

- [ ] Login API
- [ ] Vehicle APIs
- [ ] Driver APIs
- [ ] Trip APIs
- [ ] Dashboard API

---

# ⏰ Timeline

## 10:00 → 10:30

- Repo Setup
- Branches
- Backend Initialization
- React Setup

---

## 10:30 → 12:00

Backend

- Auth
- Models
- Vehicle CRUD
- Driver CRUD

Frontend

- Login
- Dashboard
- Sidebar

---

## 12:00 → 2:00

Trip Management

Maintenance

Fuel

Dashboard API

Frontend Integration

---

## 2:00 → 3:30

Connect Everything

Fix Bugs

Test Complete Workflow

---

## 3:30 → 5:00

## Polish

- Better UI
- Loading States
- Toasts
- Responsive Design
- Seed Demo Data
- Demo Practice
- Final Testing

---

# 🏆 Demo Flow

1. Login
2. Dashboard
3. Add Vehicle
4. Add Driver
5. Create Trip
6. Dispatch Trip
7. Show Vehicle = On Trip
8. Show Driver = On Trip
9. Complete Trip
10. Show Vehicle = Available
11. Create Maintenance
12. Vehicle becomes In Shop
13. Dashboard Updates

---

# 🚨 Rules (Most Important)

- Registration Number must be unique.
- Cargo Weight cannot exceed Vehicle Capacity.
- Vehicle already On Trip cannot be assigned.
- Driver already On Trip cannot be assigned.
- Expired License cannot be assigned.
- Dispatch automatically changes statuses.
- Complete automatically restores statuses.
- Maintenance automatically sets Vehicle to In Shop.

---

# 🎯 Success Criteria

If the judge can complete the following workflow without any errors:

Login → Dashboard → Add Vehicle → Add Driver → Create Trip → Dispatch → Complete → Maintenance

**We consider the MVP complete.**

Everything after this is polishing.