# 🌐 ng-web — NeuralGuru Web Applications

`ng-web` is the web interface layer for the NeuralGuru platform.  
It serves three primary user roles through dedicated dashboards and role-based access:

- **Admin**
- **Tutor**
- **Student**

This repository focuses on **user experience, workflows, and role-specific functionality**, while delegating all business logic, AI processing, and data orchestration to backend services.

---

## 🎯 Purpose

The goal of `ng-web` is to provide a **clean, responsive, and intuitive web experience** for all NeuralGuru users, ensuring that each role can perform its responsibilities efficiently and securely.

`ng-web` does **not**:

- Perform AI analysis
- Generate KBAT questions
- Process payments directly
- Store or compute academic data

All such logic is handled by backend services (e.g. `ng-core`, `ng-ai`).

---

## 👥 Supported User Roles

### 👨‍🎓 Student

The Student interface is designed to support learning, practice, and progress tracking.

Key capabilities:

- View assigned subjects and learning materials
- Take quizzes and tests
- Practice AI-generated KBAT questions
- Receive AI-guided hints and feedback
- View performance reports and progress charts
- Book tutors and manage sessions
- View payment history and subscription status

The student experience focuses on **adaptive learning** and **continuous improvement**.

---

### 👩‍🏫 Tutor

The Tutor interface enables educators to support students effectively.

Key capabilities:

- Manage tutor profile (subjects, availability, rates)
- View assigned or booked students
- Access student performance summaries (read-only)
- Conduct scheduled tutoring sessions (online or in-person)
- Upload learning materials and supplementary notes
- Track session history and earnings

Tutors do **not** modify AI analysis or student diagnostics.

---

### 🧑‍💼 Admin

The Admin interface is built for institutional and platform oversight.

Key capabilities:

- Manage users (students, tutors, parents)
- Approve or verify tutor profiles
- Monitor platform usage and engagement
- View aggregated academic performance analytics
- Oversee tutor participation across institutions
- Ensure compliance with platform policies

Admins interact with **summarized data only**, not raw student responses.

---

## 📦 Getting Started

```bash
# install dependencies
npm install

# run development server
npm run dev
```

---

## 🧪 Running Tests

To run the test suite:

```bash
npm run test
```

---

## 📄 License

© 2025 NeuralGuru. All rights reserved.

This project is proprietary software.  
Unauthorized copying, modification, distribution, or use of this code, in whole or in part, is strictly prohibited without explicit permission from the NeuralGuru team.
