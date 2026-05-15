// ============================================================
// auth.js — Authentication (localStorage, no Firebase)
// ============================================================
import { Users, Session } from "./db.js";
import { showToast, showSpinner, hideSpinner } from "./ui.js";

// ── Sign Up ───────────────────────────────────────────────────
export async function signUp(name, email, password) {
  showSpinner();
  try {
    if (!name || name.trim().length < 2)   throw { code: "auth/invalid-name" };
    if (password.length < 6)               throw { code: "auth/weak-password" };
    const user    = Users.create({ name: name.trim(), email, password });
    const session = Session.set(user);
    showToast("Account created! Welcome aboard 🎉", "success");
    return session;
  } catch (err) {
    showToast(friendlyError(err.code), "error");
    return null;
  } finally {
    hideSpinner();
  }
}

// ── Login ─────────────────────────────────────────────────────
export async function login(email, password) {
  showSpinner();
  try {
    const user    = Users.verify(email, password);
    const session = Session.set(user);
    showToast(`Welcome back, ${session.displayName}!`, "success");
    return session;
  } catch (err) {
    showToast(friendlyError(err.code), "error");
    return null;
  } finally {
    hideSpinner();
  }
}

// ── Logout ────────────────────────────────────────────────────
export function logout() {
  Session.clear();
  showToast("Logged out successfully.", "info");
  window.location.href = "login.html";
}

// ── Session Watcher ───────────────────────────────────────────
export function watchAuth(onUser, onGuest) {
  const user = Session.get();
  if (user) onUser(user);
  else if (onGuest) onGuest();
}

// ── Require Auth (redirect if not logged in) ─────────────────
export function requireAuth() {
  return new Promise((resolve) => {
    const user = Session.get();
    if (!user) {
      window.location.href = "login.html";
    } else {
      resolve(user);
    }
  });
}

// ── Human-readable error messages ─────────────────────────────
function friendlyError(code) {
  const map = {
    "auth/email-already-in-use": "This email is already registered.",
    "auth/invalid-email":        "Please enter a valid email address.",
    "auth/weak-password":        "Password must be at least 6 characters.",
    "auth/invalid-name":         "Please enter your full name (min. 2 characters).",
    "auth/user-not-found":       "No account found with this email.",
    "auth/wrong-password":       "Incorrect password. Please try again.",
  };
  return map[code] || "Something went wrong. Please try again.";
}
