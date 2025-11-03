# DreamNest Real Estate Website

DreamNest is a full-stack real estate experience crafted for showcasing premium residential projects, letting visitors explore curated listings, book appointments, and connect with the sales team. An authenticated admin workspace enables the business to upload new properties, manage existing listings, and review customer inquiries saved to Excel.

## Features

### Public Website
- **Modern landing page** with hero messaging, customer statistics, and brand values.
- **Projects catalogue** featuring responsive property cards, filtering by configuration (1BHK, 2BHK, 3BHK, Row House) and instant location search.
- **Appointment booking** form that stores submissions in an Excel workbook and shares real-time confirmation messaging.
- **Contact page** with business details, Google Maps embed, and inquiry form persisting to the shared Excel file.

### Admin Workspace
- **Secure login** backed by JWT tokens and environment-configured admin credentials.
- **Dashboard KPIs** highlighting total projects, appointments, and inquiries.
- **Project management** tools to upload, edit, or delete listings with live updates.
- **Inquiry viewer** surfacing recent appointments and questions with Excel export readiness.

## Tech Stack

| Layer     | Technology |
|-----------|------------|
| Frontend  | React 18, Vite, React Router, Axios |
| Styling   | Modern CSS with gradients, responsive grid layouts, and Google Fonts |
| Backend   | Node.js, Express, JWT authentication |
| Storage   | JSON file (projects) + Excel workbook via ExcelJS |
| Integrations | ExcelJS for `customer_inquiries.xlsx`, Google Maps embed |

## Project Structure

```
real-state/
├── backend/
│   ├── app.js
│   ├── controllers/
│   ├── routes/
│   ├── middleware/
│   ├── utils/
│   ├── config/
│   ├── data/projects.json
│   ├── excel/customer_inquiries.xlsx (created automatically)
│   └── package.json
├── frontend/
│   ├── index.html
│   ├── vite.config.js
│   ├── src/
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   ├── components/
│   │   ├── pages/
│   │   └── styles/
│   └── package.json
└── README.md
```

## Getting Started

### 1. Clone the repository
```bash
git clone <repository-url>
cd real-state
```

### 2. Configure environment variables
Copy the backend example file and adjust credentials, ports, and secrets.
```bash
cd backend
cp .env.example .env
```

| Variable | Description |
|----------|-------------|
| `PORT` | Port for the Express API (default `5000`). |
| `ADMIN_EMAIL` | Admin login email. |
| `ADMIN_PASSWORD` | Admin login password. |
| `JWT_SECRET` | Secret key for JWT token signing. |

### 3. Install dependencies

#### Backend
```bash
cd backend
npm install
```

#### Frontend
```bash
cd ../frontend
npm install
```

### 4. Run the development servers

#### Backend API
```bash
cd backend
npm run dev
```

#### Frontend client
```bash
cd ../frontend
npm run dev
```

The Vite dev server proxies `/api` requests to `http://localhost:5000`, so keeping both servers running enables full-stack development.

## Admin Panel Usage

1. Navigate to `http://localhost:5173/admin`.
2. Sign in using the credentials from your `.env` file.
3. Use the **Upload New Project** form to add listings. Existing projects can be edited or deleted via the action buttons next to each card.
4. The **Recent Inquiries & Appointments** list automatically surfaces the latest five entries from the Excel log.
5. Data entered through the public appointment or contact forms is appended to `backend/excel/customer_inquiries.xlsx`. Share the file or add custom export routes as needed.

## Deployment

- **Frontend**: Deploy the Vite build output (`frontend/dist`) to platforms like Vercel or Netlify.
- **Backend**: Host the Express server on Render, Railway, or AWS. Ensure the Excel directory has write permissions.
- **Environment**: Set production environment variables for admin credentials, JWT secret, and any database connections if you upgrade storage.
- **Proxy configuration**: Update the frontend API base URL (e.g., configure Axios defaults or environment variables) when deploying to production domains.

## Excel & Data Management

- All appointments and contact submissions append to `backend/excel/customer_inquiries.xlsx` under the “Inquiries” worksheet.
- Projects persist in `backend/data/projects.json` for lightweight storage. Consider migrating to MongoDB or another database for multi-user deployments.

## Contact

For design or implementation queries, reach out via **hello@dreamnest.com** or call **6351186290**.
