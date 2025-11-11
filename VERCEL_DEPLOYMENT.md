# Vercel Deployment Guide for Convex App

This guide walks you through deploying your Ad Scene Generator app to Vercel with Convex backend.

## Prerequisites

- GitHub repository is set up and pushed
- Convex account and project configured
- Vercel account

## Deployment Steps

### Step 1: Import GitHub Project to Vercel

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Click **"Add New..."** → **"Project"**
3. Import your GitHub repository: `buildtestlearn/ad-scene-generator-app`
4. **IMPORTANT**: Do NOT click "Deploy" yet. We need to configure settings first.

### Step 2: Override Build Command

In the Vercel project settings:

1. Go to **Settings** → **General** → **Build & Development Settings**
2. Override the **Build Command** with:
   ```
   npx convex deploy && vite build
   ```
   
   **Note**: The `vercel.json` file already has this configured, so you can skip this step if using the config file.

**Alternative**: You can also set this in `vercel.json` (already configured) or use the environment variable method below.

### Step 3: Generate Convex Deploy Key

1. Go to your [Convex Dashboard](https://dashboard.convex.dev)
2. Select your project (or create a production deployment)
3. Go to **Settings** → **Deploy Keys** (or **Environment Variables**)
4. Click **"Generate Deploy Key"** or **"Create Deploy Key"**
5. Copy the deploy key (it will look like a URL or token)

**Note**: The deploy key is automatically used by `npx convex deploy` when the `CONVEX_DEPLOY_KEY` environment variable is set.

### Step 4: Add Convex Deploy Key to Vercel Environment Variables

1. In Vercel project settings, go to **Settings** → **Environment Variables**
2. Add a new environment variable:
   - **Name**: `CONVEX_DEPLOY_KEY`
   - **Value**: Paste the deploy key from Step 3
   - **Environment**: Select all (Production, Preview, Development)
3. Click **"Save"**

### Step 5: Copy Environment Variables from Development to Production

#### In Convex Dashboard:

1. Go to your **Development** deployment in Convex Dashboard
2. Navigate to **Settings** → **Environment Variables**
3. Note down all environment variables (especially):
   - `CONVEX_OPENAI_API_KEY`
   - `CONVEX_OPENAI_BASE_URL` (if used)
   - Any other custom variables

4. Switch to your **Production** deployment (or create one)
5. Go to **Settings** → **Environment Variables**
6. Add all the same environment variables with the same values

#### In Vercel Dashboard:

1. Go to **Settings** → **Environment Variables**
2. Add the frontend environment variable:
   - **Name**: `VITE_CONVEX_URL`
   - **Value**: Your production Convex deployment URL
     - Format: `https://your-deployment-name.convex.cloud`
     - You can find this in Convex Dashboard → Settings → Deployment URL
   - **Environment**: Select all (Production, Preview, Development)
3. Click **"Save"**

### Step 6: Configure Vercel Build Settings

In **Settings** → **General** → **Build & Development Settings**:

- **Framework Preset**: Vite (or leave as "Other")
- **Build Command**: `npx convex deploy && vite build` (already set in vercel.json)
- **Output Directory**: `dist`
- **Install Command**: `npm install` (default)
- **Root Directory**: `./` (default)

### Step 7: Deploy

1. Go back to the **Deployments** tab
2. Click **"Redeploy"** on the latest deployment, or
3. Push a new commit to trigger a new deployment

## Verification

After deployment:

1. Check the Vercel deployment logs to ensure:
   - Convex deployment succeeded
   - Frontend build completed
   - No errors in the build process

2. Visit your Vercel deployment URL
3. Test the app functionality:
   - Sign in
   - Generate ad scenes
   - Verify API calls work

## Troubleshooting

### Build Fails with "Convex deploy key not found"

- Verify `CONVEX_DEPLOY_KEY` is set in Vercel environment variables
- Ensure the deploy key is valid and not expired
- Check that the key has the correct permissions

### Frontend can't connect to Convex

- Verify `VITE_CONVEX_URL` is set correctly in Vercel
- Check that the URL matches your production Convex deployment
- Ensure the Convex deployment is active

### Environment variables not working

- Make sure variables are set for the correct environment (Production/Preview/Development)
- Redeploy after adding new environment variables
- Check variable names match exactly (case-sensitive)

## Additional Notes

- The `vercel.json` file is already configured for SPA routing
- Convex backend is deployed automatically during the build process
- Frontend and backend are deployed together in a single Vercel deployment
- For production, consider setting up a separate Convex production deployment

## Support

For issues:
- [Convex Documentation](https://docs.convex.dev/)
- [Vercel Documentation](https://vercel.com/docs)
- [Convex Deployment Guide](https://docs.convex.dev/production/deployment)

