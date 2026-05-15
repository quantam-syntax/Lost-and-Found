// ============================================================
// db.js — localStorage database (replaces Firebase)
// Stores users, lostItems, foundItems as JSON in localStorage.
// Images are stored as base64 data URLs.
// ============================================================

// ── Helpers ───────────────────────────────────────────────────
function getTable(name) {
  try { return JSON.parse(localStorage.getItem(name) || "[]"); }
  catch { return []; }
}
function setTable(name, rows) {
  localStorage.setItem(name, JSON.stringify(rows));
}
function genId() {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 7);
}

// ── Users ─────────────────────────────────────────────────────
export const Users = {
  all() { return getTable("lf_users"); },
  findByEmail(email) { return this.all().find(u => u.email === email.toLowerCase()); },
  findById(id)       { return this.all().find(u => u.id === id); },
  create({ name, email, password }) {
    const users = this.all();
    if (this.findByEmail(email)) throw { code: "auth/email-already-in-use" };
    const user = { id: genId(), name, email: email.toLowerCase(), password, createdAt: Date.now() };
    users.push(user);
    setTable("lf_users", users);
    return user;
  },
  verify(email, password) {
    const u = this.findByEmail(email);
    if (!u)                   throw { code: "auth/user-not-found" };
    if (u.password !== password) throw { code: "auth/wrong-password" };
    return u;
  },
};

// ── Session ───────────────────────────────────────────────────
export const Session = {
  get()  { try { return JSON.parse(sessionStorage.getItem("lf_session")); } catch { return null; } },
  set(user) {
    const safe = { uid: user.id, displayName: user.name, email: user.email };
    sessionStorage.setItem("lf_session", JSON.stringify(safe));
    return safe;
  },
  clear() { sessionStorage.removeItem("lf_session"); },
};

// ── Posts ─────────────────────────────────────────────────────
const TABLES = { lost: "lf_lost", found: "lf_found" };

export const Posts = {
  all(type) { return getTable(TABLES[type]); },

  create(type, data) {
    const rows = this.all(type);
    const post = { ...data, id: genId(), createdAt: Date.now() };
    rows.unshift(post);           // newest first
    setTable(TABLES[type], rows);
    return post;
  },

  findById(type, id) {
    return this.all(type).find(p => p.id === id) || null;
  },

  update(type, id, patch) {
    const rows = this.all(type);
    const idx  = rows.findIndex(p => p.id === id);
    if (idx === -1) throw new Error("Post not found");
    rows[idx] = { ...rows[idx], ...patch, updatedAt: Date.now() };
    setTable(TABLES[type], rows);
    return rows[idx];
  },

  delete(type, id) {
    const rows = this.all(type).filter(p => p.id !== id);
    setTable(TABLES[type], rows);
  },

  query(type, filters = {}) {
    let rows = this.all(type);
    if (filters.userId)   rows = rows.filter(p => p.userId   === filters.userId);
    if (filters.category && filters.category !== "all") rows = rows.filter(p => p.category === filters.category);
    if (filters.status   && filters.status   !== "all") rows = rows.filter(p => p.status   === filters.status);
    if (filters.limit)    rows = rows.slice(0, filters.limit);
    return rows;   // already sorted newest-first from create()
  },
};

// ── Image → base64 ────────────────────────────────────────────
export function fileToBase64(file, onProgress) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onprogress = e => { if (onProgress && e.lengthComputable) onProgress(Math.round(e.loaded / e.total * 100)); };
    reader.onload     = () => { if (onProgress) onProgress(100); resolve(reader.result); };
    reader.onerror    = reject;
    reader.readAsDataURL(file);
  });
}
