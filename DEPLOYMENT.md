# Frontend Deployment Guide

This guide will help you deploy your Journal App Frontend to Vercel or Netlify.

## Prerequisites

1.  **Backend URL:** Your Spring Boot backend must be deployed and accessible via a public URL (e.g., `https://my-journal-api.herokuapp.com`).
2.  **GitHub Account:** You need a GitHub account to host your code.
3.  **Vercel or Netlify Account:** You need an account on Vercel or Netlify for deployment.

## Step 1: Push to GitHub

1.  Initialize Git (if not already done):
    ```bash
    git init
    ```

2.  Add files and commit:
    ```bash
    git add .
    git commit -m "Initial commit"
    ```

3.  Create a new repository on GitHub.
    - Go to [GitHub New Repository](https://github.com/new).
    - Name it `journal-app-frontend`.
    - Do **not** initialize with README, .gitignore, or License (we already have them).

4.  Link your local repository to GitHub:
    ```bash
    git remote add origin https://github.com/YOUR_USERNAME/journal-app-frontend.git
    git branch -M main
    git push -u origin main
    ```

## Step 2: Deploy to Vercel

1.  Go to [Vercel Dashboard](https://vercel.com/dashboard).
2.  Click **"Add New..."** -> **"Project"**.
3.  Import your `journal-app-frontend` repository.
4.  Configure the project:
    - **Framework Preset:** Vite
    - **Root Directory:** `./` (default)
    - **Environment Variables:**
        - Key: `VITE_API_URL`
        - Value: `YOUR_BACKEND_URL` (e.g., `https://my-journal-api.herokuapp.com/journal`)
5.  Click **"Deploy"**.

## Step 2 (Alternative): Deploy to Netlify

1.  Go to [Netlify Dashboard](https://app.netlify.com/).
2.  Click **"Add new site"** -> **"Import an existing project"**.
3.  Connect to GitHub and select `journal-app-frontend`.
4.  Configure the build settings:
    - **Build command:** `npm run build`
    - **Publish directory:** `dist`
5.  Click **"Show advanced"** -> **"New variable"**.
    - Key: `VITE_API_URL`
    - Value: `YOUR_BACKEND_URL`
6.  Click **"Deploy site"**.

## Step 2 (Alternative): Deploy to Render (recommended since your backend is here)

1.  Go to [Render Dashboard](https://dashboard.render.com/).
2.  Click **"New"** -> **"Static Site"**.
3.  Connect your GitHub account and select `journal-app-frontend`.
4.  Configure the settings:
    - **Build Command:** `npm run build`
    - **Publish Directory:** `dist`
5.  Click **"Advanced"** -> **"Add Environment Variable"**.
    - Key: `VITE_API_URL`
    - Value: `YOUR_BACKEND_URL` (e.g., `https://your-backend-service.onrender.com/journal`)
6.  Click **"Create Static Site"**.

## Important Notes

-   **CORS:** Ensure your backend allows requests from your deployed frontend domain. You might need to update your Spring Boot CORS configuration to allow the new frontend URL.
-   **HTTPS:** Vercel, Netlify, and Render serve via HTTPS. Ensure your backend also supports HTTPS.

## Step 3: Deploying Backend with Redis on Render

Since we added Redis caching, you need a Redis instance on Render.

1.  **Create Redis Service:**
    -   Go to [Render Dashboard](https://dashboard.render.com/).
    -   Click **"New"** -> **"Redis"** (or look for **"Key Value"**).
    -   Render often lists Redis under **"Key Value"**. Select that if "Redis" isn't explicitly shown.
    -   Name: `journal-redis`
    -   Region: Same as your backend (Singapore/Oregon etc.)
    -   Plan: Free (if available) or Starter.
    -   Click **"Create Redis"**.

2.  **Get Connection Details:**
    -   Once created, copy the **Internal Redis URL** (e.g., `redis://red-c9...:6379`).
    -   Or copy the **Host** and **Port** individually.

3.  **Update Backend Environment Variables:**
    -   Go to your **Backend Service** on Render.
    -   Click **"Environment"**.
    -   Add the following variables:
        -   `REDIS_HOST`: (Your Redis Host, e.g., `red-c9...`)
        -   `REDIS_PORT`: `6379`
        -   `REDIS_PASSWORD`: (Your Redis Password, if any)
    -   Render will verify and redeploy your backend automatically.
