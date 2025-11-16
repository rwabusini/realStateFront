# Property Manager – Frontend

A responsive property management dashboard built with React, Vite, and Redux Toolkit. Connects to a Laravel 12 backend API for authentication and property data.

## ✨ Features

- JWT-based login/logout
- Protected dashboard route
- Property listing with real-time data
- Clean, responsive UI
- Redux Toolkit for state management
- Vite-powered fast development

## 🛠 Tech Stack

- React 18 + Vite
- React Router v6
- Redux Toolkit
- Axios
- CSS (inline styles)

## 📦 Prerequisites

- [Node.js](https://nodejs.org/) v18+
- npm or yarn
- Running Laravel backend API at `http://localhost:8000`  
  → [Property Manager Backend](https://github.com/your-username/property-manager-backend)

## 🚀 Setup

1. Clone and install:
   ```bash
   git clone https://github.com/your-username/property-manager-frontend.git
   cd property-manager-frontend
   npm install


2. Start dev server:
```bash
npm run dev

```
Open: http://localhost:5173

⚙️ Configuration
If your Laravel backend runs on a different URL, create .env in the root:

``env
VITE_API_BASE_URL=http://localhost:8000/api

Then update your API service to use import.meta.env.VITE_API_BASE_URL.

📤 Deployment
Build for production:

```bash
npm run build
```
Deploy to Vercel, Netlify, or GitHub Pages.