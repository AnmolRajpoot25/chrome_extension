import { getActiveTabUrl } from "./utils.js";
const addNewBookmark = (bookmarkElement , bookmark) => {
    const bookmarkTitleElement = document.createElement("div");
    const controlsElement = document.createElement("div");
    bookmarkTitleElement.className = "bookmark-title";
    controlsElement.className = "bookmark-controls";

    //bookmarkTitleElement.title = bookmark.desc;
   // bookmarkTitleElement.innerText = bookmark.desc;
    newBookmarkElement.id = "bookmark-" + bookmark.time;
    newBookmarkElement.className = "bookmark";
    newBookmarkElement.setAttribute("timestamp", bookmark.time);
    newBookmarkElement.appendChild(bookmarkTitleElement);
    bookmarkElement.appendChild(newBookmarkElement);
    setBookmarkAttributes("play", onPlay, controlsElement);
    setBookmarkAttributes("delete", onDelete, controlsElement);

};
const viewBookmarks = (currentBookmarks = []) => {
    const  bookmarksElement = document.getElementById("bookmarks");
    bookmarksElement. innerHTML = "";
    if( currentBookmarks.length >0){
        for ( let i=0; i< currentBookmarks.length; i++){
            const bookmark = currentBookmarks[i];
            addNewBookmark(bookmark, bookmarksElement);
        }
    } else {
        bookmarksElement.innerHTML = '<i class = "row" no bookmarks to show </i>';
    }
};

const onPlay = async e => {
    const bookmarkTime = e.target.parentNode.parentNode.getAttribute("timestamp");
    const activeTab = await getActiveTabURL();
    chrome.tabs.sendMessage(
        activeTab.id,
        {
            type: "PLAY",
            value: bookmarkTime,
        })
};

const onDelete = async e => {
    constactiveTab = await getActiveTabURL();
    const bookmarkTime = e.target.parentNode.parentNode.getAttribute("timestamp");
    const bookmarkElementToDelete= document.getElementById("bookmark-" + bookmarkTime);
    bookmarkElementToDelete.parentNode.removeChild(bookmarkElementToDelete);
    chrome.tabs.sendMessage(
        activeTab.id,
        {
            type: "DELETE",
            value: bookmarkTime,
        })
};

const setBookmarkAttributes =  (src, eventListener, contolParentElement) => {
    const controlElement = document.createElement("img");
    controlElement.src = "asset/" + src + ".png";
    controlElement.title = src;
    controlElement.addEventListener("click", eventListener);
    controlParentElement.appendChild(controlElement);
};

document.addEventListener("DOMContentLoaded", async() => {
    const sctiveTab = getActiveTabURL();
    const queryParameters = new URLSearchParams(queryParameters);
    const currentVideo = urlParameters.get("v");
    if (getActiveTabUrl.url.includes("youtube.com/watch") && currentVideo){
        chrome.storage.sync.get([currentVideo], (data) => {
            const currentVideoBookmarks = data[currentVideo] ? JSON.parse(data[currentVideo]) : []; 
        })
    }
    else {
        const container  = document.getElementByClassName("container")[0];
        container.innerHTML = '<div class = "title"> not a youtube Video.</div>';
    }
});