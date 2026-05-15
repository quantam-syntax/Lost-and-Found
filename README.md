# Lost & Found — Web Application

A community-driven Lost & Found platform built with vanilla HTML/CSS/JS and Firebase.

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
    ├── firebase.js     — Firebase config & exports
    ├── auth.js         — Auth helpers (login, signup, logout)
    ├── posts.js        — Firestore CRUD + image upload
    ├── search.js       — Search/filter + item card rendering
    ├── dashboard.js    — Dashboard logic
    └── ui.js           — Toast, spinner, badges, helpers
```

---

## 🚀 Setup


## 🖥️ Run Locally

```bash
cd lost-and-found

# Python (built-in)
python -m http.server 8000

# OR with Node.js
npx serve .
```

Then open [http://localhost:8000](http://localhost:8000)


##  Features

- **User authentication** — Email/password sign up & login
- **Post lost/found items** — With photo upload, category, location, date
- **Search & filter** — By keyword, category, status, sort order
- **Dashboard** — View/edit/delete your posts, update status
- **Status tracking** — Open → Claimed → Reunited
- **Fully responsive** — Mobile-first design

---

##  Tech Stack

- **Frontend:** Vanilla HTML5, CSS3, Tailwind CSS (CDN)
- **Backend:** Firebase (Auth, Firestore, Storage)
- **Fonts:** Orbitron (display), Outfit (body) via Google Fonts
- **No build step required** — pure ES modules
