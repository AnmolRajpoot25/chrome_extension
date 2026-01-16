import { getActiveTabUrl } from "./utils.js";

const addNewBookmark = (bookmarksElement, bookmark) => {
  const newBookmarkElement = document.createElement("div");
  const bookmarkTitleElement = document.createElement("div");
  const controlsElement = document.createElement("div");

  newBookmarkElement.id = "bookmark-" + bookmark.time;
  newBookmarkElement.className = "bookmark";
  newBookmarkElement.setAttribute("timestamp", bookmark.time);

  bookmarkTitleElement.className = "bookmark-title";
  bookmarkTitleElement.innerText = bookmark.desc;

  controlsElement.className = "bookmark-controls";

  newBookmarkElement.appendChild(bookmarkTitleElement);
  newBookmarkElement.appendChild(controlsElement);
  bookmarksElement.appendChild(newBookmarkElement);

  setBookmarkAttributes("play", onPlay, controlsElement);
  setBookmarkAttributes("delete", onDelete, controlsElement);
};

const viewBookmarks = (currentBookmarks = []) => {
  const bookmarksElement = document.getElementById("bookmarks");
  bookmarksElement.innerHTML = "";

  if (currentBookmarks.length) {
    currentBookmarks.forEach(bookmark =>
      addNewBookmark(bookmarksElement, bookmark)
    );
  } else {
    bookmarksElement.innerHTML = `<i>No bookmarks to show</i>`;
  }
};

const onPlay = async e => {
  const bookmarkTime = e.target.closest(".bookmark").getAttribute("timestamp");
  const activeTab = await getActiveTabUrl();

  chrome.tabs.sendMessage(activeTab.id, {
    type: "PLAY",
    value: bookmarkTime,
  });
};

const onDelete = async e => {
  const bookmarkTime = e.target.closest(".bookmark").getAttribute("timestamp");
  const activeTab = await getActiveTabUrl();

  document.getElementById("bookmark-" + bookmarkTime)?.remove();

  chrome.tabs.sendMessage(activeTab.id, {
    type: "DELETE",
    value: bookmarkTime,
  });
};

const setBookmarkAttributes = (src, eventListener, parent) => {
  const controlElement = document.createElement("img");
  controlElement.src = "assets/" + src + ".png";
  controlElement.title = src;
  controlElement.addEventListener("click", eventListener);
  parent.appendChild(controlElement);
};

document.addEventListener("DOMContentLoaded", async () => {
  const activeTab = await getActiveTabUrl();
  const url = new URL(activeTab.url);
  const currentVideo = url.searchParams.get("v");

  if (url.hostname.includes("youtube.com") && currentVideo) {
    chrome.storage.sync.get([currentVideo], data => {
      const bookmarks = data[currentVideo]
        ? JSON.parse(data[currentVideo])
        : [];
      viewBookmarks(bookmarks);
    });
  } else {
    document.getElementsByClassName("container")[0].innerHTML =
      `<div class="title">Not a YouTube video</div>`;
  }
});
