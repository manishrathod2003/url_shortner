# URL Shortener (MERN)

A simple URL shortener built with **MongoDB + Express + React + Node.js**.

## Features
- Shorten long URLs
- Visit short URL to redirect to original
- (Bonus) Admin endpoint to list all links with click counts

## Quick Start (Local)

### Backend
```bash
cd backend
cp .env.example .env
# Fill MONGO_URI in .env
npm install
npm run dev
```

### Frontend
```bash
cd frontend
npm install
# Optionally set VITE_API_BASE in frontend .env to your backend URL
npm run dev
```

Open http://localhost:5173 and shorten URLs. Short links will look like `http://localhost:5000/abc123`.

## API
- `POST /api/shorten` → `{ originalUrl }` → returns `{ shortUrl, shortCode }`
- `GET /:shortcode` → redirects to original
- `GET /api/all` → list all (bonus)
```

## Deploy
- Host backend on Render/Railway and set `BASE_URL` to the backend domain.
- Host frontend on Vercel; set `VITE_API_BASE` env var to backend URL.
```