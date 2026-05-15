# Lost & Found — Web Application

A community-driven Lost & Found platform. **No backend, no cloud, no accounts needed anywhere.** All data is stored in your browser's `localStorage`.

---

## 📁 Project Structure

```
lost-and-found/
├── index.html          — Homepage with hero, features, recent items
├── login.html          — Login / Sign Up page
├── lost.html           — Browse lost items
├── found.html          — Browse found items
├── post.html           — Post a new item (or edit existing)
├── dashboard.html      — User dashboard (my posts, stats)
├── css/
│   └── style.css       — Dark futuristic UI styles
└── js/
    ├── db.js           — localStorage database layer (users + posts)
    ├── auth.js         — Auth helpers (login, signup, logout)
    ├── posts.js        — Post CRUD + base64 image storage
    ├── search.js       — Search/filter + item card rendering
    ├── dashboard.js    — Dashboard logic
    └── ui.js           — Toast, spinner, badges, helpers
```

---

## 🚀 Run Locally

No installation. No config. Just serve the files:

```bash
cd lost-and-found

# Python (built-in — recommended)
python -m http.server 8000

# OR Node.js
npx serve .
```

Then open **http://localhost:8000**

> You must serve over HTTP (not open as file://) because ES modules require it.

---

## 💾 How Data is Stored

- User accounts → localStorage (JSON)
- Posts         → localStorage (JSON arrays, one per type)
- Images        → localStorage (base64 data URLs — keep photos under 2MB)
- Session       → sessionStorage (cleared when the tab closes)

Data persists across page refreshes but is per-browser/per-device.
Clearing browser storage resets everything.

---

## ✨ Features

- User authentication — sign up, login, logout (all local, no server)
- Post lost/found items with photo, category, location, date
- Search & filter by keyword, category, status, sort order
- Dashboard — view/edit/delete your posts, update status
- Status tracking: Open → Claimed → Reunited
- Dark futuristic UI — glassmorphism, animated orbs, Orbitron font
- Fully responsive — mobile-first design
- Zero dependencies — no npm, no build step, no cloud

---

## 🛠️ Tech Stack

- Frontend: Vanilla HTML5, CSS3, Tailwind CSS (CDN)
- Storage: Browser localStorage / sessionStorage
- Fonts: Orbitron + Outfit via Google Fonts (CDN)
- No Firebase, no backend, no build step required
