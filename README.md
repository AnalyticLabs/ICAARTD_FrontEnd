# Research Paper Submission Web Application

This project is a **web-based research paper submission system** built for managing paper submissions between **Authors** and a single **Admin**.  
It provides a two-way authentication system with role-based dashboards and a status tracking system for submitted papers.

---

## 🚀 Features

### 👤 Author

- Register and log in as an Author.
- Submit research papers through the submission form.
- View **only their own submitted papers** in the Author Dashboard.
- See the current **status** of each paper (default: `Submitted`).
- Receive notifications when the Admin updates the paper status.

### 🛡️ Admin

- Login as the single **Admin** user.
- View **all submitted papers** in the Admin Dashboard.
- Change the **status** of any paper (e.g., `Submitted → Under Review → Accepted/Rejected`).
- Authors are automatically notified when their paper status changes.
- Get notified whenever a new paper is submitted.

---

## 📌 Workflow

1. **Registration & Authentication**

   - Authors can register for an account.
   - Only one Admin account exists (predefined in the system).

2. **Paper Submission**

   - Authors upload their paper via the submission form.
   - By default, the paper’s status is set to `Submitted`.
   - Admin is notified of the new submission.

3. **Dashboard Access**

   - **Authors:** Can only see their own papers and track status.
   - **Admin:** Can view all papers submitted by every Author.

4. **Status Management**
   - Admin updates the paper status (e.g., `Submitted → Under Review → Accepted → Rejected`).
   - Authors are notified of status updates in their dashboard.

---

## 🛠️ Tech Stack

- **Frontend:** React / Next.js (with modern UI libraries)
- **Backend:** Node.js / Express
- **Database:** MongoDB (Mongoose ODM)
- **Authentication:** JWT-based role authentication (Admin & Author)
- **File Uploads:** Multer (for handling paper files)

---
