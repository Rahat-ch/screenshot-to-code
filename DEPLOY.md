# Deployment Guide

## Option 1: GitHub Actions + Coolify (Recommended)

Auto-deploy on every push to `main` branch.

### Setup

1. **Push to GitHub:**
```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/screenshot-to-code.git
git push -u origin main
```

2. **Create resource in Coolify:**
   - Type: Docker Compose
   - Repository: Your GitHub repo
   - Branch: main
   - Base Directory: `/`
   - Docker Compose Location: `docker-compose.yml`

3. **Add GitHub Secrets:**
   - `COOLIFY_API_TOKEN` — From Coolify → Profile → Keys & Tokens
   - `COOLIFY_RESOURCE_UUID` — From Coolify → Resource → Settings → General
   - `COOLIFY_URL` — Your Coolify instance URL (e.g., `https://coolify.rahatcodes.com`)

4. **Deploy:**
   - Push to main branch → Auto-deploys via GitHub Actions

---

## Option 2: Manual Coolify Deploy

Use the deploy script directly:

```bash
# Set environment variables
export COOLIFY_API_TOKEN="your-token"
export COOLIFY_RESOURCE_UUID="your-uuid"
export COOLIFY_URL="https://coolify.rahatcodes.com"

# Run deploy script
./scripts/deploy-coolify.sh
```

---

## Option 3: Coolify CLI (Beta)

Install the official CLI:

```bash
npm install -g @coollabs/coolify-cli

# Login
coolify login --token YOUR_TOKEN --host https://coolify.rahatcodes.com

# Deploy
coolify deploy screenshot-to-code --force
```

**Note:** CLI is still in beta. GitHub Actions method is more reliable.

---

## Option 4: Vercel (Easiest for Static)

```bash
npx vercel --prod
```

No Docker needed — Vercel handles everything.

---

## Required Secrets

| Secret | Where to Get |
|--------|--------------|
| `COOLIFY_API_TOKEN` | Coolify → Profile → Keys & Tokens → API Tokens |
| `COOLIFY_RESOURCE_UUID` | Coolify → Resource → Settings → General (UUID in resource name) |
| `COOLIFY_URL` | Your Coolify instance URL |
| `GITHUB_TOKEN` | Auto-provided by GitHub Actions |

---

## Local Docker Test

```bash
# Build and run locally
docker-compose up --build

# Or manually
docker build -t screenshot-to-code .
docker run -p 3000:3000 screenshot-to-code
```

---

## Troubleshooting

| Issue | Fix |
|-------|-----|
| 401 Unauthorized | Check `COOLIFY_API_TOKEN` is correct |
| 400 "must provide uuid" | Use `uuid=` not `uid=` in API call |
| Build fails | Check Dockerfile syntax, ensure `dist/` exists |
| Port already in use | Change port in `docker-compose.yml` |

---

## Domain Setup

1. In Coolify → Resource → Settings → General
2. Add your domain (e.g., `screenshot-to-code.rahatcodes.com`)
3. Point DNS A record to your server IP
4. Enable HTTPS (Coolify handles Let's Encrypt)

---

*Last updated: 2026-02-02*
