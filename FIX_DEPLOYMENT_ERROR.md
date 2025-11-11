# Fix: Missing OpenAI API Key Error

## Error Message
```
Failed to analyze adScenes.js: Uncaught Error: Missing credentials. 
Please pass an `apiKey`, or set the `OPENAI_API_KEY` environment variable.
```

## Root Cause
The OpenAI client in `convex/adScenes.ts` is initialized at module load time. During Convex deployment analysis, it requires the `CONVEX_OPENAI_API_KEY` environment variable to be set in the **production deployment**.

## Solution (Step-by-Step)

### Step 1: Get Your OpenAI API Key
1. If you don't have one, get it from your development Convex deployment:
   - Go to [Convex Dashboard](https://dashboard.convex.dev)
   - Select your **Development** deployment
   - Go to **Settings** → **Environment Variables**
   - Copy the value of `CONVEX_OPENAI_API_KEY`

### Step 2: Add Environment Variables to Production Deployment
1. Go to [Convex Dashboard](https://dashboard.convex.dev)
2. Select your **Production** deployment
   - Your production deployment appears to be: `laudable-eagle-651`
   - You can see this in the error log: `Deploying to https://laudable-eagle-651.convex.cloud`
3. Navigate to **Settings** → **Environment Variables**
4. Click **"Add Variable"** or **"Add Environment Variable"**
5. Add the following variables:

   **Variable 1:**
   - **Name**: `CONVEX_OPENAI_API_KEY`
   - **Value**: [Paste your OpenAI API key from development]
   - Click **Save**

   **Variable 2 (if you're using a custom endpoint):**
   - **Name**: `CONVEX_OPENAI_BASE_URL`
   - **Value**: [Your custom OpenAI base URL, or leave empty for default]
   - Click **Save**

### Step 3: Verify Variables Are Set
1. In the Convex Dashboard, confirm both variables are listed
2. Make sure they're set for the **Production** deployment (not Development)

### Step 4: Redeploy in Vercel
1. Go to your [Vercel Dashboard](https://vercel.com/dashboard)
2. Select your project
3. Go to **Deployments** tab
4. Click the **"..."** menu on the failed deployment
5. Click **"Redeploy"**
   - OR
6. Push a new commit to trigger a new deployment

## Verification

After redeploying, check the build logs. You should see:
- ✅ `Schema validation complete.`
- ✅ `Analyzing and deploying source code...`
- ✅ `Deployment successful` (or similar success message)
- ✅ Frontend build completes successfully

## Quick Checklist

- [ ] OpenAI API key copied from development deployment
- [ ] `CONVEX_OPENAI_API_KEY` added to **Production** deployment in Convex Dashboard
- [ ] `CONVEX_OPENAI_BASE_URL` added (if using custom endpoint)
- [ ] Variables saved in Convex Dashboard
- [ ] Redeployed in Vercel

## Alternative: Check Development Deployment

If you're not sure what your OpenAI API key is:
1. Go to Convex Dashboard → Development deployment
2. Settings → Environment Variables
3. Check if `CONVEX_OPENAI_API_KEY` exists
4. If it doesn't exist there either, you'll need to:
   - Get an OpenAI API key from [OpenAI Platform](https://platform.openai.com/api-keys)
   - Add it to both Development and Production deployments

## Still Having Issues?

If the error persists after adding the variables:
1. Double-check the variable name is exactly: `CONVEX_OPENAI_API_KEY` (case-sensitive)
2. Verify you're adding it to the **Production** deployment, not Development
3. Wait a few seconds after saving, then redeploy
4. Check the Convex Dashboard for any deployment errors
5. Verify your OpenAI API key is valid and has credits/quota

