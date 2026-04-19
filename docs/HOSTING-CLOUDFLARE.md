# Hosting this Next.js + MongoDB portfolio on Cloudflare

You previously hosted a **React** app on Cloudflare (often **Pages** static + **Workers** for APIs). This project is **Next.js 16** with **App Router**, **Route Handlers** (`/api/portfolio`, `/api/login`, `/api/upload`), and **MongoDB** via Mongoose — that behaves like a **small full-stack Node app**, not a pure static export.

Below are **practical options** and the steps that usually work.

---

## Option A — Cloudflare Pages + `@cloudflare/next-on-pages` (all-in-one on Cloudflare)

Cloudflare’s official path for Next.js on Pages uses [**next-on-pages**](https://developers.cloudflare.com/pages/framework-guides/nextjs/ssr/get-started/), which compiles your app for the **Workers** runtime.

### 1. Prerequisites

- Cloudflare account, repo on GitHub/GitLab.
- **MongoDB Atlas** (or other Mongo) with:
  - **Network access** allowing Cloudflare’s egress IPs is **not** trivial to list; prefer **Atlas → Network Access → Allow access from anywhere (0.0.0.0/0)** for a personal portfolio *only if* you use strong auth, **or** use a **private** setup (Option B).
- Build must succeed with the adapter (some Node-only APIs are unsupported on the Edge).

### 2. Install the adapter (in your repo)

Follow the current Cloudflare guide for your Next version. Typically:

```bash
npm install --save-dev @cloudflare/next-on-pages wrangler
```

Configure `wrangler.toml` / Pages project as in the guide, then build with their prescribed script (often `npx @cloudflare/next-on-pages` after `next build`).

### 3. Environment variables on Cloudflare Pages

In **Pages → your project → Settings → Environment variables** (Production and Preview), set:

| Variable | Notes |
|----------|--------|
| `MONGO_URI` | Atlas SRV connection string (mark **secret**). |
| `ADMIN_USER` | Admin username. |
| `ADMIN_PASS` | Admin password (**secret**). |
| `NEXT_PUBLIC_EMAILJS_*` | Only if you use EmailJS in the browser. |

**Important:** `Mongoose` + long-lived TCP to MongoDB is **not** the same as a traditional Node server. Compatibility with the **Edge** runtime varies by driver version and Cloudflare product. If builds or runtime fail on DB connection, use **Option B**.

### 4. File uploads (`/api/upload`)

The included upload route writes to **`public/uploads/`**. On **Pages**, the filesystem is **read-only** at runtime except ephemeral `/tmp` patterns — **do not rely on local disk uploads in production**. For production:

- Put images in **R2**, **Cloudflare Images**, or another object store, **or**
- Paste **external URLs** / paths to files you deploy with the repo.

### 5. Connect domain & Worker routes

- **Pages** custom domain: **Pages → Custom domains**.
- If you use a **Worker** in front for routing/caching, point DNS per Cloudflare’s docs and keep **Pages** as the deployment target for the Next app unless you fully migrate to Workers-only.

---

## Option B — Split stack (recommended if Edge + Mongo is painful)

Keep **Cloudflare Pages** for the **static / edge** parts, and run **API + Mongo** where Node is fully supported:

1. **Deploy the same Next app** to **Vercel**, **Railway**, **Render**, or a **VPS** with Node 20+.
2. Set `MONGO_URI`, `ADMIN_*`, and EmailJS env vars there.
3. On **Cloudflare**, either:
   - **Proxy** `yourdomain.com` to that host (Worker reverse proxy), **or**
   - Host only **marketing/static** on Pages and set `NEXT_PUBLIC_API_URL` (would require small code changes to point `fetch` to the external API).

This is the most **predictable** setup for **Mongoose + MongoDB** today.

---

## Option C — Static export (no Mongo on the edge)

`next export` / `output: 'export'` **removes** server routes — you would **lose** `/api/portfolio`, Admin save, and login unless you replace them with **Workers + D1/KV** or an external API. **Not** a drop-in for this repo as-is.

---

## Checklist before going live

1. **Secrets:** Never commit `.env`. Use Cloudflare (or host) secret storage for `MONGO_URI`, `ADMIN_PASS`.
2. **Atlas:** User with **read/write** on your DB; IP allowlist compatible with your host.
3. **HTTPS:** Enforced by Cloudflare when orange-cloud proxied.
4. **Admin:** `/admin` is not linked on the public site — bookmark it; consider **extra auth** (2FA provider, IP allowlist in Cloudflare) for production.
5. **EmailJS:** Template fields must match `ContactPanel` (`from_name`, `from_email`, `subject`, `message`).
6. **Build locally:** `npm run build` must pass before CI deploy.

---

## Summary

| Goal | Suggestion |
|------|------------|
| Stay entirely on Cloudflare | Try **Pages + next-on-pages**; validate **Mongo** in preview; have a fallback (Option B). |
| Least friction with Mongo + uploads | **Vercel/Railway/Render** for this Next app, Cloudflare for DNS/CDN only (Option B). |
| You already use a Worker | You can put **only** API routes in a Worker and keep Next static — requires **refactor** of `fetch` URLs. |

For the **latest** Cloudflare Next.js steps, always cross-check: [Cloudflare Pages — Next.js](https://developers.cloudflare.com/pages/framework-guides/nextjs/).
