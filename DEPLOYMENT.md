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

## Important Notes

-   **CORS:** Ensure your backend allows requests from your deployed frontend domain. You might need to update your Spring Boot CORS configuration to allow the new Vercel/Netlify URL.
-   **HTTPS:** Vercel and Netlify serve via HTTPS. Ensure your backend also supports HTTPS if possible, or you might run into mixed content issues.
