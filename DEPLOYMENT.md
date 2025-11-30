# 🚀 Vercel Deployment Guide for Academere

This guide will help you deploy your PERN stack application to Vercel for free. We will deploy the **Backend** and **Frontend** as two separate projects.

## Prerequisites
- A [GitHub account](https://github.com/)
- A [Vercel account](https://vercel.com/) (Login with GitHub)
- Your code pushed to a GitHub repository

---

## Step 1: Push Code to GitHub
If you haven't already, push your code to a new GitHub repository:
1.  Create a new repository on GitHub (e.g., `academere`).
2.  Run these commands in your project folder:
    ```bash
    git init
    git add .
    git commit -m "Ready for deployment"
    git branch -M main
    git remote add origin https://github.com/[YOUR_USERNAME]/academere.git
    git push -u origin main
    ```

---

## Step 2: Deploy Backend (Server)
1.  Go to your [Vercel Dashboard](https://vercel.com/dashboard) and click **"Add New..."** -> **"Project"**.
2.  Import your `academere` repository.
3.  **Configure Project**:
    - **Project Name**: `academere-server`
    - **Framework Preset**: Select **Other** (or leave default).
    - **Root Directory**: Click "Edit" and select `server`.
4.  **Environment Variables**:
    Expand the "Environment Variables" section and add:
    - `DATABASE_URL`: (Paste your Supabase Pooler connection string)
    - `JWT_SECRET`: (Paste your secret or generate a new one)
    - `NODE_ENV`: `production`
5.  Click **Deploy**.
6.  Wait for deployment to finish.
7.  **Copy the Domain**: Once done, copy the URL (e.g., `https://academere-server.vercel.app`). **You will need this for the frontend.**

---

## Step 3: Deploy Frontend (Client)
1.  Go back to Vercel Dashboard and click **"Add New..."** -> **"Project"**.
2.  Import the **same** `academere` repository again.
3.  **Configure Project**:
    - **Project Name**: `academere-client`
    - **Framework Preset**: **Vite** (should be detected automatically).
    - **Root Directory**: Click "Edit" and select `client`.
4.  **Environment Variables**:
    - `VITE_API_URL`: Paste the Backend URL you copied (e.g., `https://academere-server.vercel.app`).
5.  Click **Deploy**.

---

## 🎉 Done!
Your application is now live!
- **Frontend**: `https://academere-client.vercel.app`
- **Backend**: `https://academere-server.vercel.app`
