# Vercel Deployment Checklist

## ✅ Validated Steps

### Step 1: Import GitHub Project (DON'T Deploy Yet) ✅
- [x] Go to Vercel Dashboard → Add New Project
- [x] Import repository: `buildtestlearn/ad-scene-generator-app`
- [x] **DO NOT click Deploy** - configure settings first

### Step 2: Override Build Command ✅
- [x] Build command configured in `vercel.json`: `npx convex deploy && vite build`
- [x] This ensures Convex deploys first, then frontend builds
- [x] Alternative: Can override in Vercel UI if needed

### Step 3: Generate Convex Deploy Key ✅
- [ ] Go to [Convex Dashboard](https://dashboard.convex.dev)
- [ ] Select your project
- [ ] Navigate to **Settings** → **Deploy Keys**
- [ ] Click **"Generate Production Deploy Key"**
- [ ] Copy the deploy key

### Step 4: Add Deploy Key to Vercel Environment Variables ✅
- [ ] In Vercel project: **Settings** → **Environment Variables**
- [ ] Add variable:
  - **Name**: `CONVEX_DEPLOY_KEY`
  - **Value**: [Paste deploy key from Step 3]
  - **Environment**: Production (or all environments)
- [ ] Click **Save**

### Step 5: Copy Environment Variables from Dev to Production ✅
- [ ] In Convex Dashboard → Development deployment:
  - [ ] Note all environment variables:
    - `CONVEX_OPENAI_API_KEY`
    - `CONVEX_OPENAI_BASE_URL` (if used)
    - Any other custom variables
- [ ] In Convex Dashboard → Production deployment:
  - [ ] Add all the same environment variables
- [ ] In Vercel → Environment Variables:
  - [ ] Add `VITE_CONVEX_URL` with production Convex URL
  - [ ] Format: `https://your-deployment-name.convex.cloud`

## Configuration Files Created

✅ `vercel.json` - Vercel configuration with build command
✅ `VERCEL_DEPLOYMENT.md` - Detailed deployment guide
✅ `package.json` - Updated with build scripts

## Quick Reference

**Build Command**: `npx convex deploy && vite build`
**Output Directory**: `dist`
**Framework**: Vite
**Required Environment Variables**:
- `CONVEX_DEPLOY_KEY` (in Vercel)
- `VITE_CONVEX_URL` (in Vercel)
- `CONVEX_OPENAI_API_KEY` (in Convex Dashboard - Production)
- `CONVEX_OPENAI_BASE_URL` (in Convex Dashboard - Production, if used)

## Next Steps

1. Complete Steps 3-5 above
2. Click **Deploy** in Vercel
3. Monitor build logs for any errors
4. Test the deployed application

## Troubleshooting

If build fails:
- Verify `CONVEX_DEPLOY_KEY` is set correctly
- Check Convex deployment is active
- Ensure `VITE_CONVEX_URL` points to production deployment
- Review build logs in Vercel

