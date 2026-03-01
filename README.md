# ProjectGen — Final Year Project Generator for Students

A full-stack MERN SaaS web application that allows college students to generate complete academic project kits instantly based on their chosen stream, domain, and technology.

---

## Tech Stack

| Layer      | Technology                          |
|------------|-------------------------------------|
| Frontend   | React 18, TailwindCSS, React Router |
| Backend    | Node.js, Express.js                 |
| Database   | MongoDB, Mongoose                   |
| Auth       | JWT (JSON Web Tokens)               |
| Payments   | Razorpay                            |
| PDF Gen    | PDFKit                              |

---

## Project Structure

```
projectgen/
├── backend/
│   ├── config/db.js
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── projectController.js
│   │   ├── paymentController.js
│   │   └── adminController.js
│   ├── middleware/
│   │   ├── auth.js
│   │   └── admin.js
│   ├── models/
│   │   ├── User.js
│   │   └── Project.js
│   ├── routes/
│   │   ├── auth.js
│   │   ├── projects.js
│   │   ├── payment.js
│   │   └── admin.js
│   ├── utils/
│   │   ├── generateProject.js
│   │   └── pdfGenerator.js
│   ├── .env.example
│   ├── package.json
│   └── server.js
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.jsx
│   │   │   └── Footer.jsx
│   │   ├── context/AuthContext.jsx
│   │   ├── pages/
│   │   │   ├── Landing.jsx
│   │   │   ├── Login.jsx
│   │   │   ├── Register.jsx
│   │   │   ├── Dashboard.jsx
│   │   │   ├── Generator.jsx
│   │   │   ├── ProjectDetail.jsx
│   │   │   ├── Pricing.jsx
│   │   │   └── AdminPanel.jsx
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── index.html
│   ├── package.json
│   ├── tailwind.config.js
│   ├── postcss.config.js
│   └── vite.config.js
├── .gitignore
└── README.md
```

---

## Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/projectgen.git
cd projectgen
```

### 2. Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file (copy from `.env.example`):

```env
PORT=5000
MONGODB_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/projectgen
JWT_SECRET=your_super_secret_jwt_key_here
JWT_EXPIRES_IN=7d
FRONTEND_URL=http://localhost:5173
RAZORPAY_KEY_ID=rzp_test_xxxxxxxxxxxx
RAZORPAY_KEY_SECRET=your_razorpay_secret_here
```

Start the backend:

```bash
npm run dev
```

### 3. Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

Visit: **http://localhost:5173**

---

## Environment Variables

### Backend `.env`

| Variable              | Description                          |
|-----------------------|--------------------------------------|
| `PORT`                | Server port (default: 5000)          |
| `MONGODB_URI`         | MongoDB Atlas connection string      |
| `JWT_SECRET`          | JWT signing secret                   |
| `JWT_EXPIRES_IN`      | Token expiration (e.g., `7d`)        |
| `FRONTEND_URL`        | Frontend URL for CORS                |
| `RAZORPAY_KEY_ID`     | Razorpay Key ID                      |
| `RAZORPAY_KEY_SECRET` | Razorpay Key Secret                  |

---

## Features

### For Students
- **3-Step Generator**: Select stream → domain/tech → generate
- **Complete Project Kits**: Title, abstract, problem statement, objectives, modules, technology stack, methodology, architecture, future scope, conclusion
- **Project History**: All past projects saved to account
- **PDF Download** *(Premium)*: Formatted A4 project report PDF
- **PPT Outline Download** *(Premium)*: Slide-by-slide PPT structure PDF

### Plans
| Plan    | Price      | Generations     | PDF | PPT |
|---------|------------|-----------------|-----|-----|
| Free    | ₹0/month   | 2/month         | ✗   | ✗   |
| Premium | ₹499 once  | Unlimited       | ✓   | ✓   |

### Admin Panel
- Dashboard with stats (users, projects, revenue)
- User management (view, update plan, delete)
- Project browser (all generated projects)
- Domain usage analytics

---

## API Endpoints

### Auth
```
POST /api/auth/register   — Register user
POST /api/auth/login      — Login user
GET  /api/auth/me         — Get current user
```

### Projects
```
POST   /api/projects/generate       — Generate new project
GET    /api/projects/my             — Get user's projects
GET    /api/projects/:id            — Get single project
GET    /api/projects/:id/download-pdf  — Download PDF (Premium)
GET    /api/projects/:id/download-ppt  — Download PPT (Premium)
DELETE /api/projects/:id            — Delete project
```

### Payment
```
POST /api/payment/create-order  — Create Razorpay order
POST /api/payment/verify        — Verify & activate premium
```

### Admin
```
GET    /api/admin/stats           — Dashboard stats
GET    /api/admin/users           — All users
PATCH  /api/admin/users/:id/plan  — Update user plan
DELETE /api/admin/users/:id       — Delete user
GET    /api/admin/projects        — All projects
```

---

## Setting Up Razorpay

1. Create account at [razorpay.com](https://razorpay.com)
2. Go to Settings → API Keys → Generate Test Key
3. Copy `Key ID` and `Key Secret` to your `.env`
4. For production, use live keys and enable Razorpay webhooks

---

## Creating an Admin User

After registering a user, update their role in MongoDB:

```javascript
db.users.updateOne(
  { email: "admin@projectgen.in" },
  { $set: { role: "admin" } }
)
```

---

## Deployment

### Frontend (Vercel/Netlify)
```bash
cd frontend
npm run build
# Deploy the dist/ folder
```

Set env variable: `VITE_API_URL=https://your-backend.render.com`

Update `vite.config.js` proxy target or use `axios.defaults.baseURL`.

### Backend (Render/Railway)
- Set all environment variables in the platform dashboard
- Use `npm start` as the start command
- MongoDB Atlas allows connections from all IPs (0.0.0.0/0)

---

## License

MIT License — Free to use for educational purposes.

---

Built with ❤️ for college students — ProjectGen 2026
