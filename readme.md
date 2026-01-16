# 📌 My YT Bookmarks – Chrome Extension

A **Chrome Extension (Manifest V3)** that lets you **save, view, play, and delete timestamp bookmarks on YouTube videos**. Perfect for tutorials, lectures, podcasts, and long videos where you want to jump back to important moments instantly.

---

## 🚀 Features

* ⏱️ Save bookmarks at the **current YouTube timestamp**
* ▶️ Click bookmarks to **jump to that exact time**
* 🗑️ Delete bookmarks easily
* 💾 Bookmarks are **stored per video**
* ☁️ Uses Chrome Sync Storage (bookmarks sync across devices logged into the same Chrome account)
* 🧩 Clean popup UI for managing bookmarks

---

## 🧱 Tech Stack (with full justification)

### 1️⃣ JavaScript (ES6+)

**Why?**

* Native language for browser extensions
* Supports modern features like `async/await`, modules, arrow functions
* Direct access to Chrome Extension APIs

**Where used:**

* `background.js` – tab monitoring
* `contentScript.js` – YouTube DOM interaction
* `popup.js` – popup UI logic
* `utils.js` – shared helper functions

---

### 2️⃣ Chrome Extensions API (Manifest V3)

**Why?**

* Official and secure way to extend Chrome
* Event-driven (better performance)
* Required for publishing to Chrome Web Store

**Key APIs used:**

* `chrome.tabs` – detect active YouTube tab
* `chrome.runtime` – message passing
* `chrome.storage.sync` – cloud-based bookmark storage
* `chrome.scripting` – content script injection (via MV3)

---

### 3️⃣ Manifest V3

**Why MV3?**

* Mandatory for new Chrome extensions
* Better security model (no persistent background pages)
* Uses service workers instead of background pages

**Used for:**

* Declaring permissions
* Registering background service worker
* Injecting content scripts
* Defining popup UI

---

### 4️⃣ HTML

**Why?**

* Lightweight structure for extension popup
* No frameworks needed for small UI

**Used in:**

* `popup.html` – bookmark list UI

---

### 5️⃣ CSS

**Why?**

* Simple styling without external libraries
* Keeps extension lightweight and fast

**Used in:**

* `popup.css` – popup layout and controls styling

---

### 6️⃣ Chrome Sync Storage

**Why?**

* Persists data even after browser restart
* Automatically syncs across devices
* Better than `localStorage` for extensions

**Used for:**

* Storing bookmarks per video ID

---

## 📂 Project Structure

```
chrome_extension/
│
├── manifest.json          # Extension configuration (MV3)
├── background.js          # Detects YouTube video changes
├── contentScript.js       # Injected into YouTube pages
├── popup.html             # Popup UI structure
├── popup.css              # Popup styling
├── popup.js               # Popup logic & messaging
├── utils.js               # Shared helper functions
├── readme.md              # Documentation
│
└── assets/                # Icons and UI images
    ├── ext-icon.png
    ├── bookmark.png
    ├── play.png
    ├── delete.png
    └── save.png
```

---

## ⚙️ How It Works (Architecture)

1. **Background Script**

   * Listens for tab URL changes
   * Detects when a new YouTube video is opened
   * Sends the video ID to the content script

2. **Content Script**

   * Injected into YouTube pages
   * Adds a bookmark button to the YouTube player
   * Saves timestamps to Chrome storage
   * Listens for PLAY / DELETE commands

3. **Popup**

   * Fetches bookmarks for the current video
   * Displays them in a list
   * Allows play & delete actions

4. **Storage**

   * Uses video ID as the key
   * Stores bookmarks as sorted timestamp arrays

---

## ▶️ How to Run the Project

### Step 1: Open Chrome Extensions

```
chrome://extensions
```

### Step 2: Enable Developer Mode

Toggle **Developer mode** (top-right)

### Step 3: Load the Extension

1. Click **Load unpacked**
2. Select the `chrome_extension` folder

### Step 4: Test

1. Open YouTube
2. Play a video
3. Click the 📌 bookmark button
4. Open extension popup to manage bookmarks

---

## 🧪 Debugging Guide

* **Content Script Logs:**

  * Open YouTube → `F12` → Console

* **Background Script Logs:**

  * `chrome://extensions` → Service Worker → Inspect

* **Popup Logs:**

  * Right-click popup → Inspect

---

## ❌ Common Mistakes

* Running files with `node` ❌
* Wrong `assets/` folder name ❌
* Forgetting to reload extension after changes ❌
* Case-sensitive import/export mismatches ❌

---

## 🔮 Future Enhancements

* ✏️ Rename bookmarks
* 📤 Export / import bookmarks
* 🎯 Keyboard shortcuts
* 🌙 Dark mode popup
* 🧠 AI-based smart bookmarks

---

## 📜 License

This project is open-source and free to use for learning and personal projects.

---

## 🙌 Author

Built with ❤️ to make YouTube learning more productive.

Happy bookmarking 🚀
