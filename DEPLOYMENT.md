# 🚀 Khoj Marketplace - Vercel Deployment Guide

This guide walks you through deploying the **Khoj Buy & Sell Marketplace** (Next.js 16 frontend + Express serverless backend) to Vercel in just a few minutes.

---

## 🏗️ Architecture Overview

The repository is structured as a monorepo:
- **`frontend/`**: Next.js 16 App Router (React 19, Tailwind CSS v4, Better Auth)
- **`backend/`**: Express.js REST API with MongoDB/Mongoose (Serverless Node.js function via `api/index.js` and `vercel.json`)

Vercel deploys monorepos using **Separate Projects** pointing to the same Git repository:
1. **Backend Project**: Runs Express as a Vercel Serverless Function.
2. **Frontend Project**: Runs the Next.js application, connecting to the backend via `NEXT_PUBLIC_API_URL`.

---

## 📋 Step 1: MongoDB Atlas Preparation (Important!)

Because Vercel Serverless Functions run across dynamic cloud IPs:
1. Open your [MongoDB Atlas Dashboard](https://cloud.mongodb.com/).
2. Navigate to **Security > Network Access**.
3. Click **Add IP Address**.
4. Choose **Allow Access from Anywhere** (`0.0.0.0/0`) and click **Confirm**.
5. Ensure your database user has read/write permissions to the `Khoj` database.

---

## ⚡ Step 2: Deploy Backend to Vercel

1. Log in to [Vercel](https://vercel.com/) and click **Add New... > Project**.
2. Select your `Khoj` GitHub repository and click **Import**.
3. In the **Configure Project** screen:
   - **Project Name**: `khoj-backend` (or any name you prefer).
   - **Framework Preset**: Select **Other**.
   - **Root Directory**: Click **Edit** and select **`backend`**.
4. Expand **Environment Variables** and add the following:

| Key | Example Value | Description |
|---|---|---|
| `MONGODB_URI` | `mongodb+srv://user:pass@cluster.mongodb.net/Khoj?retryWrites=true&w=majority` | Your MongoDB Atlas connection string |
| `JWT_SECRET` | `khoj_super_secret_jwt_key_2026_marketplace` | Secret key used to sign JWTs |
| `IMGBB_API_KEY` | `8bb83ba8d6d1f4f11cebec0b39c096d0` | ImgBB API key for uploads |
| `NODE_ENV` | `production` | Production environment flag |
| `GOOGLE_CLIENT_ID` | `your_google_client_id` | (Optional) Google OAuth Client ID |
| `GOOGLE_CLIENT_SECRET` | `your_google_client_secret` | (Optional) Google OAuth Client Secret |

5. Click **Deploy**.
6. Once deployment finishes, copy your backend URL (e.g., `https://khoj-backend.vercel.app`).
   - Test by opening: `https://khoj-backend.vercel.app/api/health` in your browser. You should see `{"status":"OK"}`.

---

## 🌐 Step 3: Deploy Frontend to Vercel

1. Return to the Vercel Dashboard and click **Add New... > Project**.
2. Select the **same** `Khoj` repository and click **Import**.
3. In the **Configure Project** screen:
   - **Project Name**: `khoj` (or `khoj-frontend`).
   - **Framework Preset**: Next.js (automatically detected).
   - **Root Directory**: Click **Edit** and select **`frontend`**.
4. Expand **Environment Variables** and add the following:

| Key | Example Value | Description |
|---|---|---|
| `NEXT_PUBLIC_API_URL` | `https://khoj-backend.vercel.app/api` | **URL of your deployed backend + `/api`** |
| `NEXT_PUBLIC_APP_URL` | `https://khoj.vercel.app` | Your Vercel frontend domain |
| `BETTER_AUTH_URL` | `https://khoj.vercel.app` | Same as your frontend domain |
| `BETTER_AUTH_SECRET` | `khoj_better_auth_ultra_secret_key_2026_jwt_session` | Secret for session tokens |
| `MONGODB_URI` | `mongodb+srv://user:pass@cluster.mongodb.net/Khoj?retryWrites=true&w=majority` | Database URI for Better Auth |
| `NEXT_PUBLIC_IMGBB_API_KEY`| `8bb83ba8d6d1f4f11cebec0b39c096d0` | ImgBB key for client image upload |
| `IMGBB_API_KEY` | `8bb83ba8d6d1f4f11cebec0b39c096d0` | ImgBB key for API route upload |
| `GOOGLE_CLIENT_ID` | `your_google_client_id` | Google OAuth Client ID (if using Google login) |
| `GOOGLE_CLIENT_SECRET` | `your_google_client_secret` | Google OAuth Secret (if using Google login) |

5. Click **Deploy**.
6. Once deployed, open your site (e.g., `https://khoj.vercel.app`)!

---

## 🔑 Step 4: Update Google OAuth (If using Google Sign-in)

If you enabled Google OAuth login:
1. Go to the [Google Cloud Console Credentials](https://console.cloud.google.com/apis/credentials).
2. Edit your OAuth 2.0 Client ID.
3. Under **Authorized JavaScript origins**, add:
   - `https://your-frontend-domain.vercel.app`
4. Under **Authorized redirect URIs**, add:
   - `https://your-frontend-domain.vercel.app/api/auth/callback/google`
5. Save changes.

---

## 🛠️ Summary of Created Vercel Configuration Files

- `backend/vercel.json`: Directs all requests to the serverless entrypoint.
- `backend/api/index.js`: Serverless export for Express.
- `backend/server.js`: Serverless-ready with connection-checked request middleware and conditional listener.
- `backend/config/db.js`: Connection pooling and promise-caching for Mongoose in serverless environments.
- `frontend/next.config.ts`: Added external image domains for remote media.
- `package.json`: Root workspace configuration allowing root scripts and builds.
