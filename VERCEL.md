# Deploying to Vercel

## Fixing 404 on deploy

If you see **404 Page Not Found** when opening your Vercel URL (especially after the root redirects to `/dashboard`), Vercel is likely building from the wrong directory.

### Set the Root Directory

1. Open your project on [Vercel](https://vercel.com).
2. Go to **Settings** → **General**.
3. Under **Root Directory**, click **Edit**.
4. Set it to **`my-app`** (the folder that contains `package.json` and the `app/` directory).
5. Click **Save**.
6. Redeploy: **Deployments** → … on the latest deployment → **Redeploy**.

Vercel will then run `npm install` and `npm run build` inside `my-app`, so routes like `/`, `/dashboard`, `/roadmap`, etc. are built correctly.

### If your repo root is already the app

If your GitHub repo root already contains `package.json` and the `app/` folder (no `my-app` parent folder), leave **Root Directory** blank.
