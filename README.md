# GrowBot — meet Bud 🌱

A mobile-first plant care companion. Each plant in your garden gets a nickname and a chat with **Bud**, a warm, observant gardening AI powered by Claude.

Built from a Conversation Design Canvas, with a 10-flower database and full voice I/O.

---

## What's in here

```
growbot-app/
├── src/
│   ├── main.jsx                    React entry point
│   ├── index.css                   Tailwind base
│   └── components/GrowBot.jsx      The whole app (home + chat + voice)
├── index.html                      HTML shell
├── vite.config.js                  Dev server + Anthropic API proxy
├── tailwind.config.js              Tailwind setup
├── postcss.config.js               PostCSS for Tailwind
├── package.json                    Dependencies
├── .env.example                    Template for your API key
└── .gitignore                      Keeps secrets and node_modules out of git
```

---

## 1. Run it locally (5 minutes)

### Prerequisites

You need **Node.js 18 or newer**. Check with:

```bash
node --version
```

If you don't have it, download from [nodejs.org](https://nodejs.org) (pick the LTS version).

### Setup

Open a terminal in this folder and run:

```bash
# Install dependencies (~30 seconds)
npm install

# Copy the env template and add your API key
cp .env.example .env
```

Now open `.env` in any text editor and replace the placeholder with your real key.

**Get an API key:** Go to [console.anthropic.com](https://console.anthropic.com/settings/keys), sign in, click "Create Key." You'll need to add a few dollars of credit at [console.anthropic.com/settings/billing](https://console.anthropic.com/settings/billing) — Claude conversations cost roughly $0.01–0.05 each, so $5 lasts a long demo.

### Start the app

```bash
npm run dev
```

The app opens at **http://localhost:5173**. Edit any file in `src/` and the browser updates instantly.

---

## 2. Push to GitHub (3 minutes)

### One-time setup

If you've never used git before:

```bash
git config --global user.name "Your Name"
git config --global user.email "your@email.com"
```

### Create the repo

1. Go to [github.com/new](https://github.com/new)
2. Name it `growbot-app` (or whatever you want)
3. Leave it empty — **don't** check "add README" or "add .gitignore" (you already have those)
4. Click "Create repository"

GitHub will show you a page with commands. Copy the **HTTPS URL** at the top (looks like `https://github.com/yourname/growbot-app.git`).

### Push your code

In your terminal, in the project folder:

```bash
git init
git add .
git commit -m "Initial commit: GrowBot with Bud"
git branch -M main
git remote add origin https://github.com/yourname/growbot-app.git
git push -u origin main
```

Done. Refresh your GitHub repo page and you'll see all your code there.

### Whenever you make changes after that

```bash
git add .
git commit -m "Made the cards bigger"
git push
```

Your teammate can pull your changes with:

```bash
git pull
```

And clone the repo fresh on their own machine with:

```bash
git clone https://github.com/yourname/growbot-app.git
cd growbot-app
npm install
cp .env.example .env   # then add their own API key
npm run dev
```

---

## 3. Deploy to a real URL (5 minutes, optional but cool for demos)

This gives you a real shareable link like `growbot-bud.vercel.app` to show in your presentation.

1. Go to [vercel.com](https://vercel.com) and sign in with GitHub
2. Click "Add New Project" → import your `growbot-app` repo
3. Vercel auto-detects it's a Vite project — leave all settings default
4. **Important:** before clicking "Deploy", expand "Environment Variables" and add:
   - Name: `VITE_ANTHROPIC_API_KEY`
   - Value: your API key
5. Click "Deploy"

Two minutes later you have a live URL.

⚠️ **Caveat for the deployed version:** the proxy in `vite.config.js` only works in local dev. For production, you'd need a tiny serverless function (Vercel calls these "API routes") to forward the API call. If you want me to add that, ask. For demos, running locally with `npm run dev` is usually easier anyway.

---

## 4. Vibe-code it with Cursor or VS Code

### Option A: Cursor (recommended for AI-assisted editing)

1. Download [cursor.sh](https://cursor.sh)
2. Open this project folder
3. Press `Cmd+L` (Mac) or `Ctrl+L` (Windows) to open the AI chat
4. Ask things like "make the home screen darker" or "add a fifth quick-tap chip for fertilizing"
5. Cursor edits files directly — review the diff and accept

### Option B: VS Code + Claude

1. Download [code.visualstudio.com](https://code.visualstudio.com)
2. Install the "Claude" extension from the marketplace
3. Same flow as above

Either way, you tell the AI what to change, it edits the files, you save, the dev server live-reloads, you see the change in 50ms.

---

## How Bud works (one-paragraph version)

Each flower's full metadata (water, sun, soil, repotting, what to watch for, signature tip) gets injected into Bud's system prompt before every conversation. So when you ask "should I water Rosie?", Bud is grounded in the real data for that specific rose. The personality (warm, leads with the answer, asks one question at a time, admits uncertainty) comes straight from the Conversation Design Canvas.

Voice in uses the browser's built-in `SpeechRecognition` API. Voice out uses `speechSynthesis`. Zero external dependencies for either. Both work in Chrome, Edge, and Safari; Firefox has spotty support for `SpeechRecognition`.

---

## Troubleshooting

**"Bud needs an API key to think"** — your `.env` file is missing or the key is wrong. Make sure the file is named exactly `.env` (not `.env.txt`), the variable is named exactly `VITE_ANTHROPIC_API_KEY`, and you restarted `npm run dev` after editing it.

**Mic button doesn't do anything** — your browser blocked microphone access. Click the lock icon in the address bar and allow mic. Refresh the page.

**CORS errors in the console** — make sure you're using `npm run dev` (not opening `index.html` directly). The Vite proxy is what makes the API call work.

**API returns 401** — the API key is invalid or your Anthropic account has no credits. Check both at [console.anthropic.com](https://console.anthropic.com).
