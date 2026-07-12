# 🚀 Oddo Hackathon 2026

Welcome to the Oddo Hackathon project!

This repository follows a simple Git workflow so that everyone can work in parallel without conflicts.

---

# 👥 Team Members

- 👩‍💻 Bhoomika - Team Lead
- 👨‍💻 Ankit - 
- 👩‍💻 Priya - 
- 👨‍💻 Bipin - 

---

# 📂 Project Structure

```
Oddo_Hackthon26/
│
├── backend/
│
├── frontend/
│
├── README.md
│
└── .gitignore
```

---

# 🚀 Getting Started

## 1. Clone the Repository

Using HTTPS

```bash
git clone https://github.com/<username>/Oddo_Hackthon26.git
```

or using SSH

```bash
git clone git@github.com:<username>/Oddo_Hackthon26.git
```

Go inside the project

```bash
cd Oddo_Hackthon26
```

---

# 🌿 Create Your Own Branch

⚠️ **Never work directly on `main`.**

Create your own branch.

### Ankit

```bash
git checkout -b feature/ankit-backend
```

### Priya

```bash
git checkout -b feature/priya-frontend
```

### Bipin

```bash
git checkout -b feature/bipin-maps
```

### Bhoomika

```bash
git checkout -b feature/bhoomika-integration
```

Push the branch for the first time

```bash
git push -u origin <your-branch-name>
```

Example

```bash
git push -u origin feature/ankit-backend
```

---

# 💻 Start Working

After creating your branch, start working only on your assigned task.

Example

```
backend/
```

or

```
frontend/
```

Do **NOT** work directly on someone else's code unless discussed.

---

# 💾 Save Your Progress

Whenever you complete a feature or a meaningful change

Add your files

```bash
git add .
```

Commit

```bash
git commit -m "feat: add authentication API"
```

Push

```bash
git push
```

Commit often with meaningful messages.

Examples

```
feat: add login API

fix: resolve JWT bug

style: improve dashboard UI

refactor: clean auth middleware
```

---

# 🔄 Get Latest Changes from Main

Before starting a new feature or before opening a Pull Request, update your branch.

Switch to main

```bash
git checkout main
```

Pull latest code

```bash
git pull origin main
```

Go back to your branch

```bash
git checkout <your-branch-name>
```

Merge latest main

```bash
git merge main
```

Resolve conflicts if there are any.

Continue working.

---

# 🚀 Open a Pull Request

When your feature is complete

1. Push your latest changes

```bash
git push
```

2. Go to GitHub

3. Click

```
Compare & Pull Request
```

4. Select

```
Base: main

Compare: your branch
```

5. Create Pull Request

6. Wait for review

7. Merge into main

---

# ✅ Daily Git Flow (Hackathon Flow)

```
Clone Repository
        │
        ▼
Create Your Branch
        │
        ▼
Start Coding
        │
        ▼
git add .
        │
        ▼
git commit
        │
        ▼
git push
        │
        ▼
Repeat
        │
        ▼
Pull Latest Main
        │
        ▼
Open Pull Request
        │
        ▼
Merge to Main
```

---

# 📌 Git Commands Cheat Sheet

Clone

```bash
git clone <repo-url>
```

Check current branch

```bash
git branch
```

Create new branch

```bash
git checkout -b feature/your-name
```

Switch branch

```bash
git checkout main
```

Check status

```bash
git status
```

Stage files

```bash
git add .
```

Commit

```bash
git commit -m "your message"
```

Push

```bash
git push
```

Pull latest

```bash
git pull origin main
```

Merge latest main

```bash
git merge main
```

---

# 📋 Team Rules

✅ Work only on your own branch.

✅ Commit frequently.

✅ Push your code regularly.

✅ Keep commit messages meaningful.

✅ Pull the latest changes before opening a Pull Request.

❌ Never commit directly to `main`.

❌ Never force push to `main`.

❌ Don't modify another teammate's work without informing them.

---

# 🎯 Goal

Build a working MVP within the hackathon time while keeping the repository clean, organized, and conflict-free.


