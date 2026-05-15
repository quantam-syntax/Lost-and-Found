// ============================================================
// posts.js — CRUD for lost/found items (localStorage, no Firebase)
// ============================================================
import { Posts, fileToBase64 } from "./db.js";
import { showToast, showSpinner, hideSpinner } from "./ui.js";

// ── Create a new post ─────────────────────────────────────────
export async function createPost(type, data, imageFile, userId, onProgress) {
  showSpinner();
  try {
    let imageUrl = "";
    if (imageFile) {
      imageUrl = await fileToBase64(imageFile, onProgress);
    }
    const post = Posts.create(type, {
      ...data,
      imageUrl,
      userId,
      status: "open",
    });
    showToast("Post created successfully! 🎉", "success");
    return post.id;
  } catch (err) {
    console.error(err);
    showToast("Failed to create post. Please try again.", "error");
    return null;
  } finally {
    hideSpinner();
  }
}

// ── Fetch posts (with optional filters) ──────────────────────
export async function fetchPosts(type, filters = {}) {
  return Posts.query(type, filters);
}

// ── Fetch single post ─────────────────────────────────────────
export async function fetchPost(type, id) {
  return Posts.findById(type, id);
}

// ── Update post status ────────────────────────────────────────
export async function updatePostStatus(type, id, status) {
  Posts.update(type, id, { status });
  showToast(`Status updated to "${status}".`, "success");
}

// ── Update full post ──────────────────────────────────────────
export async function updatePost(type, id, data) {
  showSpinner();
  try {
    Posts.update(type, id, data);
    showToast("Post updated successfully.", "success");
    return true;
  } catch (err) {
    showToast("Failed to update post.", "error");
    return false;
  } finally {
    hideSpinner();
  }
}

// ── Delete post ───────────────────────────────────────────────
export async function deletePost(type, id) {
  showSpinner();
  try {
    Posts.delete(type, id);
    showToast("Post deleted.", "info");
    return true;
  } catch (err) {
    showToast("Failed to delete post.", "error");
    return false;
  } finally {
    hideSpinner();
  }
}

// ── Fetch recent posts for homepage ──────────────────────────
export async function fetchRecentPosts(type, count = 6) {
  return fetchPosts(type, { limit: count });
}
